
interface UserEntityArgs {
  id: string | undefined;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  company: string;
  status: string;
}

export class UserEntity {
  id: string | undefined;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  company: string;
  status: string;

  constructor(args:UserEntityArgs) {
    Object.assign(this,args)
  }
}
