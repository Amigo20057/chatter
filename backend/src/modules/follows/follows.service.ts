import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FollowsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async isFollowExists(
    followerId: string,
    followingId: string,
  ): Promise<boolean> {
    const isExists = await this.prismaService.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    console.log(isExists);

    return !!isExists;
  }

  async followUser(followerId: string, followingId: string): Promise<void> {
    if (await this.isFollowExists(followerId, followingId)) {
      throw new Error('Follow exists');
    }
    await this.prismaService.follows.create({
      data: {
        followerId,
        followingId,
      },
    });
  }

  async unfollowUser(followerId: string, followingId: string): Promise<void> {
    if (await !this.isFollowExists(followerId, followingId)) {
      throw new Error('Follow not exists');
    }
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
