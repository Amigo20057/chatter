import { UserService } from './user.service';
import { Authorization } from '../auth/decorators/auth.decorators';
import { Body, Controller, Get, Patch } from '@nestjs/common';
import { GetUserId } from '../auth/decorators/authorized.decorators';
import { UpdatedUserDto } from './dto/updated-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Authorization()
  @Get('profile')
  async profile(@GetUserId() userId: string) {
    return this.userService.findUserById(userId);
  }

  @Authorization()
  @Patch('update')
  async updateProfile(
    @GetUserId() userId: string,
    @Body() updatedData: UpdatedUserDto,
  ) {
    return this.userService.updateUser(updatedData, userId);
  }
}
