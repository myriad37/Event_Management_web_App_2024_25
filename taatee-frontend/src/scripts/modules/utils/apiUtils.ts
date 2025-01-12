const BASE_URL = 'http://localhost:3000/';

export async function get(endpoint: string, accessToken?: string): Promise<any> {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers: { 
                Authorization: `Bearer ${accessToken}`, 
            },
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, data };
        } else {
            const errorData = await response.json();
            return { success: false, error: errorData };
        }
    } catch (error) {
        console.error('Error fetching data from API', error);
        return { success: false, error: { message: "An error occurred while fetching data." } };
    }
}

export async function del(endpoint: string, accessToken?: string): Promise<any> {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`, 
            },
        });

        if (response.ok) {
            return { success: true };
        } else {
            const errorData = await response.json();
            return { success: false, error: errorData };
        }
    } catch (error) {
        console.error('Error deleting data from API', error);
        return { success: false, error: { message: "An error occurred while deleting data." } };
    }
}

export async function post(endpoint: string, body?: any, accessToken?: string): Promise<any> {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, data };
        } else {
            const errorData = await response.json();
            return { success: false, error: errorData };
        }
    } catch (e: any) {
        console.error('Error posting data to API', e);
    return {
        success: false,
        error: {
            message: `An error occurred while connecting to the API: ${e.message || 'Unknown error'}`,
            },
        };
    }  
}

export async function patch(endpoint: string, body: any, accessToken?: string): Promise<any> {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`, 
                    },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, data };
        } else {
            const errorData = await response.json();
            return { success: false, error: errorData };
        }
    } catch (error) {
        console.error('Error patching data to API', error);
        return { success: false, error: { message: "An error occurred while updating." } };
    }
}
