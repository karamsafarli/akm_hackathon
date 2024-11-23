import { jwtDecode } from "jwt-decode";

export const getUserFromToken = () => {
    const token = localStorage.getItem('token');

    if (!token) return;

    const payload = jwtDecode(token);
    return payload;
}
