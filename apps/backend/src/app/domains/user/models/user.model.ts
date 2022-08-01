import { nanoid } from 'nanoid';

export enum UserStatus {
  ACTIVE = 'active',
}

interface UserArgs {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  status?: UserStatus;
}

export class UserModel {
  private readonly id!: string;
  private readonly firstname!: string;
  private readonly lastname!: string;
  private readonly email!: string;
  private status: UserStatus = UserStatus.ACTIVE;

  constructor({
    id,
    firstname,
    lastname,
    email,
    status = UserStatus.ACTIVE,
  }: UserArgs) {
    this.id = id ?? nanoid();
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.status = status;
  }

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getUserProfile() {
    return {
      id: this.getId(),
      email: this.getEmail(),
      firstname: this.firstname,
      lastname: this.lastname,
    };
  }
}
