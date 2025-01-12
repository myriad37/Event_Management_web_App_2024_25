import { navHandler } from "../../scripts/main";
import { navCollapsible } from "../../scripts/collapsible";
import { getEvent } from "../../scripts/modules/api/event.api";
import { bookEvent } from "../../scripts/modules/api/event.api";
import { displayError, displaySuccess } from "../../scripts/modules/utils/erroHandlerUtils";
import { formatDate } from "../../scripts/helper";


document.addEventListener('DOMContentLoaded', async (e) => {
    navHandler();
    navCollapsible();
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    if (!eventId) {
        window.location.href = '/events.html';
        return;
    }

    const event = await getEvent(parseInt(eventId));
    if (event.success === false) {
        window.location.href = '/events.html';
        return;
    }

    // eventTitle eventDescription eventLocation eventDate confirmBooking 
    const eventTitle = document.getElementById('eventTitle') as HTMLElement;
    const eventDescription = document.getElementById('eventDescription') as HTMLElement;
    const eventLocation = document.getElementById('eventLocation') as HTMLElement;
    const eventDate = document.getElementById('eventDate') as HTMLElement;
    const confirmBooking = document.getElementById('confirmBooking') as HTMLElement;

    eventTitle.classList.add("text-2xl", "font-bold", "tracking-tight", "text-gray-900", "dark:text-white");
    eventDescription.classList.add("text-sm", "text-gray-500", "dark:text-gray-400", "font-semibold");
    eventLocation.classList.add("text-sm", "text-gray-500", "dark:text-gray-400", "font-semibold");
    eventDate.classList.add("text-sm", "text-gray-500", "dark:text-gray-400", "font-semibold");
    confirmBooking.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded");



    eventTitle.textContent = event.data.eventName;
    eventDescription.textContent = event.data.description;
    eventLocation.textContent = event.data.location;
    eventDate.textContent = formatDate(event.data.eventDate);
    
    // let us add a function to book on confirmBooking
    confirmBooking.addEventListener('click', async (e) => {
        
        e.preventDefault();
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            window.location.href = '/account/login.html';
            return;
        }


        const result = await bookEvent(event.data.id, accessToken);

        if (result.success === true) {
            // wait three seconds
            displaySuccess(document.querySelector("#errorContainer") as HTMLElement, "You have successfully booked this event. You will be redirected to your bookings in 3 seconds.");
            setTimeout(() => {
                window.location.href = '/bookings/?' + 'id=' + result.data.id;
            }, 3000);
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