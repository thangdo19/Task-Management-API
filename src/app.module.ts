import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './app/auth/auth.module';
import { TasksModule } from './app/tasks/tasks.module';
import { UsersModule } from './app/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    TasksModule,
    AuthModule,
    UsersModule
  ]
})
export class AppModule {}
