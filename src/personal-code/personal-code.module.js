import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PersonalCode } from './personal-code.model';
import { PersonalCodeController } from './personal-code.controller';
import { PersonalCodeService } from './personal-code.service';

@Module({
  imports: [SequelizeModule.forFeature([PersonalCode])],
  providers: [PersonalCodeService],
  controllers: [PersonalCodeController],
})
export class PersonalCodeModule {}
