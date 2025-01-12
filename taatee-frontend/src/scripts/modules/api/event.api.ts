import { get, post, patch, del } from "../utils/apiUtils";

interface eventInterface {
    eventName?: string;
    eventDate?: string;
    description?: string;
    location?: string;
    isCanceled?: boolean;
    maxBooking?: number;
}

export async function getAllEvents(): Promise<any> {
  return await get('event');
}

export async function bookEvent(eventId: number, accessToken: string): Promise<any> {
    return await post(`event/${eventId}/book`,  undefined, accessToken);
  }

export async function getEvent(id: number): Promise<any> {
  return await get(`event/${id}`);
}

export async function updateEvent(id: number, updatedEvent: eventInterface,  accessToken: string): Promise<any> {
  return await patch(`event/${id}`, updatedEvent, accessToken);
}

export async function deleteEvent(id: number, accessToken: string): Promise<any> {
  return await del(`event/${id}`, accessToken);
}
export async function cancelEvent(id: number, accessToken: string): Promise<any> {
    const body = {
      isCanceled: true,
    }
    return await updateEvent(id, body, accessToken);
  }

export async function toggleEventStatus(event: any, accessToken: string): Promise<any> {
  const id = event.id;
  const body = {
      isCanceled: !event.isCanceled,
  }
  return await updateEvent(id, body, accessToken);
}

export async function getEventBookings(eventId: number, accessToken: string): Promise<any> { 
    // Admin only
    return await get(`event/${eventId}/booking`, accessToken);
  }
  
export async function createEvent(event: eventInterface, accessToken: string): Promise<any> {
    return await post('event', event, accessToken);
  }