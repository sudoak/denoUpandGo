// @ts-ignore
import { HandlerFunc, Context } from "https://deno.land/x/abc@v0.2.9/mod.ts";
import db from '../config/db.config.ts';

const database = db.getDatabase;
const blogs = database.collection('blogs');

interface Employee {
  _id: {
    $oid: string;
  };
  title: String,
  desc: String,
}

export const createBlog: HandlerFunc = async (c: Context) => {
    try {
        const body = await (c.body());
        if (!Object.keys(body).length) {
            return c.string("Request body can not be empty!", 400);
         }
         const { title, desc } = body;
        
    const insertedBlog = await blogs.insertOne({
        title,
        desc
    });
    return c.json(insertedBlog, 201);
    } catch (error) {
        return c.json(error, 500);
    }
}

export const fetchAllBlogs: HandlerFunc = async (c: Context) => {
    try {
        const fetchedBlogs: Employee[] = await blogs.find();

    if (fetchedBlogs) {
      const list = fetchedBlogs.length ? fetchedBlogs.map(blog => {
        const { _id: { $oid }, title, desc } = blog;
        return { id: $oid, title, desc };
      })
        :
        [];
      return c.json(list, 200);
    }
    } catch (error) {
        return c.json(error, 500);
    }
} 