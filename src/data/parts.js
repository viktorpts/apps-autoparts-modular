import { del, get, post, put } from './api.js';

const pageSize = 5;

export async function getAllParts(query, page = 1) {
    const params = [];

    if (query) {
        const param = 'where=' + encodeURIComponent(`label LIKE "${query}"`);
        params.push(param);
    }
    if (page) {
        params.push(`offset=${(page - 1) * pageSize}`, `pageSize=${pageSize}`);
    }

    const paramString = params.length ? '?' + params.join('&') : '';

    const url = '/data/autoparts' + paramString;

    const [results, count] = await Promise.all([
        get(url),
        get('/data/autoparts?count')
    ]);

    return {
        results,
        total: Math.ceil(count / pageSize)
    };
}

export async function getPartById(id) {
    return get('/data/autoparts/' + id);
}

export async function createPart(partData) {
    return post('/data/autoparts', partData);
}

export async function updatePart(id, partData) {
    return put('/data/autoparts/' + id, partData);
}

export async function deletePart(id) {
    return del('/data/autoparts/' + id);
}