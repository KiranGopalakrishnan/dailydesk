import { UserModel } from '../../models/user.model';
import { UserProfileDto } from '../user-profile.dto';

export class UserModelToProfileTransformer {
  static fromModelToProfile(model: UserModel): UserProfileDto {
    const profile = model.getUserProfile();
    return new UserProfileDto(profile);
  }
}
