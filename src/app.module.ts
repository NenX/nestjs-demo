import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
// import { DrawModule } from './material/draw/draw.module';
import { User } from './material/user/entities/user.entity';
import { UserModule } from './material/user/user.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PvModule } from './material/pv/pv.module';
import { ExamModule } from './material/exam/exam.module';
import { PregnancyModule } from './material/pregnancy/pregnancy.module';

import { ConfigModule } from '@nestjs/config';
import { AppConfig } from './utils/AppConfig';
import { AuthModule } from './core/auth/auth.module';
import { RoleModule } from './role/role.module';
import { ResourcesModule } from './material/resources/resources.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: AppConfig.get('DATABASE_HOST'),
      port: ~~AppConfig.get('DATABASE_PORT'),
      username: AppConfig.get('DATABASE_USERNAME'),
      password: AppConfig.get('DATABASE_PASSWORD'),
      database: AppConfig.get('DATABASE_DATABASE'),
      // logger:"simple-console",
      // logging:"all",
      // entities:["src/material/**/*.entity.ts"],
      autoLoadEntities: true,
      // entities: [User],
      synchronize: true,
    }),
    CoreModule, UserModule,
    // DrawModule,
    PvModule, ExamModule, PregnancyModule, AuthModule, RoleModule, ResourcesModule



  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
