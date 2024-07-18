import { html } from '../../node_modules/lit-html/lit-html.js';
import { until } from '../../node_modules/lit-html/directives/until.js';

import { getAllParts } from '../data/parts.js';
import { createSubmitHandler, showSection } from '../util.js';
import { paginator } from './paginator.js';

const section = (partsPromise, query, onSearch, page = 1, total) => html`
<section id="catalog">
    <h1>Parts Catalog</h1>
    <form @submit=${onSearch}>
        <input name="query" .value=${query}><button>Search</button>
    </form>
    ${until(partsPromise, html`<p>Loading &hellip;</p>`)}
</section>`;

const partTemplate = (partData) => html`
<li><a id=${partData._id} href="/catalog/${partData._id}">${partData.label} - $${partData.price}</a></li>`;

export function showCatalog(ctx) {
    let query = '';
    let page;

    if (ctx.querystring) {
        const search = new URLSearchParams(ctx.querystring);
        query = search.get('query');
        page = Number(search.get('page')) || undefined;
    }

    const total = 5;

    showSection(section(loadAndShowParts(query, page), query, createSubmitHandler(onSearch), page, total));

    function onSearch({ query }, form) {
        if (query) {
            ctx.page.redirect('/catalog?query=' + query);
        } else {
            ctx.page.redirect('/catalog');
        }
    }
}

async function loadAndShowParts(query, page) {
    const { results: parts, total } = await getAllParts(query, page);

    return html`
    ${paginator(page, total, query)}
    <ul id="parts">
        ${parts?.map(partTemplate)}
    </ul>
    ${paginator(page, total)}
    `;
}