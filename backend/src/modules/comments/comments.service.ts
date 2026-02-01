import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Comment } from 'generated/prisma/client';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment(
    postId: string,
    userId: string,
    content: string,
  ): Promise<Comment> {
    return this.prismaService.comment.create({
      data: {
        postId,
        content,
        authorId: userId,
      },
    });
  }

  async deleteComment(commentId: string, userId: string): Promise<void> {
    const comment = await this.prismaService.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) {
      throw new Error('Comment not found');
    }
    if (comment.authorId !== userId) {
      throw new Error('Unauthorized');
    }
    await this.prismaService.comment.delete({
      where: { id: commentId },
    });
  }

  async getCommentsByPost(postId: string): Promise<Comment[]> {
    return this.prismaService.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
