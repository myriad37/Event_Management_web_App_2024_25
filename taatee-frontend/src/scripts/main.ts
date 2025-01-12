import { getSelf } from "./modules/api/user.api";
import { isLoggedIn } from "./modules/utils/authUtils";


// <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>

const createMenuItem = (text: string, href: string, id: string) => {
    const a = document.createElement("a");
    a.classList.add("block", "px-4", "py-2", "text-sm", "text-gray-700");
    a.setAttribute("href", href);
    a.setAttribute("role", "menuitem");
    a.setAttribute("tabindex", "-1");
    a.setAttribute("id", id);
    a.innerText = text;
    return a;
}

const loginToBook = () => {
    // Make sure all the elements href attributes are set to the login page
    const loginRequiredElements = document.querySelectorAll(".login-required");
    loginRequiredElements.forEach((element) => {
        element.setAttribute("href", "/account/login.html");
    });
}

export const navHandler = async () => {
    const userMenuList = document.querySelector("#user-menu-list");
    if (userMenuList) {
        userMenuList.innerHTML = "";
        if (await isLoggedIn()) {
            const isLoginPage = window.location.pathname.includes("login.html");
            const isSignupPage = window.location.pathname.includes("signup.html");
            let userPath;
            await adminAccess() ? userPath = "/admin" : userPath = "/user"

            if (isLoginPage || isSignupPage) {
                window.location.href = userPath;
            }
            userMenuList.appendChild(createMenuItem("Your Dashboard", userPath, "user-menu-item-0"));
            // userMenuList.appendChild(createMenuItem("Your Bookings", "/user/", "user-menu-item-1"));
            userMenuList.appendChild(createMenuItem("Logout", "account/login.html", "user-menu-item-2"));

            const logoutButton = document.querySelector("#user-menu-item-2");

            if (logoutButton) {
                logoutButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    logout();
                });
            }
        } else {
            loginToBook();
            userMenuList.appendChild(createMenuItem("Sign In", "/account/login.html", "user-menu-item-0"));
            userMenuList.appendChild(createMenuItem("Create Account", "/account/signup.html", "user-menu-item-1"));
        }
    }
}

export const adminAccess = async () => {
    // check if the logged in user is an admin
    const accessToken = localStorage.getItem('token')
    const request = await getSelf(accessToken as string)
    if (request.success) {  
        const user = request.data     
        if (user && user.role === 'admin') {
            return true;
        }
    }
    return false;
}

const logout = async () => {
    localStorage.removeItem("token");
    window.location.href = "/account/login.html";
}

