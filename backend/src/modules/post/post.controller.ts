import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { GetUserId } from '../auth/decorators/authorized.decorators';
import { UpdatePostDto } from './dto/update-post.dto';
import { Authorization } from '../auth/decorators/auth.decorators';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Authorization()
  @Get()
  async getAllPosts(@GetUserId() userId: string) {
    return this.postService.getAllPosts(userId);
  }

  @Get(':userTag/:postId')
  async getPost(
    @Param('userTag') userTag: string,
    @Param('postId') postId: string,
  ) {
    return this.postService.findPost(userTag, postId);
  }

  @Authorization()
  @Post()
  async createPost(@GetUserId() userId: string, @Body() dto: CreatePostDto) {
    console.log(userId, dto);
    return this.postService.createPost(dto, userId);
  }

  @Authorization()
  @Patch()
  async updatePost(@GetUserId() userId: string, @Body() dto: UpdatePostDto) {
    return this.postService.updatePost(dto, userId);
  }

  @Authorization()
  @Delete()
  async deletePost(
    @GetUserId() userId: string,
    @Body('postId') postId: string,
  ) {
    return this.postService.deletePost(postId, userId);
  }

  @Authorization()
  @Patch('/:postId/view')
  @HttpCode(HttpStatus.CREATED)
  async addViewToPost(
    @GetUserId() userId: string,
    @Param('postId') postId: string,
  ) {
    return await this.postService.addViewToPost(userId, postId);
  }
}
