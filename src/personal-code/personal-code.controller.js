import { Controller, Get, Post, Dependencies, Bind, Param, Body } from '@nestjs/common';
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
    const newPersonalCode = await this.personalCodeService.generatePersonalCode(gender, dob);
    return `Generated Personal Code: ${newPersonalCode}`;
  }

  @Get(':code')
  @Bind(Param())
  async verifyPersonalCode(params) {
    const { code } = params;
    console.log(code);
    await this.personalCodeService.verifyPersonalCode(code);
    return `This action returns a ${code}`;
  }
}
