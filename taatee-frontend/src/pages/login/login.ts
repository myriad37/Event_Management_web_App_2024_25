import { navHandler } from "../../scripts/main";
import { navCollapsible } from "../../scripts/collapsible";
import { isValidSignInForm } from "../../scripts/validate";
import { login } from "../../scripts/modules/api/auth.api";
import { displayError, displaySuccess } from "../../scripts/modules/utils/erroHandlerUtils";

document.addEventListener('DOMContentLoaded', () => {
    navHandler();
    navCollapsible();
    const loginForm = document.querySelector("#loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (isValidSignInForm()) {
           // disable the submit button

          const email = document.querySelector("#email") as HTMLInputElement;
          const password = document.querySelector("#password") as HTMLInputElement;
  
          const data = {
            email: email.value,
            password: password.value
          };
          
          const loginResult = await login(data);

  
          if (loginResult.success) {
            // Login successful
            const { access_token } = loginResult.data;
            console.log("Access Token", access_token)
            localStorage.setItem("token", access_token);
            // Redirect or perform other actions as needed
            if (loginResult.data.user.role === "admin") {
              displaySuccess(document.querySelector("#errorContainer") as HTMLElement, "You have successfully logged in. You will be redirected to the admin page in 3 seconds.");
              setTimeout(() => {
              window.location.href = "/admin"
              , 3000});

            } else {
              displaySuccess(document.querySelector("#errorContainer") as HTMLElement, "You have successfully logged in. You will be redirected to the user page in 3 seconds.");
              setTimeout(() => {
              window.location.href = "/user",
              3000});
            }

          } else {
            // Login failed
            const message = loginResult.error.message
            const errorContainer = document.querySelector("#errorContainer") as HTMLElement;
            if (errorContainer) {
              displayError(errorContainer, message);
            }
          }
        }
      });
    }
  });

// Path: src/pages/login/logout.html
// remove the access token from local storage