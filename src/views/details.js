import { html } from '../../node_modules/lit-html/lit-html.js';

import { deletePart, getPartById } from '../data/parts.js';
import { showSection } from '../util.js';

const section = (data, isOwner, onDelete) => html`
<section id="details">
    <h1>Part Details</h1>
    <h2>${data?.label || html`Loading &hellip;`}</h2> <!-- Part label -->
    <p class="subtitle">${data ? `$${data.price} | ${data.qty} in stock` : html`Loading &hellip;`}</p>
    <!-- Part price and quantity in stock -->
    <p class="description">${data?.description || html`Loading &hellip;`}</p> <!-- Part description -->

    ${isOwner ? html`<div>
        <a href="/edit/${data._id}">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)">Delete</a>
    </div>` : null}
</section>`;

export async function showDetails(ctx) {
    const partId = ctx?.params?.id;

    showSection(section());

    const data = await getPartById(partId);

    const { userData } = ctx;

    const isOwner = userData?._id == data._ownerId;

    showSection(section(data, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            await deletePart(partId);
            ctx.page.redirect('/catalog');
        }
    }
}