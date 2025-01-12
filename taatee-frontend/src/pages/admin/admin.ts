import { navHandler, adminAccess } from "../../scripts/main";
import { navCollapsible } from "../../scripts/collapsible";
import { isLoggedIn } from "../../scripts/modules/utils/authUtils";
import { deleteSelf, getSelf, getSelfBookings, getUsers, updateSelf } from "../../scripts/modules/api/user.api";
import { displayError, displaySuccess } from "../../scripts/modules/utils/erroHandlerUtils";
import { createEvent, deleteEvent, getAllEvents, getEventBookings, cancelEvent, toggleEventStatus, getEvent, updateEvent} from "../../scripts/modules/api/event.api";
import { formatDate } from "../../scripts/helper";

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

function getStatus(positive: boolean, message?: string[]) {
    let positiveMsg = "Active";
    let negativeMsg = "Cancelled";
    if (message) {
        positiveMsg = message[0];
        negativeMsg = message[1];
    }
    let msg, color;

    if (positive) {
        msg = positiveMsg;
        color = "green";   
    } else {
        msg = negativeMsg;
        color = "red";
    }

    return `
    <div class="flex items-center">
        <div class="h-2.5 w-2.5 rounded-full bg-${color}-500 me-2"></div> ${msg}
    </div>`
}

interface EventData {
    id: number;
    eventName: string;
    eventDate: string;
    isCanceled: boolean;
    maxBooking: number | null;
    location: string;
    description: string;
    booked: number;
}

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    numberOfbookings: number;
}

function createUserRow(user: UserData) {
    const row = document.createElement("tr");
    row.classList.add("bg-white", "border-b", "dark:bg-gray-800", "dark:border-gray-700", "hover:bg-gray-50", "dark:hover:bg-gray-600");

    const tableDataName = document.createElement("th");
    tableDataName.setAttribute("scope", "row");
    tableDataName.classList.add("flex", "items-center", "px-6", "py-2", "font-medium", "text-gray-900", "whitespace-nowrap", "dark:text-white");

    const userNameContainer = document.createElement("div");
    userNameContainer.classList.add("ps-3");

    const userName = document.createElement("div");
    userName.classList.add("text-base", "font-semibold");
    userName.textContent = `${user.firstName} ${user.lastName}`;

    const userEmail = document.createElement("div");
    userEmail.classList.add("font-normal", "text-gray-500");
    userEmail.textContent = user.email;

    userNameContainer.appendChild(userName);
    userNameContainer.appendChild(userEmail);
    tableDataName.appendChild(userNameContainer);

    const tableDataRole = document.createElement("td");
    tableDataRole.classList.add("px-6", "py-4", "text-uppercase", "font-semibold", "text-gray-500", "dark:text-gray-400");
    tableDataRole.textContent = user.role; // Assuming you have a 'role' property in your user object

    const tableDataBookings = document.createElement("td");
    tableDataBookings.classList.add("px-6", "py-4");
    tableDataBookings.textContent = user.numberOfbookings + ""; // Assuming 'bookings' is an array of booking names

    row.appendChild(tableDataName);
    row.appendChild(tableDataRole);
    row.appendChild(tableDataBookings);

    return row;
}


function createEventRow(event: EventData): HTMLTableRowElement {
    const eventName = event.eventName;
    let eventDate = event.eventDate;
    eventDate = formatDate(eventDate, true);
    const eventLocation = event.location;
    const isActive = !event.isCanceled;


    const row = document.createElement("tr");
    const booked = `${event.booked} / ${event.maxBooking}`
    const cellContents = [eventName, eventLocation, eventDate, isActive, booked];
    cellContents.forEach((content) => {
        const cell = document.createElement("td");
        cell.classList.add("px-6", "py-4", "whitespace-nowrap");
        if (typeof content === "boolean") {
            cell.innerHTML = getStatus(content, ["Active", "Cancelled"]);
        } else {
        cell.textContent = content;
    }
        row.appendChild(cell);
    });

    const actionCell = document.createElement("td");
    const editLink = createLink("Edit", event); // it will be a pop up
    const deleteLink = createLink("Delete", event); // it will be a pop up
    let cancelLink;

    if (!isActive) {
        editLink.classList.add("hidden");
        deleteLink.classList.add("hidden");
        cancelLink = createLink("Activate", event);
    }  else {
        cancelLink = createLink("Cancel", event);
    }
     // it will be a pop up
    actionCell.appendChild(editLink);
    actionCell.appendChild(deleteLink);
    actionCell.appendChild(cancelLink);
    row.appendChild(actionCell);

    return row;
}


