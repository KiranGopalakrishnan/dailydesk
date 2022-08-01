interface UserProfileArgs {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export class UserProfileDto {
  id: string;
  firstname: string;
  lastname: string;
  email: string;

  constructor(args: UserProfileArgs) {
    Object.assign(this, args);
  }
}
