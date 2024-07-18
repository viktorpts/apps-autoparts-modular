import { html } from '../../node_modules/lit-html/lit-html.js';

import { showSection } from '../util.js';

const section = () => html`
<section id="home">
    <h1>Welcome to autoparts!</h1>
    <p>Browse a wide selection of quality parts for your vehicle needs!</p>
    <p><a id="catalog-link" href="/catalog">Open Catalog</a></p>
</section>
`;

export function showHome() {
    showSection(section());
}