// create link creates a pop-up
function createLink(text: string, event: EventData) {
    const link = document.createElement("a");
    link.classList.add("font-medium", "text-blue-600", "dark:text-blue-500", "hover:underline", "px-2", "cursor-default");

    // add delete event listener
    if (text === "Delete") {
        // change the cursor to red delete icon
        link.classList.add("cursor-pointer", "text-red-600");
        link.addEventListener("click", async (e) => {
            e.preventDefault()
            const accessToken = localStorage.getItem('token')
            const response = await deleteEvent(event.id, accessToken as string);
            if (response.success) {
                displaySuccess(document.querySelector("#errorContainer") as HTMLElement, "Event Deleted Successfully!");
                reloadEvent();
            } else {
                displayError(document.querySelector("#errorContainer") as HTMLElement,  response.error.message || 'Event Deletion Failed! ');
            }
        });
    }

    if (text === "Cancel" || text === "Activate") {
        // change the cursor to red delete icon
        link.classList.add("cursor-pointer");
        link.addEventListener("click", async (e) => {
            e.preventDefault()
            const accessToken = localStorage.getItem('token')
            const response = await toggleEventStatus(event, accessToken as string);
            let action = "Cancelled";
            if (response.data.isCancelled) {
                action = "Activation";
            } else {
                action = "Cancellation";
            }[]
            if (response.success) {
                displaySuccess(document.querySelector("#errorContainer") as HTMLElement, `Event ${action} was Successful!`);
                reloadEvent();
            } else {
                displayError(document.querySelector("#errorContainer") as HTMLElement,  response.error.message || `Event ${action} Failed!`);
            }
        });
    }
    
    if (text === "Edit") {
        link.classList.add("editableEvent");
        link.classList.add("cursor-pointer");
        link.id = "" + event.id;
    }
    link.textContent = text;
    return link;
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

    const isAdmin = await adminAccess();
    
    if (!isAdmin) {
        // blur the whole window to show only the rror
        const sections = document.querySelectorAll("section");
        sections.forEach((section) => { section.classList.add("blur"); });
        // make an exception for the error container
        const errorContainer = document.querySelector("#errorContainer") as HTMLElement;
        errorContainer.classList.remove("blur");
        displayError(errorContainer, "You are not an admin!", "Access Denied")
        setTimeout(() => {
            window.location.href = '/user';
        }, 3000);  
    }

    const accessToken = localStorage.getItem('token')
    // users list table
    const usersList = await getUsers(accessToken as string);
    const usersContainer = document.getElementById('usersContainer') as HTMLElement;
    if (usersContainer) {
        if (usersList.success && usersList.data && usersList.data.length > 0) {
            usersContainer.innerHTML = '';
            
            usersList.data.forEach((user: UserData) => {
                const row = createUserRow(user);
                usersContainer.appendChild(row);
            });
        } else {
            displayError(document.querySelector("#errorContainer") as HTMLElement, "Users List Not Found, Inform the Developer about this Bug Please!");
        }
    } else {
        console.log('usersContainer not found');
    }

    const events = await getAllEvents();
    let eventsBody;

    if (events && events.success && events.data && events.data.length > 0) {
        eventsBody = events.data.map( async (event: any) => {
            const id = event.id;
            const booked = await getEventBookings(id, accessToken as string);
            booked.success ? event.booked = booked.data.length : event.booked = "-";
            return createEventRow(event);
        });
        eventsBody = await Promise.all(eventsBody);
    }

    const eventsTableBody = document.getElementById('eventsTableBody');

    if (eventsTableBody) {
        // Check if eventsBody is defined and has elements before proceeding
        if (eventsBody && eventsBody.length > 0) {

            // Clear the existing content of the eventsTableBody
            eventsTableBody.innerHTML = '';

            // Append each eventBody to the eventsTableBody
            eventsBody.forEach((eventBody: any) => {
                eventsTableBody.appendChild(eventBody);
            });
        } else {
            // Handle case when there are no events
            console.log("No events found");
        }
    }

        // Create New User Pop Up
        const modal = document.querySelector("#eventModal") as HTMLElement;
        const trigger = document.querySelector("#addEventBtn") as HTMLElement;
        const closeButton = document.querySelector("#closeEventModalBtn") as HTMLElement;
        const eventModalForm = document.querySelector("#eventModalForm") as HTMLElement;
    

        if(!modal || !trigger || !closeButton || !eventModalForm) {
            console.log("modal or trigger or closeButton or eventModalForm not found");
            console.log("modal " + modal)
            console.log("trigger " + trigger)
            console.log("closeButton " + closeButton)
            console.log("eventModalForm" + eventModalForm)
            displayError(document.querySelector("#errorContainer") as HTMLElement, "Form Not Properly Loaded, Inform the Developer about this Bug Please!");

        } else {

        // Open Modal
        trigger.addEventListener("click", () => {
            modal.classList.remove("hidden");
        });

        // Close Modal
        closeButton.addEventListener("click", () => {
            modal.classList.add("hidden");
        });

        // Close Modal on outside click
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.classList.add("hidden");
            }
        });

        // Create Event
        eventModalForm.addEventListener("submit", async (e) => {
                        // disable the normal behavior
            e.preventDefault();

            const eventName = (document.getElementById('eventName') as HTMLInputElement).value;
            const eventDate = (document.getElementById('eventDate') as HTMLInputElement).value;
            const eventLocation = (document.getElementById('eventLocation') as HTMLInputElement).value;
            const maxBooking = (document.getElementById('maxBooking') as HTMLInputElement).value;
            const description = (document.getElementById('eventDescription') as HTMLInputElement).value;
            const maxBookingVal = parseInt(maxBooking, 10);
            if (maxBookingVal < 0) {
                displayError(document.querySelector("#errorContainer") as HTMLElement, "Max Booking cannot be negative!");
                return;
            }
            if (maxBookingVal === 0) {
                displayError(document.querySelector("#errorContainer") as HTMLElement, "Max Booking cannot be zero!");
                return;
            }
            if (maxBookingVal > 1000) {
                displayError(document.querySelector("#errorContainer") as HTMLElement, "Max Booking cannot be greater than 1000!");
                return;
            }

            const data = {
                eventName: eventName,
                eventDate: eventDate,
                description: description,
                location: eventLocation,
                maxBooking: maxBookingVal,
            };

            const accessToken = localStorage.getItem('token')

            const response = await createEvent(data, accessToken as string);
            if (response.success) {
                displaySuccess(document.querySelector("#errorContainer") as HTMLElement, "Event Created Successfully!");
                // show success model
                modal.classList.add("hidden");
                // can we just emit a 'DOMContentLoaded' event here?
                reloadEvent();
            } else {
                displayError(document.querySelector("#errorContainer") as HTMLElement,  response.error.message || 'Event Creation Failed! ');
            }
        });

    }

    // Create Edit User Pop Up
    const editModal = document.querySelector("#editEventModal") as HTMLElement;
    const editTrigger = document.querySelector(".editableEvent") as HTMLElement;
    const editCloseButton = document.querySelector("#closeEditEventModalBtn") as HTMLElement;
    const editEventModalForm = document.querySelector("#editEventModalForm") as HTMLElement;


    if(!editModal || !editTrigger || !editCloseButton || !editEventModalForm) {
        console.log("editModal or editTrigger or editCloseButton or editEventModalForm not found");
        console.log("editModal " + editModal)
        console.log("editTrigger " + editTrigger)
        console.log("editCloseButton " + editCloseButton)
        console.log("editEventModalForm" + editEventModalForm)
        displayError(document.querySelector("#errorContainer") as HTMLElement, "Editing Form Not Properly Loaded, Inform the Developer about this Bug Please!");
    } else {
        // get all elements with ID editableEvent, and add event listener to each to popup, the event id is added asd the element's id
        const editableEvents = document.querySelectorAll(".editableEvent");
        editCloseButton.addEventListener("click", () => {
            editModal.classList.toggle("hidden");
        });
        window.addEventListener("click", (event) => {
            if (event.target === editModal) {
                editModal.classList.toggle("hidden");
            }
        });
        editableEvents.forEach((editableEvent) => {
            editableEvent.addEventListener("click", async (e) => {
                e.preventDefault();
                const eventId = parseInt(editableEvent.id, 10);
                let event = await getEvent(eventId);
                
                if (event.success) {
                    event = event.data;
                    
                    (document.getElementById('editEventName') as HTMLInputElement).value = event.eventName;
                    (document.getElementById('editEventDate') as HTMLInputElement).value = new Date(event.eventDate) + "";
                    (document.getElementById('editEventLocation') as HTMLInputElement).value = event.location;
                    (document.getElementById('editMaxBooking') as HTMLInputElement).value = event.maxBooking || "9999";
                    (document.getElementById('editEventDescription') as HTMLInputElement).value = event.description;
                    (document.getElementById('editEventId') as HTMLInputElement).value = event.id;
                    document.body.style.backdropFilter = 'blur(5px)';

                    // confirmEventEditionBtn
                   editEventModalForm.addEventListener("submit", async (e) => {
                    e.preventDefault();
                  
                    const editedName =  (document.getElementById('editEventName') as HTMLInputElement).value;
                    const editedDate = (document.getElementById('editEventDate') as HTMLInputElement).value
                    const editedLocation = (document.getElementById('editEventLocation') as HTMLInputElement).value
                    const editedMaxBooking = parseInt((document.getElementById('editMaxBooking') as HTMLInputElement).value)
                    const editedDescription = (document.getElementById('editEventDescription') as HTMLInputElement).value

                    const editedData = {
                        eventName: editedName,
                        eventDate: editedDate,
                        description: editedDescription,
                        location: editedLocation,
                        maxBooking: editedMaxBooking,
                    };

                    const accessToken = localStorage.getItem('token')
                    const update = await updateEvent(eventId, editedData, accessToken as string);

                    if (update.success) {
                        displaySuccess(document.querySelector("#errorContainer") as HTMLElement, "Event Updated Successfully!");
                        // can we just emit a 'DOMContentLoaded' event here?
                        reloadEvent();
                        editModal.classList.add("hidden");
                    } else {
                        displayError(document.querySelector("#errorContainer") as HTMLElement,  update.error.message || 'Event Update Failed! ');
                    }

                   });

                    editModal.classList.remove("hidden");
                } else {
                    displayError(document.querySelector("#errorContainer") as HTMLElement, "Event Not Found, Inform the Developer about this Bug Please!");
                }
                // csav
            });
        });
    }





        // Admin Self Account Management
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

    // Users List Table
