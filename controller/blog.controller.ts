// @ts-ignore
import { Request, Response } from "https://deno.land/x/oak/mod.ts";
import db  from '../config/db.config.ts';

const blogs = db.collection('blogs');

interface Employee {
  _id: {
    $oid: String;
  };
  title: String,
  desc: String,
}

export default  async (
    { request,
    response
    } : {
    request: Request;
    response: Response;
  }) => {
    try {
        if (request.hasBody) {
            response.status = 400;
            response.body = {error: "No Body"}
            return;
         }
         const {value : {title, desc}} = await request.body();
        //  const { title, desc } = body;
        
    const insertedBlog = await blogs.insertOne({
        title,
        desc
    });
    response.body = insertedBlog;
    return;
    } catch (error) {
        response.status = 500
        response.body = error;
        return;
    }
}

// export const fetchAllBlogs = async ( { request,
//     response
//     } : {
//     request: Request;
//     response: Response;
//   }) => {
//     try {
//         const fetchedBlogs: Employee[] = await blogs.find();

//     if (fetchedBlogs) {
//       const list = fetchedBlogs.length ? fetchedBlogs.map(blog => {
//         const { _id: { $oid }, title, desc } = blog;
//         return { id: $oid, title, desc };
//       })
//         :
//         [];
//       response.body = list;
//       return
//     }
//     } catch (error) {
//         response.status = 500
//         response.body = error;
//         return;
//     }
// } 