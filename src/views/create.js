import { html } from '../../node_modules/lit-html/lit-html.js';

import { createPart } from '../data/parts.js';
import { notify } from '../notify.js';
import { createSubmitHandler, disableForm, enableForm, showSection } from '../util.js';

const section = (onSubmit, errorMsg) => html`
<section id="create">
    <h1>Create new part</h1>
    <form @submit=${onSubmit}>
        ${errorMsg ? html`<p class="error">${errorMsg}</p>` : null}
        <label>Label: <input type="text" name="label"></label>
        <label>Price: <input type="number" step="0.01" name="price"></label>
        <label>Quantity: <input type="number" step="1" name="qty"></label>
        <label>Label: <textarea name="description"></textarea></label>
        <button>Publish</button>
    </form>
</section>`;

export function showCreate(ctx) {
    update();

    function update(errorMsg) {
        showSection(section(createSubmitHandler(onCreate), errorMsg));
    }

    async function onCreate({ label, price, qty, description }, form) {
        disableForm(form);

        price = Number(price);
        qty = Number(qty);

        if (!label || !description) {
            enableForm(form);
            return update('All fields are required');
        }
        if (price <= 0) {
            enableForm(form);
            return update('Price must be a positive number');
        }
        if (qty < 0) {
            enableForm(form);
            return update('Quantity cannot be negative');
        }

        const result = await createPart({
            label,
            price,
            qty,
            description
        });

        enableForm(form);
        form.reset();

        ctx.page.redirect('/catalog/' + result._id);
    }
}