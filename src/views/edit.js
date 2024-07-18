import { html } from '../../node_modules/lit-html/lit-html.js';

import { getPartById, updatePart } from '../data/parts.js';
import { createSubmitHandler, showSection } from '../util.js';

const section = (partData, onSubmit) => html`
<section id="edit">
    <h1>Update part details</h1>
    <form @submit=${onSubmit}>
        <label>Label: <input type="text" name="label" .value=${partData.label}></label>
        <label>Price: <input type="number" step="0.01" name="price" .value=${partData.price}></label>
        <label>Quantity: <input type="number" step="1" name="qty" .value=${partData.qty}></label>
        <label>Label: <textarea name="description" .value=${partData.description}></textarea></label>
        <button>Save</button>
    </form>
</section>`;

export async function showEdit(ctx) {
    const partId = ctx.params.id;

    const partData = await getPartById(partId);

    showSection(section(partData, createSubmitHandler(onEdit)));

    async function onEdit({ label, price, qty, description }, form) {
        price = Number(price);
        qty = Number(qty);

        if (!label || !description) {
            return alert('All fields are required');
        }
        if (price <= 0) {
            return alert('Price must be a positive number');
        }
        if (qty < 0) {
            return alert('Quantity cannot be negative');
        }

        await updatePart(partId, {
            label,
            price,
            qty,
            description
        });

        form.reset();

        ctx.page.redirect('/catalog/' + partId);
    }
}