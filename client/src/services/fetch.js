export async function fetchData(url, method = 'GET', body = null, token = '') {
    try {
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/${url}`, {
            method,
            headers,
            ...(body && { body: JSON.stringify(body) })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return errorData || 'An error occurred';
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}