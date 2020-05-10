import { Application } from "https://deno.land/x/abc@v0.2.9/mod.ts";

import {fetchAllBlogs, createBlog} from "./controller/blog.controller.ts";

const app = new Application();

app
.get('/blogs', fetchAllBlogs)
.post('/blogs', createBlog)
.start({port:5000});

console.log(`server listening on http://localhost:5000`);