import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from 'generated/prisma/client';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(dto: CreatePostDto, authorId: string): Promise<Post> {
    return this.prismaService.post.create({
      data: {
        content: dto.content,
        img: dto.img,
        authorId,
      },
    });
  }

  async getAllPosts(): Promise<Post[]> {
    return this.prismaService.post.findMany({
      include: {
        author: true,
        comments: true,
        _count: {
          select: {
            likes: true,
            comments: true,
            postView: true,
          },
        },
        postView: true,
      },
      take: 20,
      skip: 0,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findPostById(id: string): Promise<Post | null> {
    return this.prismaService.post.findUnique({ where: { id } });
  }

  async deletePost(postId: string, authorId: string): Promise<void> {
    const post = await this.findPostById(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    if (post.authorId !== authorId) {
      throw new Error('Unauthorized');
    }
    await this.prismaService.post.delete({ where: { id: postId } });
  }

  async updatePost(dto: UpdatePostDto, authorId: string): Promise<void> {
    const post = await this.findPostById(dto.postId);
    if (!post) {
      throw new Error('Post not found');
    }
    if (post.authorId !== authorId) {
      throw new Error('Unauthorized');
    }
    await this.prismaService.post.update({
      where: { id: post.id },
      data: {
        content: dto.content ?? post.content,
        img: dto.img ?? post.img,
      },
    });
  }
}
