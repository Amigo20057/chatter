import { Controller, Get, Param, Post } from '@nestjs/common';
import { LikesService } from './likes.service';
import { Authorization } from '../auth/decorators/auth.decorators';
import { GetUserId } from '../auth/decorators/authorized.decorators';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Authorization()
  @Post('like/:postId')
  async likePost(@GetUserId() userId: string, @Param('postId') postId: string) {
    await this.likesService.likePost(userId, postId);
  }

  @Authorization()
  @Post('unlike/:postId')
  async unlikePost(
    @GetUserId() userId: string,
    @Param('postId') postId: string,
  ) {
    await this.likesService.unlikePost(userId, postId);
  }

  @Get('like/count/:postId')
  async getLikesCount(@Param('postId') postId: string) {
    return await this.likesService.getLikesCount(postId);
  }
}
