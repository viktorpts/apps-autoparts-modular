import { clearUserData, getUserData } from '../util.js';

const hostname = 'http://localhost:3030';

export async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();
    const accessToken = userData?.accessToken;

    if (accessToken) {
        options.headers['X-Authorization'] = accessToken;
    }

    try {
        const response = await fetch(hostname + url, options);

        if (!response.ok) {
            const error = await response.json();

            if (response.status == 403 && error.message == 'Invalid access token') {
                clearUserData();
            }

            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export const get = (url) => request('get', url);
export const post = (url, data) => request('post', url, data);
export const put = (url, data) => request('put', url, data);
export const del = (url) => request('delete', url);