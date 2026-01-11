import { NextResponse } from "next/server";
import { blogs } from "./data";

export async function GET() {
  return Response.json(blogs);
}

export const POST = async (request: Request) => {
  const blog = await request.json();
  const newBlog = {
    ...blog,
    id: blogs.length + 1,
  };
  blogs.push(newBlog);

  return new NextResponse(JSON.stringify(newBlog), {
    status: 201,
    headers: {
      "Content-type": "application/json",
    },
  });
};
