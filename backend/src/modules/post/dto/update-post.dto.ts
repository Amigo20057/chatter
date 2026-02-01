import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  postId: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsOptional()
  @IsString()
  img?: string;
}
