import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from 'generated/prisma/client';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(
    content: string,
    file: Express.Multer.File | undefined,
    authorId: string,
  ) {
    const imagePath = file ? `/uploads/${file.filename}` : null;

    const newPost = await this.prismaService.post.create({
      data: {
        content,
        img: imagePath,
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
    return {
      ...post,
      isLiked: post.likes.length > 0,
      likes: undefined,
    };
  }

  async getAllMyPosts(userId: string, userTag: string) {
    const posts = await this.prismaService.post.findMany({
      where: {
        author: {
          userTag,
        },
      },
      include: {
        author: true,
        _count: {
          select: { likes: true, comments: true, postView: true },
        },
        likes: { where: { userId }, select: { id: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return {
      posts: posts.map((p) => ({
        ...p,
        isLiked: p.likes.length > 0,
        likes: undefined,
      })),
    };
  }

  async getAllPosts(userId: string, cursor?: string, limit: number = 20) {
    const posts = await this.prismaService.post.findMany({
      include: {
        author: true,
        _count: {
          select: { likes: true, comments: true, postView: true },
        },
        likes: { where: { userId }, select: { id: true } },
      },
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
    });

    return {
      posts: posts.map((p) => ({
        ...p,
        isLiked: p.likes.length > 0,
        likes: undefined,
      })),
      nextCursor: posts.length ? posts[posts.length - 1].id : null,
    };
  }

  async findPostById(id: string): Promise<Post | null> {
    return this.prismaService.post.findUnique({ where: { id } });
  }

  async findPost(currentUserId: string, userTag: string, postId: string) {
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
          where: { userId: currentUserId },
          select: { id: true },
        },
        comments: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            author: true,
            content: true,
          },
        },
      },
    });

    if (!post || post.author.userTag !== userTag) {
      throw new NotFoundException('Post not found');
    }

    return {
      ...post,
      isLiked: post.likes.length > 0,
      likes: undefined,
    };
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
