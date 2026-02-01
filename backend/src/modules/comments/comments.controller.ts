import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Authorization } from '../auth/decorators/auth.decorators';
import { GetUserId } from '../auth/decorators/authorized.decorators';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Authorization()
  @Post('/:postId')
  async createComment(
    @Param('postId') postId: string,
    @Body('content') data: { content: string },
    @GetUserId() userId: string,
  ) {
    return await this.commentsService.createComment(
      postId,
      userId,
      data.content,
    );
  }

  @Authorization()
  @Delete('/:commentId')
  async deleteComment(
    @Param('commentId') commentId: string,
    @GetUserId() userId: string,
  ) {
    return await this.commentsService.deleteComment(commentId, userId);
  }

  @Get('/:postId')
  async getCommentsByPost(@Param('postId') postId: string) {
    return await this.commentsService.getCommentsByPost(postId);
  }
}
