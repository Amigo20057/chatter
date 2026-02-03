import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto, @Res() res: Response) {
    try {
      const { user, token } = await this.authService.register(dto);
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000,
      });
      res.send({ user: user });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send({ message: error.message });
    }
  }

  @Post('login')
  async login(
    @Body() data: { userTag?: string; email?: string; password: string },
    @Res() res: Response,
  ) {
    try {
      const { user, token } = await this.authService.login(data);
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000,
      });
      res.send({ user: user });
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).send({ message: error.message });
    }
  }

  @Delete('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { message: 'Logged out successfully' };
  }
}
