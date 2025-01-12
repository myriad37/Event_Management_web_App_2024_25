import { get, patch, del } from "../utils/apiUtils";

export async function getSelf(accessToken: string): Promise<any> {
  return await get('user', accessToken);
}

export async function getSelfBookings(accessToken: string): Promise<any> {
  return await get('user/booking', accessToken);
}

export async function updateSelf(updateUser: any, accessToken: string): Promise<any> {
  return await patch('user', updateUser, accessToken);
}

export async function deleteSelf(accessToken: string): Promise<any> {
    return await del('user', accessToken);
  }


// Admin Functions

export async function deleteUser(id: number,  accessToken: string): Promise<void> {
  return await del(`user/${id}`, accessToken);
}

export async function updateUser(id: number, updateUser: any,  accessToken: string): Promise<any> {
    return await patch(`user/${id}`, updateUser, accessToken);
}

export async function getBookings(userId: number, accessToken: string): Promise<any> {
    return await get(`user/${userId}/bookings`, accessToken);
  }

export async function getUserById(id: number, accessToken: string): Promise<any> {
    return await get(`user/${id}`, accessToken);
  }

export async function getUsers(accessToken: string): Promise<any> {
    return await get('user/all', accessToken);
  }