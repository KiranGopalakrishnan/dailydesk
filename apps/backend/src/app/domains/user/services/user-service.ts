import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';
import { UserModel } from '../models/user.model';

interface CreateUserArgs {
  firstname: string;
  lastname: string;
  email: string;
}

@Injectable()
export class UserService {
constructor(private userRepository: UserRepository) {}

  async signup(userData: CreateUserArgs):Promise<UserModel>{
    const newUser = new UserModel(userData)
    await this.userRepository.createUser(newUser)
    return newUser
  }
}
