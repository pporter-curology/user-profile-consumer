export interface User {
    id: number;
    firstName: string;
    lastName: string;
}

export const getUsers = async (baseUrl: string): Promise<Response> => {
    return fetch(`${baseUrl}/users`);
}