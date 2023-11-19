import { HttpException, HttpStatus } from '@nestjs/common';

export function getGenderDigits(gender, year) {
  if (year >= 1800 && year <= 1899) {
    return { MALE: 1, FEMALE: 2 };
  }

  if (year >= 1900 && year <= 1999) {
    return { MALE: 3, FEMALE: 4 };
  }

  if (year >= 2000 && year <= 2099) {
    return { MALE: 5, FEMALE: 6 };
  }

  return { MALE: 0, FEMALE: 0 };
}

export function getControlNumber(code) {
  const levelOneWeight = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
  const levelTwoWeight = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3];

  let remainder = getRemainder(code, levelOneWeight);

  if (remainder < 10) {
    return remainder;
  }

  if (remainder == 10) {
    remainder = getRemainder(code, levelTwoWeight);
    if (remainder < 10) {
      return remainder;
    }
  }

  return 0;
}

function getRemainder(code, weight) {
  let sum = 0;

  code.split('').forEach((digit, index) => {
    sum += digit * weight[index];
  });

  return sum % 11;
}

export function getGenderFromGenderDigit(genderDigit) {
  const genderDigits = {
    1: 'MALE',
    2: 'FEMALE',
    3: 'MALE',
    4: 'FEMALE',
    5: 'MALE',
    6: 'FEMALE',
    0: 'UNKNOWN',
  };

  return genderDigits[genderDigit];
}

export function getDobFromPersonalCode(personalCode) {
  const genderDigit = personalCode.slice(0, 1);
  const dobDigits = personalCode.slice(1, 7);
  const year = getFullYear(genderDigit, dobDigits.slice(0, 2).join(''));
  const month = dobDigits.slice(2, 4).join('');
  const day = dobDigits.slice(4, 6).join('');

  return `${day}.${month}.${year}`;
}

function getFullYear(genderDigit, year) {
  genderDigit = parseInt(genderDigit);
  if ([1, 2].includes(genderDigit)) {
    return `18${year}`;
  }

  if ([3, 4].includes(genderDigit)) {
    return `19${year}`;
  }

  if ([5, 6].includes(genderDigit)) {
    return `20${year}`;
  }

  return year;
}

export function validateData(gender, dob) {
  if (!gender || !dob) {
    throw new HttpException(
      'Gender and DoB are required',
      HttpStatus.BAD_REQUEST,
    );
  }

  if (!['MALE', 'FEMALE'].includes(gender)) {
    throw new HttpException(
      'Gender must be MALE or FEMALE',
      HttpStatus.BAD_REQUEST,
    );
  }

  if (!dob.split('.') || dob.split('.').length < 3) {
    throw new HttpException(
      'DoB must be of format dd.mm.yyyy',
      HttpStatus.BAD_REQUEST,
    );
  }
}
