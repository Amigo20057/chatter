import { Controller, Param, Post } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { Authorization } from '../auth/decorators/auth.decorators';
import { GetUserId } from '../auth/decorators/authorized.decorators';

@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Authorization()
  @Post('follow/:followingId')
  async followUser(
    @GetUserId() userId: string,
    @Param('followingId') followingId: string,
  ) {
    return await this.followsService.followUser(userId, followingId);
  }

  @Authorization()
  @Post('unfollow/:followingId')
  async unfollowUser(
    @GetUserId() userId: string,
    @Param('followingId') followingId: string,
  ) {
    return await this.followsService.unfollowUser(userId, followingId);
  }

  @Post('followers/count/:userId')
  async getFollowersCount(@Param('userId') userId: string) {
    return await this.followsService.getFollowersCount(userId);
  }

  @Post('following/count/:userId')
  async getFollowingCount(@Param('userId') userId: string) {
    return await this.followsService.getFollowingCount(userId);
  }
}
