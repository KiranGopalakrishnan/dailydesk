import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';
import { UserModel } from '../models/user.model';
import { FirebaseAuthProvider } from '../../../common/providers/authentication/FirebaseAuthProvider';

interface CreateUserArgs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private authProvider: FirebaseAuthProvider
  ) {}

  async signupWithPassword(
    userData: CreateUserArgs
  ): Promise<{ signInToken: string }> {
    const newUser = new UserModel(userData);
    await this.userRepository.createUser(newUser);
    await this.authProvider.createFirebaseUserWithPassword(
      newUser,
      userData.password
    );
    const signInToken = await this.authProvider.createSignInTokenForUser(
      newUser.getId()
    );
    return { signInToken };
  }

  async getUserById(id: string): Promise<UserModel | null> {
    return this.userRepository.getUserById(id);
  }
}
