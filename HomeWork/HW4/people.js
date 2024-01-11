import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
 
const peoples = new Map();
peoples.set("Jessline", {
  account: "Jessline",
  password: "011002",
});
peoples.set("Celine", {
  account: "Celine",
  password: "041100",
});

const router = new Router();
router
  .get("/", (ctx) => {
    ctx.response.body = "Welcome!";
  })
  .get("/public/(.*)", async (ctx) => {
    let wpath = ctx.params[0]
    //console.log('wpath=', wpath)
    await send(ctx, wpath, {
      root: Deno.cwd()+"/public/",
      index: "index.html",
    })
  })
  .post("/people/login", async (ctx) => {
    const body = ctx.request.body()
    if (body.type === "form") {
      const pairs = await body.value
      //console.log('pairs=', pairs)
      const params = {}
      for (const [key, value] of pairs) {
        params[key] = value
      }
      console.log('params=', params)
      let account = params['account']
      let password = params['password']
      //console.log(`account=${account} password=${password}`)
      ctx.response.type = 'text/html'
      if (peoples.has(account) && peoples.get(account).password == password) {
        ctx.response.body = `
          <h1>Login Success</h1>
          <h2><a href="/public/index.html">Enter the system</a></h2>`
      } else {
        ctx.response.body = `
          <h1>Login Failed. Please check whether the information you input are correct.</h1>`
      }
    }
  })
  .post("/people/signup", async (ctx) => {
    const body = ctx.request.body()
    if (body.type === "form") {
      const pairs = await body.value
      console.log('pairs=', pairs)
      const params = {}
      for (const [key, value] of pairs) {
        params[key] = value
      }
      console.log('params=', params)
      let account = params['account']
      let password = params['password']
      console.log(`account=${account} password=${password}`)
      if (peoples.get(account)) {
        ctx.response.body = `
        <h1>Sign up failed</h1>
        <h2>Account has been used</h2>`
      } else {
        peoples.set(account, {account, password})
        ctx.response.type = 'text/html'
        ctx.response.body = `
        <h1>Sign up success</h1>
        <h2><a href="/public/login.html">Logging to the system</a></h2>`
      }
    }
  });
  

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log('start at : http://127.0.0.1:8000')

await app.listen({ port: 8000 });