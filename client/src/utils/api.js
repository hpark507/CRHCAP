
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getUsers = async () => {
    /** Expected format from API
     * {
        "23881380": {
            "id": 1,
            "surname": "wang",
            "emplid": "23881380",
            "class_code": "CSE 110",
            "score": 0
        }
        }
     */
    const response = await fetch(`${backendUrl}/users`);
    const data = await response.json();

    return Object.values(data);
}

export const getUserData = async (emplid) => {
    const response = await fetch(`${backendUrl}/users/${emplid}`);
    const data = await response.json();

    return data;
}
