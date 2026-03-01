import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { FollowsModule } from './modules/follows/follows.module';
import { LikesModule } from './modules/likes/likes.module';
import { PostModule } from './modules/post/post.module';
import { CommentsModule } from './modules/comments/comments.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);

          callback(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    FollowsModule,
    LikesModule,
    PostModule,
    CommentsModule,
  ],
})
export class AppModule {}
