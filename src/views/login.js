import { html } from '../../node_modules/lit-html/lit-html.js';

import { post } from '../data/api.js';
import { createSubmitHandler, setUserData, showSection, updateUserNav } from '../util.js';

const section = (onSubmit) => html`
<section id="login">
    <h1>Login</h1>
    <form @submit=${onSubmit}>
        <label>Email: <input type="text" name="email"></label>
        <label>Password: <input type="password" name="password"></label>
        <button>Sign In</button>
        <p>Don't have an account? <a id="register-link" href="/register">Register here</a></p>
    </form>
</section>`;

export function showLogin(ctx) {
    showSection(section(createSubmitHandler(onLogin)));

    async function onLogin({ email, password }, form) {
        const userData = await post('/users/login', { email, password });
    
        setUserData(userData);
    
        form.reset();
    
        updateUserNav();
        ctx.page.redirect('/catalog');
    }
}