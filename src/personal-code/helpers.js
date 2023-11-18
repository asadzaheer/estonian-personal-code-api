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
