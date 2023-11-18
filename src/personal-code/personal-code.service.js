import {
  Injectable,
  Dependencies,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { PersonalCode } from './personal-code.model';
import { Op } from 'sequelize';
import {
  getGenderDigits,
  getControlNumber,
  getGenderFromGenderDigit,
  getDobFromPersonalCode,
} from './helpers';

@Injectable()
@Dependencies(getModelToken(PersonalCode))
export class PersonalCodeService {
  constructor(personalCodeModel) {
    this.personalCodeModel = personalCodeModel;
  }
  async verifyPersonalCode(code) {
    console.log(code);
    const personalCode = code.split('');
    if (personalCode.length < 11) {
      throw new HttpException('Invalid code', HttpStatus.BAD_REQUEST);
    }

    const existingCode = await this.personalCodeModel.findOne({
      where: { code },
    });

    if (!existingCode) {
      throw new NotFoundException('Personal code not found');
    }

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
  getPersonalCodeDetails(code) {
    const personalCode = code.split('');
    const gender = getGenderFromGenderDigit(personalCode.slice(0, 1));
    const dob = getDobFromPersonalCode(personalCode);
    const serialNumber = personalCode.slice(7, 10).join('');

    return { gender, dob, serialNumber };
  }
}
