import { Module } from '@nestjs/common';
import { ProvidersModule } from '../../common/providers/providers.module';
import { UserService } from './services/user-service';
import { UserRepository } from './repositories/user-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './repositories/entities/user-entity';
import {UserController} from "./user.controller";

@Module({
  imports: [ProvidersModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
