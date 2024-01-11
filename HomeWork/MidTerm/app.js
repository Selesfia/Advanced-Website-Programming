
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js';

const router = new Router();
const app = new Application();

let user = null;
const contacts = [
  { id: 1, name: 'John Doe', phone: '123-456-7890' },
  { id: 2, name: 'Jane Doe', phone: '987-654-3210' },
];

router
  .get('/', home)
  .get('/signup', signupUi)
  .post('/signup', signup)
  .get('/login', loginUi)
  .post('/login', login)
  .get('/logout', logout)
  .get('/contacts/search', search)
  .get('/contacts/new', add)
  .get('/contacts/delete/:id', deleteConfirmation)
  .post('/contacts/delete/:id', deleteContact);

app.use(router.routes());
app.use(router.allowedMethods());

async function home(ctx) {
  ctx.response.body = await render.home(user);
}

async function signupUi(ctx) {
  ctx.response.body = await render.signupForm();
}

async function signup(ctx) {
  const body = ctx.request.body();
  if (body.type === "form") {
    const formData = await body.value;
    const username = formData.get('username');
    const password = formData.get('password');
    const email = formData.get('email');
    
    // Check if the user already exists
    if (!userExists(username)) {
      user = { username, password, email };
      ctx.response.body = await render.success();
    } else {
      ctx.response.body = await render.fail({ error: "Username already exists." });
    }
  }
}

async function loginUi(ctx) {
  ctx.response.body = await render.loginForm();
}

async function login(ctx) {
  const body = ctx.request.body();
  if (body.type === "form") {
    const formData = await body.value;
    const username = formData.get('username');
    const password = formData.get('password');
    
    // Check if the user exists and the password is correct
    if (userExists(username) && checkPassword(username, password)) {
      user = { username };
      ctx.response.redirect('/');
    } else {
      ctx.response.body = await render.loginForm({ error: "Invalid credentials" });
    }
  }
}

async function logout(ctx) {
  user = null;
  ctx.response.redirect('/');
}

async function search(ctx) {
  ctx.response.body = await render.searchContacts(contacts);
}

async function add(ctx) {
  ctx.response.body = await render.addContactForm();
}

async function deleteConfirmation(ctx) {
  const contactId = parseInt(ctx.params.id);
  const contact = contacts.find(c => c.id === contactId);
  
  if (!contact) {
    ctx.throw(404, 'Contact not found');
  }

  ctx.response.body = await render.deleteContactForm(contact);
}

async function deleteContact(ctx) {
  const contactId = parseInt(ctx.params.id);
  const index = contacts.findIndex(c => c.id === contactId);
  
  if (index !== -1) {
    contacts.splice(index, 1);
    ctx.response.body = await render.success();
  } else {
    ctx.response.body = await render.fail();
  }
}

function userExists(username) {
  return user && user.username === username;
}

function checkPassword(username, password) {
  // In a real application, you should check against a hashed password
  return user && user.password === password;
}

console.log('Server run at http://127.0.0.1:8000');
await app.listen({ port: 8000 });
