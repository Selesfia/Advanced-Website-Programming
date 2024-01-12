import{Application, Router, send} from "https://deno.land/x/oak/mod.ts";

const peoples = new Map()
    peoples.set('Jessline',{
        name: "Jessline",
        tel: "0937711339",
        account: "Jessline@gmail.com",
        password: "011002",
        gender: "female",
    });
    peoples.set('Joshua',{
        name: "Joshua",
        tel: "0971660435",
        account: "Joshua@gmail.com",
        password: "301295",
        gender: "male",
    });

const router = new Router();
router
    .get('/',(ctx) =>{
        ctx.response.redirect("http://127.0.0.1:8000/public/index.html")
    })

    .get('/people',(ctx) => {
        ctx.response.body = Array.from(peoples.values());
    })

    .post('/people/signup',async(ctx) => {
        const body = ctx.request.body()
        if (body.type === "form") {
          const pairs = await body.value
          console.log('pairs=', pairs)
          const params = {}
          for (const [key, value] of pairs) {
            params[key] = value
          }
          console.log('params=', params)
          let name = params['name']
          let account = params['account']
          let password = params['password']
          console.log(`account=${account} password=${password}`)
          if (peoples.get(account)) {
            ctx.response.type = 'text/html'
            ctx.response.body = `<p>error: ${account} Already Exist！</p><br/><a href="http://127.0.0.1:8000/public/signup.html">SignUp</a>`
          } 
          else {
            peoples.set(name, {name, account, password})
            ctx.response.type = 'text/html'
            ctx.response.body = `<p>${name}SignUp Success</p><a href="http://127.0.0.1:8000/public/login.html">Login</a>`
          }
      
        }
      })

    .post('/people/login', async(ctx) =>{
        const body = ctx.request.body()
        if (body.type === "form") {
          const pairs = await body.value
          console.log('pairs=', pairs)
          const params = {}
          for (const [key, value] of pairs) {
            params[key] = value
          }
          console.log('params=', params)
          let name = params['name']
          let password = params['password']
          console.log(`name=${name} password=${password}`)
          if (peoples.get(name) && password == peoples.get(name).password) {
            ctx.response.type = 'text/html'
            ctx.response.body = `<p>Login Success</p>`
          } 
          else {
            ctx.response.type = 'text/html'
            ctx.response.body = `<p>Login Failed</p><a href="http://127.0.0.1:8000/public/login.html">Login Again</a>`
          }
          console.log("key:",peoples.get(name).password)
        }
      })

    .get("/public/(.*)", async (ctx) => {
        let wpath = ctx.params[0]
        console.log('wpath=', wpath)
        await send(ctx, wpath, {
          root: Deno.cwd()+"/public/",
          index: "index.html",
        })
      })
      
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });