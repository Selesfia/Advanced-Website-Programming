import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { acceptable, acceptWebSocket, WebSocket } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js';

const posts = [
  { id: 0, title: '胡禎恩', body: '0937711339' },
  { id: 1, title: '胡嘉欣', body: '0971660435' }
];

const router = new Router();

router
  .get('/', list)
  .get("/search/search", search)
  .get('/post/new', add)
  .get('/post/:id', show)
  .post("/search", find)
  .post('/post', create)
  .get("/ws", wsHandler); // WebSocket endpoint

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

async function list(ctx) {
  ctx.response.body = await render.list(posts);
}

async function add(ctx) {
  ctx.response.body = await render.newPost();
}

async function show(ctx) {
  const id = ctx.params.id;
  const post = posts[id];
  if (!post) ctx.throw(404, 'invalid post id');
  ctx.response.body = await render.show(post);
}

async function search(ctx) {
  ctx.response.body = await render.search();
}

async function find(ctx) {
  const body = ctx.request.body();
  if (body.type === "form") {
    const pairs = await body.value;
    let name, number;
    for (let i of pairs) {
      name = i[1];
    }

    const found = posts.some(post => post.title === name);

    if (found) {
      for (let i of posts) {
        if (i.title == name)
          number = i.body;
      }
      ctx.response.body = await render.found(name, number);
    } else {
      ctx.response.body = await render.not_found();
    }
  }
}

async function create(ctx) {
  const body = ctx.request.body();
  if (body.type === "form") {
    const pairs = await body.value;
    const post = {};
    for (const [key, value] of pairs) {
      post[key] = value;
    }
    console.log('post=', post);
    const id = posts.push(post) - 1;
    post.created_at = new Date();
    post.id = id;
    ctx.response.redirect('/');
  }
}

async function wsHandler(ctx) {
  const { conn, r: bufReader, w: bufWriter, headers } = ctx.request.serverRequest;

  if (acceptable(headers)) {
    const ws = await acceptWebSocket({
      conn,
      bufReader,
      bufWriter,
      headers,
    });

    // Handle WebSocket communication here
    handleWebSocket(ws);
  }
}

async function handleWebSocket(ws) {
  // Send a welcome message when a WebSocket connection is established
  ws.send('Welcome to the WebSocket server!');

  // Listen for messages from the client
  while (true) {
    const { done, value } = await ws.next();
    
    if (done) {
      break;
    }

    const event = value;

    if (typeof event === "string") {
      console.log("WebSocket text message:", event);
      // Handle text messages
    } else if (event instanceof Uint8Array) {
      console.log("WebSocket binary message:", event);
      // Handle binary messages
    }
  }
}


console.log('Server run at http://127.0.0.1:8000');
await app.listen({ port: 8000 });
