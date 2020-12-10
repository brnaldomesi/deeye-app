export const getValidationErrorString = fieldName => 'Incorrect ' + fieldName;

export const hasLowerCase = str => /[a-z]/.test(str);

export const hasUpperCase = str => /[A-Z]/.test(str);

export const hasNumber = str => /\d/.test(str);

export const hasPunctuation = str => /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(str);
