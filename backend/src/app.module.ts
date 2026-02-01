import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { FollowsModule } from './modules/follows/follows.module';
import { LikesModule } from './modules/likes/likes.module';
import { PostModule } from './modules/post/post.module';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
