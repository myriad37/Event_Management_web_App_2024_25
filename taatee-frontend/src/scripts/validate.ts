import { displayError } from "./modules/utils/erroHandlerUtils";
import * as validators from "./modules/utils/validationUtils"

// sign in validator
export function isValidSignInForm() {
  const email = document.querySelector("#email") as HTMLInputElement;
  const password = document.querySelector("#password") as HTMLInputElement;
  const emailValidation = validators.validateEmail(email.value);
  const passwordValidation = validators.validatePassword(password.value);
  if (emailValidation.isValid && passwordValidation.isValid) {
    return true;
  }
  if (!emailValidation.isValid) {
    email.classList.add("border", "border-amber-700");
    const errorContainer = document.querySelector("#errorContainer") as HTMLElement;
    if (errorContainer) {
      displayError(errorContainer, emailValidation.error ?? "Unkown error occured");
    }
    // email.nextElementSibling?.classList.remove("hidden");
  }
  if (!passwordValidation.isValid) {
    password.classList.add("border", "border-amber-700");
    const errorContainer = document.querySelector("#errorContainer") as HTMLElement;
    if (errorContainer) {
      displayError(errorContainer, emailValidation.error ?? "Unkown error occured");
    }
    // password.nextElementSibling?.classList.remove("hidden");
  }
  return false;
}

// registration form has firstName, lastName, email, password, confirmPassword

export function isValidRegistrationForm() {
  const firstName = document.querySelector("#firstName") as HTMLInputElement;
  const lastName = document.querySelector("#lastName") as HTMLInputElement;
  const email = document.querySelector("#email") as HTMLInputElement;
  const password = document.querySelector("#password") as HTMLInputElement;
  const firstNameValidation = validators.validateName(firstName.value);
  const lastNameValidation = validators.validateName(lastName.value);
  const emailValidation = validators.validateEmail(email.value);
  const passwordValidation = validators.validatePassword(password.value);
  if (firstNameValidation.isValid && lastNameValidation.isValid && emailValidation.isValid && passwordValidation.isValid) {
    return true;
  }
  if (!firstNameValidation.isValid) {
    firstName.classList.add("border", "border-red-500");
    firstName.nextElementSibling?.classList.remove("hidden");
  }
  if (!lastNameValidation.isValid) {
    lastName.classList.add("border", "border-red-500");
    lastName.nextElementSibling?.classList.remove("hidden");
  }
  if (!emailValidation.isValid) {
    email.classList.add("border", "border-red-500");
    email.nextElementSibling?.classList.remove("hidden");
  }
  if (!passwordValidation.isValid) {
    password.classList.add("border", "border-red-500");
    password.nextElementSibling?.classList.remove("hidden");
  }
  return false;
}


// id: loginForm
// id: registrationForm