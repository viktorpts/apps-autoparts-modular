import { html } from '../../node_modules/lit-html/lit-html.js';

export const navTemplate = (hasUser) => html`
<a href="/">Home</a>
<a href="/catalog">Catalog</a>
${hasUser ? userNav() : guestNav()}
`;

const userNav = () => html`
<a href="/create">Create</a>
<a href="/logout">Logout</a>
`;

const guestNav = () => html`
<a href="/login">Login</a>
<a href="/register">Register</a>
`;