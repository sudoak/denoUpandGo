import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import  createBlog from "./controller/blog.controller.ts";

const router = new Router();

const checkFunc = (ctx: any) => {
    ctx.response.body = "Hello world lol!";
}
router
  .get("/",checkFunc)
//   .get("/blogs", fetchAllBlogs)
  .post("/blogs", createBlog);

  const app = new Application();
  app.use(router.routes());
//   app.use(router.allowedMethods());
  
  await app.listen({ port: 8000 });

  console.log("server running")