import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { PersonalCodeModule } from './personal-code/personal-code.module';
import { PersonalCode } from './personal-code/personal-code.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [PersonalCode],
      autoLoadModels: true,
      synchronize: true,
    }),
    PersonalCodeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
