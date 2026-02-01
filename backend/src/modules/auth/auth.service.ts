import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'generated/prisma/client';
import { UserService } from '../user/user.service';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private generateToken(user: User): string {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
    });
  }

  async register(dto: CreateUserDto): Promise<{ user: User; token: string }> {
    const userExists = await this.userService.findUserByEmail(dto.email);
    if (userExists) {
      throw new Error('User with this email already exists');
    }
    dto.password = await hash(dto.password);
    const user = await this.userService.createUser(dto);
    const token = this.generateToken(user);
    return { user, token };
  }

  async login(data: {
    userTag?: string;
    email?: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    if (!data.email && !data.userTag) {
      throw new Error('Email or UserTag must be provided');
    }
    let userExists: User | null = null;
    if (data.userTag) {
      userExists = await this.userService.findUserByTag(data.userTag);
    }
    if (data.email) {
      userExists = await this.userService.findUserByEmail(data.email);
    }

    if (!userExists) {
      throw new Error('User with this email does not exist');
    }
    const validatePassword = await verify(userExists.password, data.password);
    if (!validatePassword) {
      throw new Error('Invalid password');
    }
    const token = this.generateToken(userExists);
    return { user: userExists, token };
  }
}
