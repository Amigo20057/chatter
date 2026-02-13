import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private readonly prismaService: PrismaService) {}

  async toggleLike(userId: string, postId: string) {
    const existingLike = await this.prismaService.like.findFirst({
      where: { userId, postId },
    });

    if (existingLike) {
      await this.prismaService.like.delete({
        where: { id: existingLike.id },
      });
    } else {
      await this.prismaService.like.create({
        data: { userId, postId },
      });
    }

    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
      include: {
        author: true,
        _count: {
          select: {
            likes: true,
            comments: true,
            postView: true,
          },
        },
        likes: {
          where: { userId },
          select: { id: true },
        },
      },
    });

    return { ...post, isLiked: post.likes.length > 0, likes: undefined };
  }

  async getLikesCount(postId: string): Promise<number> {
    return this.prismaService.like.count({
      where: {
        postId,
      },
    });
  }
}
