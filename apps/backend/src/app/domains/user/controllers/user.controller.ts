import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from '../services/user-service';
import { UserPostDto } from '../dtos/user-post-dto';
import { UserProfileDto } from '../dtos/user-profile.dto';
import { UserModelToProfileTransformer } from '../dtos/transformers/user-model-to-profile.transformer';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('sign-up')
  async getUser(@Body() data: UserPostDto) {
    return await this.userService.signupWithPassword(data);
  }

  @Get(':id')
  async getUsers(@Param() params): Promise<UserProfileDto> {
    const userModel = await this.userService.getUserById(params.id);
    if (!userModel) throw new NotFoundException('User not found');
    return UserModelToProfileTransformer.fromModelToProfile(userModel);
  }
}
