import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './services/user-service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  getUser(@Body() data) {
    return this.userService.signupWithPassword(data);
  }

  @Get()
  getUsers() {
    return 'dsdfffffffjkhrjghegh';
  }
}
