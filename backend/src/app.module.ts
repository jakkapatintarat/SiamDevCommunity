import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'siamdev',
      entities: [User],
      synchronize: true,
    }),
    ApiModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
