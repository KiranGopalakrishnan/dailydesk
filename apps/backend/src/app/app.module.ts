import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './domains/user/user.module';
import { AuthModule } from './domains/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domains/user/repositories/entities/user-entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 27017,
      username: 'heimdall-the-gatekeeper',
      password: 'bifrost-password',
      database: 'bifrost-db',
      entities: [UserEntity],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    UserModule,
    AuthModule
  ],
})
export class AppModule {}
