import { html } from '../../node_modules/lit-html/lit-html.js';

import { post } from '../data/api.js';
import { createSubmitHandler, setUserData, showSection, updateUserNav } from '../util.js';

const section = (onSubmit) => html`
<section id="register">
    <h1>Register</h1>
    <form @submit=${onSubmit}>
        <label>Email: <input type="text" name="email"></label>
        <label>Password: <input type="password" name="password"></label>
        <label>Repeat: <input type="password" name="repass"></label>
        <button>Sign Up</button>
        <p>Already have an account? <a id="login-link" href="/login">Login here</a></p>
    </form>
</section>`;

export function showRegister(ctx) {
    showSection(section(createSubmitHandler(onRegister)));

    async function onRegister({ email, password, repass }, form) {
        if (!email || !password) {
            return alert('All fields are required!');
        }
    
        if (password != repass) {
            return alert('Passwords don\'t match!');
        }
    
        const userData = await post('/users/register', { email, password });
    
        setUserData(userData);
    
        form.reset();
    
        updateUserNav();
        ctx.page.redirect('/catalog');
    }
}