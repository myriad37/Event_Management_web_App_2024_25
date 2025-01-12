// src/main.ts
import { validateEmail, validatePassword, validateRequiredField,  ValidationResult } from './modules/utils/validationUtils';

function validateLoginForm(email: string, password: string): ValidationResult[] {
  const results: ValidationResult[] = [];

  const emailValidation = validateEmail(email);
  results.push(emailValidation);

  const passwordValidation = validatePassword(password);
  results.push(passwordValidation);

  return results;
}

function validateRegistrationForm(email: string, password: string, confirmPassword: string): ValidationResult[] {
  const results: ValidationResult[] = [];

  const emailValidation = validateEmail(email);
  results.push(emailValidation);

  const passwordValidation = validatePassword(password);
  results.push(passwordValidation);

  const confirmPasswordValidation = validateRequiredField(confirmPassword);
  results.push(confirmPasswordValidation);

  // Add more validations as needed

  return results;
}

export function formatDate(dateString: string, dateOnly: boolean = false) {
  const date = new Date(dateString);
  // Options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  };

  // Format the date using Intl.DateTimeFormat
  let formattedDate;
  if (dateOnly) {
      formattedDate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'}).format(date);
  } else {
      formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  }
  return formattedDate;
}

// Example usage
const loginEmail = 'test@example.com';
const loginPassword = 'password123';
const loginValidationResults = validateLoginForm(loginEmail, loginPassword);
console.log('Login Form Validation Results:', loginValidationResults);

const registrationEmail = 'newuser@example.com';
const registrationPassword = 'securePassword123';
const registrationConfirmPassword = 'securePassword1234';
const registrationValidationResults = validateRegistrationForm(
  registrationEmail,
  registrationPassword,
  registrationConfirmPassword
);
console.log('Registration Form Validation Results:', registrationValidationResults);