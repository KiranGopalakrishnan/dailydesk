import { initializeApp } from "firebase-admin/app"
import { auth, credential } from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { Injectable } from '@nestjs/common';

const applicationDefault = credential.applicationDefault;

interface UserProperties{
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

@Injectable()
export class FirebaseAuthProvider {
  private auth!: auth.Auth
  constructor() {
    const firebaseApp = initializeApp({
      credential: applicationDefault()
    });
    this.auth = getAuth(firebaseApp)
  }

  async createTokenForUser(firebaseUID: string): Promise<string>{
    return this.auth.createCustomToken(firebaseUID)
  }

  async createFirebaseUser(userProperties: UserProperties){
    await this.auth.createUser(userProperties)
  }
}
