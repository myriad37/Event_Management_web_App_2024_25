// Check if user is logged in

// step 1 check for token in localStorage
// step 2 if token exists, send it to the server to check if it is valid else return false
// step 3 if token is valid, return true, otherwise return false

import { validateToken } from "../api/auth.api";

export const isLoggedIn = async (key = "token") => {
    const token = localStorage[key];
    if (token) {
        try {
            const res = await validateToken(token);
            if (res.success === true) {
                const data = await res.data;

                if (data.valid === true) {
                    return true;
                } else {
                    return false;
                }
            } else {
                console.error('Error validating token:', res.error);
                return false;
            }
        } catch (err) {
            console.error('Error validating token:', err);
            return false;
        }
    }
    return false;
};

