import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { FirebaseAuthProvider } from '../../../common/providers/authentication/FirebaseAuthProvider';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy) {

  constructor(private authProvider: FirebaseAuthProvider) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }

  validate(token) {
    return this.authProvider.verifyToken(token)
      .catch((err) => {
        console.log(err);
        throw new UnauthorizedException();
      });
  }
}
