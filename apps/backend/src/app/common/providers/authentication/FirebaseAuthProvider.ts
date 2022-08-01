import { initializeApp } from 'firebase-admin/app';
import { auth, credential } from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { Injectable } from '@nestjs/common';
import { UserModel } from '../../../domains/user/models/user.model';

const applicationDefault = credential.applicationDefault;

export enum SignInType {
  PASSWORD = 'PASSWORD',
}

@Injectable()
export class FirebaseAuthProvider {
  private auth!: auth.Auth;

  constructor() {
    const firebaseApp = initializeApp({
      credential: applicationDefault(),
    });
    this.auth = getAuth(firebaseApp);
  }

  async createTokenForUser(user: UserModel): Promise<string> {
    return this.auth.createCustomToken(user.getId());
  }

  async createFirebaseUserWithPassword(user: UserModel, password: string) {
    const profile = user.getUserProfile();
    await this.auth.createUser({
      uid: profile.id,
      displayName: `${profile.firstname} ${profile.lastname}`,
      email: profile.email,
      password,
    });
  }

  async createSignInTokenForUser(id: string): Promise<string> {
    return await this.auth.createCustomToken(id);
  }

  async verifyToken(token: string): Promise<void> {
    await this.auth.verifyIdToken(token, true);
  }
}
