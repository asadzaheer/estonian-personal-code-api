import { Injectable, Dependencies } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { PersonalCode } from './personal-code.model';
import { Op } from 'sequelize';
import { getGenderDigits, getControlNumber } from './helpers';

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
  async generatePersonalCode(gender, dob) {
    const [day, month, year] = dob.split('.');
    const genderDigits = getGenderDigits(gender, year);
    const formattedDob = `${year.slice(2)}${month}${day}`;
    const bornSameDay = await this.personalCodeModel.count({
      where: {
        code: {
          [Op.like]: {
            [Op.any]: [
              `${genderDigits.MALE}${formattedDob}%`,
              `${genderDigits.FEMALE}${formattedDob}%`,
            ],
          },
        },
      },
    });
    const serialNumber = (bornSameDay + 1).toString().padStart(3, '0');
    const code = `${genderDigits[gender]}${formattedDob}${serialNumber}`;
    const controlNumber = getControlNumber(code);
    const personalCode = `${code}${controlNumber}`;

    await this.personalCodeModel.create({ code: personalCode });

    return personalCode;
  }
}
