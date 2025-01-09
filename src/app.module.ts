import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { Role } from './typeorm/entities/Role';
import { UsersModule } from './users/users.module';
import { EventModule } from './event/event.module';
import { RoleModule } from './role/role.module';
import { EventsController } from './events/controllers/events/events.controller';
import { EventsService } from './events/services/events/events.service';
import { EventModule } from './event/event.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'pa55word@Play04',
    database: 'event_management_system',
    entities: [User, Role, Event],
    synchronize: true,
  }),
  /* UserModule,
  EventModule, */
  AuthModule,
  UsersModule,
  EventModule,
  RoleModule,
],
  controllers: [AppController, EventsController],
  providers: [AppService, EventsService],
})
export class AppModule {}
