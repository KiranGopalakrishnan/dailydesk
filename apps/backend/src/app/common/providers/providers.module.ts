import { Module } from '@nestjs/common';
import { FirebaseAuthProvider } from './authentication/FirebaseAuthProvider';

@Module({
  exports: [FirebaseAuthProvider],
  controllers: [],
  providers: [FirebaseAuthProvider],
})
export class ProvidersModule {}
