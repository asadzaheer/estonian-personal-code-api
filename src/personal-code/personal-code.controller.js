import { Controller, Get, Dependencies, Bind, Param } from '@nestjs/common';
import { PersonalCodeService } from './personal-code.service';

@Controller('personal-code')
@Dependencies(PersonalCodeService)
export class PersonalCodeController {
  constructor(personalCodeService) {
    this.personalCodeService = personalCodeService;
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
