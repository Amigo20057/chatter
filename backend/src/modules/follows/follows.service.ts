import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FollowsService {
  constructor(private readonly prismaService: PrismaService) {}

  async followUser(followerId: string, followingId: string): Promise<void> {
    await this.prismaService.follows.create({
      data: {
        followerId,
        followingId,
      },
    });
  }

  async unfollowUser(followerId: string, followingId: string): Promise<void> {
    await this.prismaService.follows.deleteMany({
      where: {
        followerId,
        followingId,
      },
    });
  }

  async getFollowersCount(userId: string): Promise<number> {
    return this.prismaService.follows.count({
      where: {
        followingId: userId,
      },
    });
  }

  async getFollowingCount(userId: string): Promise<number> {
    return this.prismaService.follows.count({
      where: {
        followerId: userId,
      },
    });
  }
}
