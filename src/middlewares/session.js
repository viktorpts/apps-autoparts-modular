import { getUserData } from '../util.js';

export function session(ctx, next) {
    const userData = getUserData();

    if (userData) {
        ctx.userData = userData;
    }

    next();
}