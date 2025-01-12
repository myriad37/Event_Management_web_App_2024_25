import { navHandler } from "../../scripts/main";
import { navCollapsible } from "../../scripts/collapsible";
import { isLoggedIn } from "../../scripts/modules/utils/authUtils";
import { deleteSelf, getSelf, getSelfBookings, updateSelf } from "../../scripts/modules/api/user.api";
import { displayError, displaySuccess } from "../../scripts/modules/utils/erroHandlerUtils";

function createEventDetails(booking: any): string {
    const event = booking.event;
    const bookingId = booking.id;

    return `
        <div class="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0">
            <div id="separation-line" class="border-8 border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0"></div>
            <dl class="sm:divide-y sm:divide-gray-200 dark:divide-gray-700">
                <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Event Name
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                        <a href="/bookings?id=${bookingId}" class="text-blue-500 hover:text-blue-700">${event.eventName}</a>
                    </dd>
                </div>

                <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Event Date
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                        ${event.eventDate}
                    </dd>
                </div>

                <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Event Venue
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                        ${event.location}
                    </dd>
                </div>
            </dl>
        </div>
    `;
}


function createAccountDetailsFormHTML(user: any): string {

    const { firstName, lastName, email,} = user;
    const newPassword = '';
    const elements = [
        { label: 'First Name', id: 'firstName', value: firstName, disabled: ""},
        { label: 'Last Name', id: 'lastName', value: lastName, disabled: "" },
        { label: 'Email address', id: 'email', value: email, disabled: "disabled"},
        { label: 'New Password', id: 'password', value: newPassword, type: 'password', disabled: "" },
    ];

    const html = elements.map((element) => `
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">${element.label}</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                <input type="${element.type || 'text'}" name="${element.id}" id="${element.id}"
                    value="${element.value}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="${element.label}" ${element.disabled}>
            </dd>
        </div>
    `).join('');

    // Button
    const buttonHTML = `
        <div class="justify-center self-auto px-4 py-3 flex bg-gray-50 dark:bg-gray-800 text-right sm:px-6">
            <button id="editUserBtn" type="button"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save
            </button>
        </div>
    `;

    return `
        <div class="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200 dark:divide-gray-700">
                ${html}
            </dl>
            ${buttonHTML}
        </div>
    `;
}

function reloadEvent() {
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
}



document.addEventListener('DOMContentLoaded', async () => {
    navHandler();
    navCollapsible();

    if (! (await isLoggedIn())) {
        window.location.href = '/account/login.html';
    }

    const accessToken = localStorage.getItem('token')
        const bookings = await getSelfBookings(accessToken as string);
    // No booking tailwind component
    let eventsBooked = `
    <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                No Events Booked
            </h3>
            <div class="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
                <p>
                    You have not booked any events yet. Please visit the events page to book an event.
                </p>
            </div>
        </div>
    ` 
    if (bookings && bookings.success && bookings.data.length > 0) {
        eventsBooked = bookings.data.map((booking: any) => {
            return createEventDetails(booking);
        }).join('');
    }
    const eventsContainer = document.getElementById('eventsContainer');
    if (eventsContainer) {
        eventsContainer.innerHTML = eventsBooked;
    }

    const user = await getSelf(accessToken as string);
    let userData 
    if (!user.success) {
        userData = {
            firstName: 'unable to retrieve data',
            lastName: 'unable to retrieve data',
            email: 'unable to retrieve data',
        }
    } else {
        userData = user.data
    }
    const accountDetailsForm = createAccountDetailsFormHTML(userData);
    const accountDetailsContainer = document.getElementById('accountContainer');
    if (accountDetailsContainer) {
        accountDetailsContainer.innerHTML = accountDetailsForm;
    } else {
        console.log('accountDetailsContainer not found');
    }

    const editUserBtn = document.getElementById('editUserBtn');
    if (editUserBtn) {

        editUserBtn.addEventListener('click', async () => {
            const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
            const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
            const email = (document.getElementById('email') as HTMLInputElement).value;
            const password = (document.getElementById('password') as HTMLInputElement).value;

            // include password in data if it is not empty
            let data;
            if (password) {
                data = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                };
            } else {
                data = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                };
            }

            const accessToken = localStorage.getItem('token')

            const response = await updateSelf(data, accessToken as string);
            if (response.success) {
                displaySuccess(document.querySelector("#errorContainer") as HTMLElement, "User Detail Updated Successfully!");
                // can we just emit a 'DOMContentLoaded' event here?
                reloadEvent();

            } else {
                displayError(document.querySelector("#errorContainer") as HTMLElement,  response.error.message || 'User Detail Update Failed! ');
            }

        });
    } else {
        console.log('editUserBtn not found');
    }

    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', async () => {
            const response = await deleteSelf(accessToken as string);
            if (response.success) {
                displaySuccess(document.querySelector("#errorContainer") as HTMLElement, "User Deleted Successfully! Redirecting to login page...");
                localStorage.removeItem('token');
                setTimeout(() => {
                    window.location.href = '/account/login.html';
                }, 3000);
                
            } else {
                displayError(document.querySelector("#errorContainer") as HTMLElement,  response.error.message || 'User Delete Failed! ');
                reloadEvent();
            }
        });
    }


});