import page from '../node_modules/page/page.mjs';

import { session } from './middlewares/session.js';
import { clearUserData, updateUserNav } from './util.js';
import { get } from './data/api.js';
import './notify.js';

import { showHome } from './views/home.js';
import { showCatalog } from './views/catalog.js';
import { showDetails } from './views/details.js';
import { showCreate } from './views/create.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showEdit } from './views/edit.js';


updateUserNav();

page(session);

page('/', showHome);
page('/catalog', showCatalog);
page('/catalog/:id', showDetails);
page('/edit/:id', showEdit);
page('/login', showLogin);
page('/register', showRegister);
page('/create', showCreate);
page('/logout', onLogout);

page.start();

function onLogout() {
    get('/users/logout');
    clearUserData();
    updateUserNav();
    page.redirect('/');
}