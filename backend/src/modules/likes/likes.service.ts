import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private readonly prismaService: PrismaService) {}

  async likePost(userId: string, postId: string): Promise<void> {
    this.prismaService.like.create({
      data: {
        userId,
        postId,
      },
    });
  }

  async unlikePost(userId: string, postId: string): Promise<void> {
    this.prismaService.like.deleteMany({
      where: {
        userId,
        postId,
      },
    });
  }

  async getLikesCount(postId: string): Promise<number> {
    return this.prismaService.like.count({
      where: {
        postId,
      },
    });
  }
}
