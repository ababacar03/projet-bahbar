import { jwtDecode } from "jwt-decode";

export const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('[checkAuth] No token found');
        return null;
    }

    try {
        const decoded = jwtDecode(token);
        console.log('[checkAuth] Decoded token:', decoded);

        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            console.log('[checkAuth] Token expired');
            localStorage.removeItem('token');
            return null;
        }

        return decoded;

    } catch (err) {
        console.error('[checkAuth] Error decoding token:', err);
        localStorage.removeItem('token');
        return null;
    }
};
