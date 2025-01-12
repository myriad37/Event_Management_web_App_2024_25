import { navHandler } from "../../scripts/main";
import { navCollapsible } from "../../scripts/collapsible";
import { deleteBooking, getBooking } from "../../scripts/modules/api/book.api";
import { displayError, displaySuccess } from "../../scripts/modules/utils/erroHandlerUtils";
import { getSelf } from "../../scripts/modules/api/user.api";
import { isLoggedIn } from "../../scripts/modules/utils/authUtils";

function generateReceipt(
    booking: any
): string {
    const user = booking.data.user;
    const event = booking.data.event;

    const bookingId = booking.data.id;
    const bookingDate = booking.data.bookingDate;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const email = user.email;

    const eventName = event.eventName;
    const venue = event.location;
    const eventDate = event.eventDate;

    return `
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Booking Receipt</h2>
            </div>
            <div class="space-y-8 lg:grid lg:grid-cols-1 sm:gap-4 xl:gap-8 lg:space-y-0">
                <!-- Booking Info-->
                <div class="flex flex-col p-6 mb-0 mx-auto max-w-xl text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:px-8 dark:bg-gray-800 dark:text-white">
                    <h3 class="mb-2 text-2xl font-semibold w-l">Booking Info</h3>
                    <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Booking ID: ${bookingId}</p>
                    <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Booking Date: ${bookingDate}</p>
            
                    <!-- User Info -->
                    <h3 class="mb-2 text-2xl font-semibold">Customer Info</h3>
                    <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">First Name: ${firstName}</p>
                    <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Last Name: ${lastName}</p>
                    <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Email: ${email}</p>

                    <!-- Event Info -->
                    <h3 class="mb-2 text-2xl font-semibold">Event Info</h3>
                    <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Event: ${eventName}</p>
                    <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Venue: ${venue}</p>
                    <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Date: ${eventDate}</p>

                    <button id="bookingCancel" class="bg-red-500 hover:bg-red-600 mt-2 text-white font-bold py-2 px-4 rounded">
                        Cancel Booking
                    </button>
                </div>
                
            </div>
        </div>
    `;
}


document.addEventListener('DOMContentLoaded', async (e) => {
    navHandler();
    navCollapsible();
    const urlParams = new URLSearchParams(window.location.search);
    const bookingId = urlParams.get('id');

    (!(await isLoggedIn())) ? window.location.href = '/account/login.html' : null;

    if (!bookingId) {
        window.location.href = '/events.html';
        return;
    }

    if (!localStorage.getItem('token')) {
        window.location.href = '/account/login.html';
        return;
    }

    const booking = await getBooking(parseInt(bookingId), localStorage.getItem('token') as string);
    if (booking.success === false) {
        window.location.href = '/events.html';
        return;
    }
    
    // get container (receiptContainer)
    const receiptContainer = document.querySelector("#receiptContainer") as HTMLElement;
    if (receiptContainer) {
        receiptContainer.innerHTML = generateReceipt(booking);
    }
   

    const accessToken = localStorage.getItem('token');
    getSelf(accessToken as string).then((result) => {
        if (result.success === false) {
            return;
        }

        const user = result.data;
        const userId = user.id;
        const bookingUserId = booking.data.user.id;

        if (userId !== bookingUserId) {
            window.location.href = '/events.html';
            return;
        }
    });
    
    const cancelBooking = document.getElementById('bookingCancel') as HTMLElement;

    // let us add a function to book on confirmBooking
    cancelBooking.addEventListener('click', async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            window.location.href = '/account/login.html';
            return;
        }

        const result = await deleteBooking(booking.data.id, accessToken);
        if (result.success === true) {
            // wait three seconds
            displaySuccess(document.querySelector("#errorContainer") as HTMLElement, "You have successfully cancelled this booking.");
            setTimeout(() => {
                window.location.href = '/user/';
            }, 2500);
            return;
        }
        // display error
        const message = result.error.message
        const errorContainer = document.querySelector("#errorContainer") as HTMLElement;
        if (errorContainer) {
            displayError(errorContainer, message);
        }
                
    });

});