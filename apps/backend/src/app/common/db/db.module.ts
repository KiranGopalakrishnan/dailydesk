import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as PostgressConnectionStringParser from 'pg-connection-string';
import 'pg';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        console.error({asd: configService.get('DATABASE_URL')})
        const connectionOptions = PostgressConnectionStringParser.parse(
          configService.get('DATABASE_URL')
        );

        const ssl = Boolean(configService.get('SSL'));

        return {
          //eslint-disable-next-line
          type: 'postgres' as 'postgres',
          host: connectionOptions.host,
          port: Number(connectionOptions.port),
          username: connectionOptions.user,
          password: connectionOptions.password,
          database: connectionOptions.database,
          autoLoadEntities: true,
          ssl,
        };
      },
    }),
  ],
})
export class DbModule {}
