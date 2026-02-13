import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from 'generated/prisma/client';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(dto: CreatePostDto, authorId: string) {
    const newPost = await this.prismaService.post.create({
      data: {
        content: dto.content,
        img: dto.img,
        authorId,
      },
    });

    const post = await this.prismaService.post.findUnique({
      where: { id: newPost.id },
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
          where: { userId: authorId },
          select: { id: true },
        },
      },
    });

    return { ...post, isLiked: post.likes.length > 0, likes: undefined };
  }

  async getAllPosts(userId: string) {
    const posts = await this.prismaService.post.findMany({
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
      take: 20,
      skip: 0,
      orderBy: { createdAt: 'desc' },
    });

    return posts.map((post) => ({
      ...post,
      isLiked: post.likes.length > 0,
      likes: undefined,
    }));
  }

  async findPostById(id: string): Promise<Post | null> {
    return this.prismaService.post.findUnique({ where: { id } });
  }

  async findPost(userTag: string, postId: string) {
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
          where: {
            user: {
              userTag: userTag,
            },
          },
          select: { id: true },
        },
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.author.userTag !== userTag) {
      throw new NotFoundException('Post not found');
    }

    return { ...post, isLiked: post.likes.length > 0, likes: undefined };
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

  async addViewToPost(userId: string, postId: string): Promise<number> {
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
      select: { id: true },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    await this.prismaService.postView.createMany({
      data: [{ postId, userId }],
      skipDuplicates: true,
    });

    return this.prismaService.postView.count({
      where: { postId },
    });
  }
}
