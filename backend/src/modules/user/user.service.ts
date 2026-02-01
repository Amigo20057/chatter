import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'generated/prisma/client';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdatedUserDto } from './dto/updated-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async findUserByTag(userTag: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { userTag } });
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
      },
    });
  }

  async updateUser(updatedData: UpdatedUserDto, userId: string): Promise<User> {
    return this.prismaService.user.update({
      where: { id: userId },
      data: {
        ...updatedData,
        dateOfBirth: updatedData.dateOfBirth
          ? new Date(updatedData.dateOfBirth)
          : undefined,
      },
    });
  }
}
