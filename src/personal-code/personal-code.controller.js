import {
  Controller,
  Get,
  Post,
  Dependencies,
  Bind,
  Param,
  Body,
} from '@nestjs/common';
import { PersonalCodeService } from './personal-code.service';

@Controller('personal-code')
@Dependencies(PersonalCodeService)
export class PersonalCodeController {
  constructor(personalCodeService) {
    this.personalCodeService = personalCodeService;
  }

  @Post()
  @Bind(Body())
  async generatePersonalCode(body) {
    const { gender, dob } = body;
    const newPersonalCode = await this.personalCodeService.generatePersonalCode(
      gender,
      dob,
    );
    return `Generated Personal Code: ${newPersonalCode}`;
  }

  @Get(':code')
  @Bind(Param())
  async verifyPersonalCode(params) {
    const { code } = params;
    await this.personalCodeService.verifyPersonalCode(code);
    const { gender, dob, serialNumber } =
      await this.personalCodeService.getPersonalCodeDetails(code);
    return `Personal code is valid. Gender: ${gender}, DoB: ${dob}, Serial Number: ${serialNumber}`;
  }
}
