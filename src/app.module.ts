import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { Role } from './typeorm/entities/Role';


@Module({
  imports: [AuthModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: '',
    password: '',
    database: 'event_management_system',
    entities: [User, Role, Event],
    synchronize: true,
  }),

  AuthModule,
],
  controllers: [AppController, EventsController],
  providers: [AppService, EventsService],
})
export class AppModule {}
