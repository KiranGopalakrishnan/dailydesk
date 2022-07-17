import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user-entity';
import { UserModel } from '../models/user.model';
import { UserModelToEntityTransformer } from './transformers/user-model-to-entity.transformer';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async createUser(userModel: UserModel) {
    const entity = UserModelToEntityTransformer.fromModelToEntity(userModel);
    await this.usersRepository.save(entity);
  }
}
