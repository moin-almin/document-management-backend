import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LoggingMiddleware } from './logging/logging.middleware';
import { JwtStrategy } from './auth/jwt.strategy';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { Document } from './document/document.entity';
import { DocumentModule } from './document/document.module';

import { Role } from './role/role.entity';
import { AuthModule } from './auth/auth.module';
import { IngestionService } from './ingestion/ingestion.service';
import { IngestionController } from './ingestion/ingestion.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [User, Role, Document],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([User, Role, Document]),
    AuthModule,
    UserModule,
    DocumentModule,
    HttpModule,
  ],
  controllers: [AppController, IngestionController],
  providers: [AppService, IngestionService, JwtStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); // Apply middleware to all routes
  }
}
