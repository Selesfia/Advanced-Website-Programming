import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js';
import { users, posts } from './data.js';

const router = new Router();
const app = new Application();

let currentUser = null;

router
  .get('/', home)
  .get('/signup', signupUi)
  .post('/signup', signup)
  .get('/login', loginUi)
  .post('/login', login)
  .get('/logout', logout)
  .get('/posts', listPosts)
  .get('/posts/new', newPost)
  .get('/posts/:id', showPost)
  .get('/posts/delete/:id', deleteConfirmation)
  .post('/posts/delete/:id', deletePost)
  .post('/posts', createPost);

app.use(router.routes());
app.use(router.allowedMethods());

async function home(ctx) {
  ctx.response.body = await render.home(currentUser);
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

    if (!userExists(username)) {
      users.push({ username, password });
      currentUser = { username };
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

    if (userExists(username) && checkPassword(username, password)) {
      currentUser = { username };
      ctx.response.redirect('/');
    } else {
      ctx.response.body = await render.loginForm({ error: "Invalid credentials" });
    }
  }
}

async function logout(ctx) {
  currentUser = null;
  ctx.response.redirect('/');
}

async function listPosts(ctx) {
  ctx.response.body = await render.listPosts(posts);
}

async function newPost(ctx) {
  if (currentUser) {
    ctx.response.body = await render.newPost();
  } else {
    ctx.response.body = await render.fail();
  }
}

async function showPost(ctx) {
  const postId = parseInt(ctx.params.id);
  const post = findPost(postId);

  if (post) {
    ctx.response.body = await render.showPost(post);
  } else {
    ctx.throw(404, 'Post not found');
  }
}

async function deleteConfirmation(ctx) {
  const postId = parseInt(ctx.params.id);
  const post = findPost(postId);

  if (post) {
    ctx.response.body = await render.deleteConfirmation(post);
  } else {
    ctx.throw(404, 'Post not found');
  }
}

async function deletePost(ctx) {
  const postId = parseInt(ctx.params.id);
  const index = posts.findIndex(p => p.id === postId);

  if (index !== -1) {
    posts.splice(index, 1);
    ctx.response.body = await render.success();
  } else {
    ctx.response.body = await render.fail();
  }
}

async function createPost(ctx) {
  const body = ctx.request.body();
  if (body.type === "form") {
    const formData = await body.value;
    const title = formData.get('title');
    const content = formData.get('content');
    const postId = posts.length + 1;

    if (currentUser) {
      posts.push({ id: postId, title, content, author: currentUser.username });
      ctx.response.redirect('/posts');
    } else {
      ctx.throw(404, 'Not logged in!');
    }
  }
}

function userExists(username) {
  return users.some(u => u.username === username);
}

function checkPassword(username, password) {
  const user = users.find(u => u.username === username);
  return user && user.password === password;
}

function findPost(postId) {
  return posts.find(p => p.id === postId);
}

console.log('Server run at http://127.0.0.1:8000');
await app.listen({ port: 8000 });
