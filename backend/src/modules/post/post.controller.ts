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
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { GetUserId } from '../auth/decorators/authorized.decorators';
import { UpdatePostDto } from './dto/update-post.dto';
import { Authorization } from '../auth/decorators/auth.decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Authorization()
  @Get('my/:userTag')
  async getAllMyPosts(
    @GetUserId() userId: string,
    @Param('userTag') userTag: string,
  ) {
    return this.postService.getAllMyPosts(userId, userTag);
  }

  @Authorization()
  @Get()
  async getAllPosts(
    @GetUserId() userId: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: string,
  ) {
    const parsedLimit = limit ? parseInt(limit, 10) : 20;
    return this.postService.getAllPosts(userId, cursor, parsedLimit);
  }

  @Authorization()
  @Get(':userTag/:postId')
  async getPost(
    @GetUserId() userId: string,
    @Param('userTag') userTag: string,
    @Param('postId') postId: string,
  ) {
    return this.postService.findPost(userId, userTag, postId);
  }

  @Authorization()
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);

          callback(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  async createPost(
    @GetUserId() userId: string,
    @UploadedFile() file,
    @Body('content') content: string,
  ) {
    return this.postService.createPost(content, file, userId);
  }

  @Authorization()
  @Patch()
  async updatePost(@GetUserId() userId: string, @Body() dto: UpdatePostDto) {
    return this.postService.updatePost(dto, userId);
  }

  @Authorization()
  @Delete('/:postId')
  async deletePost(
    @GetUserId() userId: string,
    @Param('postId') postId: string,
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
