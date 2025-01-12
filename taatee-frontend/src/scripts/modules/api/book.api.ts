import { get, del } from "../utils/apiUtils";

export async function getAllBookings(accessToken: string): Promise<any> {
  return await get('booking', accessToken);
}

export async function getBooking(id: number, accessToken: string): Promise<any> {
  return await get(`booking/${id}`, accessToken);
}

export async function deleteBooking(id: number, accessToken: string): Promise<any> {
  return await del(`booking/${id}`, accessToken);
}
