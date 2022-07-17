import { instanceToPlain } from 'class-transformer';
import { UserEntity } from '../entities/user-entity';
import { UserModel } from '../../models/user.model';

export class UserModelToEntityTransformer {
  static fromModelToEntity(model: UserModel): UserEntity {
    const properties = instanceToPlain(model)
    const userEntity = new UserEntity()

    userEntity.id = properties.id
    userEntity.firstName = properties.firstname
    userEntity.lastName = properties.lastname
    userEntity.email = properties.email
    userEntity.status = properties.status
    return userEntity
  }
}
