export interface ValidationResult {
    isValid: boolean;
    error?: string;
  }

  export function validateEmail(email: string): ValidationResult {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return {
        isValid: emailRegex.test(email),
        error: 'Invalid email address',
    };
}


export function validatePassword(password: string): ValidationResult {
    return {
      isValid: password.length > 6,
      error: 'Password must be at least 6 characters',
    };
}

export function validateName(name: string): ValidationResult {
    return {
      isValid: name.length > 2,
      error: 'Name must be at least 2 characters',
    };
}

export function validateRequiredField(value: string): ValidationResult {
    return {
      isValid: value.trim() !== '',
      error: 'This field is required',
    };
  }

export function validateNumber(value: string): ValidationResult {
    const numberRegex = /^\d+$/;
    return {
      isValid: numberRegex.test(value),
      error: 'This field must be a number',
    };
}

export function validateDate(value: string): ValidationResult {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return {
      isValid: dateRegex.test(value),
      error: 'This field must be a date in the form of YYYY-MM-DD',
    };
}

// check if two values are similar example password and confirmation pasword
export function validateMatch(value: string, matchValue: string): ValidationResult {
    return {
      isValid: value === matchValue,
      error: 'This field must match the previous field',
    };
}