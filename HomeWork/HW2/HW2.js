import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const room = new Map();
room.set("e320", {
  "Classroom": "322",
  "Function": "Multimedia Classroom",
});
room.set("e319", {
  "Classroom": "319",
  "Function": "Embedded Lab",
});

const router = new Router();

router
  .get("/", (context) => {
    context.response.body = `
      <html>
        <body>
        <a>Welcome Everyone!</a>
        </body>
      </html>`;
  })
  .get("/nqu", (context) => {
    context.response.body = `
      <html>
        <body>
          <a href="https://www.nqu.edu.tw/">NQU</a>
        </body>
      </html>`;
  })
  .get("/nqu/csie", (context) => {
    context.response.body = `
      <html>
        <body>
          <a href="https://csie.nqu.edu.tw/">NQU_CSIE</a>
        </body>
      </html>`;
  })
  .get("/nqu/csie/:id", (context) => {
    const roomId = context.params?.id;
    if (roomId && room.has(roomId)) {
      context.response.body = room.get(roomId);
      context.response.type = "json";
    } else {
      context.response.status = 404;
      context.response.body = { error: "Room not found" };
    }
  })
  .get("/room/:id", (context) => {
    const roomId = context.params?.id;
    if (roomId && room.has(roomId)) {
      const roomInfo = room.get(roomId);
      context.response.body = `
        <html>
          <body>
            ${roomId} => ${roomInfo["Function"]}
          </body>
        </html>`;
    } else {
      context.response.status = 404;
      context.response.body = { error: "Room not found" };
    }
  })
  .get("/to/nqu", (context) => {
    context.response.redirect('https://www.nqu.edu.tw/');
  })
  .get("/to/nqu/csie", (context) => {
    context.response.redirect('https://csie.nqu.edu.tw/');
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server is running at: http://127.0.0.1:8000");
await app.listen({ port: 8000 });
