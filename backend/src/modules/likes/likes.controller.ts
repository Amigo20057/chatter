import { Controller, Param, Post } from '@nestjs/common';
import { LikesService } from './likes.service';
import { Authorization } from '../auth/decorators/auth.decorators';
import { GetUserId } from '../auth/decorators/authorized.decorators';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Authorization()
  @Post('toggle-like/:postId')
  async likePost(@GetUserId() userId: string, @Param('postId') postId: string) {
    return await this.likesService.toggleLike(userId, postId);
  }

  async getLikesCount(@Param('postId') postId: string) {
    return await this.likesService.getLikesCount(postId);
  }
}
