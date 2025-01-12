import { navHandler } from "../../scripts/main";
import { navCollapsible } from "../../scripts/collapsible";
import { getAllEvents } from "../../scripts/modules/api/event.api";
import { formatDate } from "../../scripts/helper";

interface EventData {
    id: number;
    eventName: string;
    eventDate: Date;
    isCanceled: boolean;
    maxBookings: number;
    location: string;
    description: string;
}



function createEventElement(eventData: EventData): HTMLDivElement {
    // Create the main div element
    const eventDiv: HTMLDivElement = document.createElement("div");
    eventDiv.classList.add("login-required")
    eventDiv.classList.add("max-w-sm", "sm:min-w-[360px]", "min-w-[98vw]", "p-6", "bg-white", "border", "border-gray-200", "rounded-lg", "shadow", "dark:bg-gray-800", "dark:border-gray-700"
    );

    // Create the anchor element for the event title
    const titleAnchor: HTMLAnchorElement = document.createElement("a");
    const isCanceled = eventData.isCanceled;
    if (isCanceled) {
        titleAnchor.classList.add("bg-red-200", "dark:bg-red-700");
        titleAnchor.href = '#';
    } else {
        titleAnchor.href = 'event_detail.html?id=' + eventData.id;
        titleAnchor.classList.add("bg-blue-200", "dark:bg-blue-700");
    }
    titleAnchor.classList.add("login-required");

    // Create the event title heading
    const titleHeading: HTMLHeadingElement = document.createElement("h5");
    titleHeading.classList.add("mb-2", "text-2xl", "font-bold", "tracking-tight", "text-gray-900", "dark:text-white");
    titleHeading.textContent = eventData.eventName;

    // Append the title heading to the anchor element
    titleAnchor.appendChild(titleHeading);

    // Append the anchor element to the main div
    eventDiv.appendChild(titleAnchor);

    // Create and append date paragraph
    const dateParagraph: HTMLParagraphElement = createParagraph(`Date: ${formatDate(eventData.eventDate + "")}`, "mb-1", "text-sm", "text-gray-500", "dark:text-gray-400", "font-semibold");
    eventDiv.appendChild(dateParagraph);

    // Create and append location paragraph
    const locationParagraph: HTMLParagraphElement = createParagraph("Location: " + eventData.location, "mb-2", "text-sm", "text-gray-500", "dark:text-gray-400", "font-semibold");
    eventDiv.appendChild(locationParagraph);

    // Create and append description paragraph
    const descriptionParagraph: HTMLParagraphElement = createParagraph(eventData.description, "mb-3", "font-normal", "text-gray-700", "dark:text-gray-400");
    eventDiv.appendChild(descriptionParagraph);

    // Create the "Book Now" button
    const bookNowButton: HTMLAnchorElement = document.createElement("a");
    bookNowButton.href = `event_detail.html?id=${eventData.id}`;
    bookNowButton.classList.add(
        "login-required", "inline-flex", "items-center", "px-3", "py-2", "text-sm", "font-medium", "text-center", "text-white", "bg-blue-700", "rounded-lg", "hover:bg-blue-800", "focus:ring-4", "focus:outline-none", "focus:ring-blue-300", "dark:bg-blue-600", "dark:hover:bg-blue-700", "dark:focus:ring-blue-800"
    );
    bookNowButton.textContent = "Details";
    if (eventData.isCanceled) {
        bookNowButton.classList.add("bg-red-700", "hover:bg-red-800", "dark:bg-red-600", "dark:hover:bg-red-700");
        bookNowButton.textContent = "Canceled";
    } else {
        bookNowButton.classList.add("bg-blue-700", "hover:bg-blue-800", "dark:bg-blue-600", "dark:hover:bg-blue-700");

    // Create the arrow icon within the button
    const arrowIcon: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    arrowIcon.classList.add("rtl:rotate-180", "w-3.5", "h-3.5", "ms-2");
    arrowIcon.setAttribute("aria-hidden", "true");
    arrowIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    arrowIcon.setAttribute("fill", "none");
    arrowIcon.setAttribute("viewBox", "0 0 14 10");
    arrowIcon.innerHTML = '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>';

    // Append the arrow icon to the button
    bookNowButton.appendChild(arrowIcon);
}

    // Append the button to the main div
    eventDiv.appendChild(bookNowButton);

    return eventDiv;
}

// Helper function to create paragraphs
function createParagraph(text: string, ...classes: string[]): HTMLParagraphElement {
    const paragraph: HTMLParagraphElement = document.createElement("p");
    paragraph.textContent = text;
    paragraph.classList.add(...classes);
    return paragraph;
}

document.addEventListener('DOMContentLoaded', async (e) => {
    const eventsContainer = document.querySelector('#eventsContainer') as HTMLDivElement;
    eventsContainer.innerHTML = '<h1 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-500 dark:text-white">Loading events...</h1>';

    if (eventsContainer) {
        // let us add list of events
        // get event data from the server
        const eventResult = await getAllEvents();
        eventsContainer.innerHTML = '';
        if (!eventResult || !eventResult.success) {
            eventsContainer.innerHTML = '<h1 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-500 dark:text-white">No Events found</h1>';
            const message = eventResult?.error?.message || 'No Events found';
            console.log(message);
            return;
        } else {
       const events = eventResult.data;
        // log the type
        console.log("I am at the event loop")
        console.log(typeof events);
        for (let event of events) {

            const eventElement: HTMLDivElement = createEventElement(event);
            eventsContainer.appendChild(eventElement);
        }
      }
    }

    navHandler();
    navCollapsible();
});