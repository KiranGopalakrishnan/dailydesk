import { Module } from '@nestjs/common';
import { ProvidersModule } from '../../common/providers/providers.module';
import { FirebaseAuthStrategy } from './guards/firebase-auth.strategy';

@Module({
  imports: [ProvidersModule],
  providers: [FirebaseAuthStrategy]
})
export class AuthModule {}
