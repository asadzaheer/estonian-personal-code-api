import { Injectable, Dependencies } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { PersonalCode } from './personal-code.model';

@Injectable()
@Dependencies(getModelToken(PersonalCode))
export class PersonalCodeService {
  constructor(personalCodeModel) {
    this.personalCodeModel = personalCodeModel;
  }
  async verifyPersonalCode(code) {
    console.log(code);
    // console.log(await this.personalCodeModel.findAll());
    // const existingCode = await this.personalCodeModel.findOne({
    //   where: { code },
    // });

    // if (!existingCode) {
    //   throw new NotFoundException('Personal code not found');
    // }

    // Add additional validation logic if needed

    return true;
  }
}
