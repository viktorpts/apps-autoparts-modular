import { html } from '../../node_modules/lit-html/lit-html.js';

export const paginator = (page, total) => html`
<div class="paginator">
    ${page > 1 ? html`<a href="?page=${page - 1}">&lt; Prev</a>` : null}
    ${createPages(page, total)}
    ${page < total ? html`<a href="?page=${page + 1}">Next &gt;</a>` : null}
</div>
`;

function createPages(page, total) {
    let pages = [];

    for (let i = 1; i <= total; i++) {
        if (i == page) {
            pages.push(html`<a>${i}</a>`);
        } else {
            pages.push(html`<a href="?page=${i}">${i}</a>`);
        }
    }

    return pages;
}