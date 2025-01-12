import { navHandler } from "../../scripts/main";
import { navCollapsible } from "../../scripts/collapsible";
import { isValidRegistrationForm } from "../../scripts/validate";
import { register } from "../../scripts/modules/api/auth.api";
import { displayError, displaySuccess } from "../../scripts/modules/utils/erroHandlerUtils";


document.addEventListener('DOMContentLoaded', () => {
    navHandler();
    navCollapsible();

    const registrationForm = document.querySelector("#registrationForm");

    if (registrationForm) {
    registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (isValidRegistrationForm()) {
      const firstName = document.querySelector("#firstName") as HTMLInputElement;
      const lastName = document.querySelector("#lastName") as HTMLInputElement;
      const email = document.querySelector("#email") as HTMLInputElement;
      const password = document.querySelector("#password") as HTMLInputElement;
      const data = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
      }
      
      const signupResult = await register(data);
  
      if (signupResult.success) {
        // Login successful
        const { access_token } = signupResult.data;
        localStorage.setItem("token", access_token);
        displaySuccess(document.querySelector("#errorContainer") as HTMLElement, "You have successfully registered. You will be redirected to your dashboard in 3 seconds.");
        // Redirect or perform other actions as needed
        if (signupResult.data.user.role === "admin") {
                  setTimeout(() => {
                    window.location.href = '/admin';
                }, 3000);
        } else {
            setTimeout(() => {
              window.location.href = '/user';
          }, 3000);
        }

      } else {
        // Login failed
        const message = signupResult.error.message
        const errorContainer = document.querySelector("#errorContainer") as HTMLElement;
        if (errorContainer) {
          displayError(errorContainer, message);
        }
      }



    }
  })
} 
});