import { nanoid } from 'nanoid'

enum UserStatus {
  ACTIVE = 'active'
}

interface UserArgs{
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  status?: UserStatus;
}
export class User {
  private id!: string;
  private firstname!: string;
  private lastname!: string;
  private email!: string;
  private status: UserStatus  = UserStatus.ACTIVE;

  constructor({ id, firstname, lastname, email, status = UserStatus.ACTIVE }: UserArgs) {
    this.id = id ?? nanoid();
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.status = status;
  }
}
