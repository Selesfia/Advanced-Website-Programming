import { Application, send } from "https://deno.land/x/oak/mod.ts";
import { WebSocketServer } from "https://deno.land/x/websocket/mod.ts";

const app = new Application();

const posts = [
  { id: 0, title: '胡禎恩', body: '0937711339' },
  { id: 1, title: '胡嘉欣', body: '0971660435' }
];

// Change the port for the WebSocket server
const wsPort = 8081;
const wss = new WebSocketServer(wsPort);

wss.on("connection", function (ws) {
  ws.on("message", function (message) {
    var id, post, msg = JSON.parse(message);
    console.log('msg=', msg);
    switch (msg.type) {
      case 'list':
        ws.send(JSON.stringify({ type: 'list', posts }));
        break;
      case 'show':
        id = msg.post.id;
        post = posts[id];
        ws.send(JSON.stringify({ type: 'show', post }));
        break;
      case 'create':
        post = msg.post;
        id = posts.push(post) - 1;
        post.created_at = new Date();
        post.id = id;
        ws.send(JSON.stringify({ type: 'create', post }));
        break;
    }
  });
});

app.use(async (ctx, next) => {
  await next();
  console.log('path=', ctx.request.url.pathname);
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/public/`,
    index: "index.html",
  });
});

console.log(`Server run at http://127.0.0.1:8001 (HTTP)`);
console.log(`WebSocket server run at ws://127.0.0.1:${wsPort}`);
await app.listen({ port: 8001 });

