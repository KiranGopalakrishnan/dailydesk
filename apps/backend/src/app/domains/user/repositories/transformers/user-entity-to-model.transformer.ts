import { UserEntity } from '../entities/user-entity';
import { UserModel, UserStatus } from '../../models/user.model';

export class UserEntityToModelTransformer {
  static fromEntityToModel(entity: UserEntity): UserModel {
    const modelArgs = {
      id: entity.id,
      firstname: entity.firstName,
      lastname: entity.lastName,
      email: entity.email,
      status: entity.status as UserStatus,
    };

    return new UserModel(modelArgs);
  }
}
