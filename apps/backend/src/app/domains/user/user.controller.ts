import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './services/user-service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  getUser(@Body() data) {
    return this.userService.signup(data);
  }

  @Get()
  getUsers() {
    return 'dsdf';
  }
}
