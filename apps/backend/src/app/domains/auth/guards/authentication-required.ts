import { Injectable } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthenticationRequired extends AuthGuard('firebase-jwt') {}
