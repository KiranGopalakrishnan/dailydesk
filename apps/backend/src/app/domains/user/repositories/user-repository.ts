import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user-entity';
import { UserModel } from '../models/user.model';
import { UserModelToEntityTransformer } from './transformers/user-model-to-entity.transformer';
import { UserEntityToModelTransformer } from './transformers/user-entity-to-model.transformer';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async createUser(userModel: UserModel): Promise<void> {
    const entity = UserModelToEntityTransformer.fromModelToEntity(userModel);
    await this.usersRepository.save(entity);
  }

  async getUserById(id: string): Promise<UserModel | null> {
    if (!id) throw Error('Id is required');
    const entity = await this.usersRepository.findOneBy({ id });
    if (!entity) return null;
    return UserEntityToModelTransformer.fromEntityToModel(entity);
  }
}
