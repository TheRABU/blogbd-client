"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getUserSession } from "../helpers/getUserSession";

export const create = async (data: FormData) => {
  const blogInfo = Object.fromEntries(data.entries());

  const session = await getUserSession();

  const modifiedData = {
    ...blogInfo,
    tags: blogInfo.tags
      .toString()
      .split(",")
      .map((tag) => tag.trim()),
    authorId: session?.user?.id,
    isFeatured: Boolean(blogInfo.isFeatured),
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modifiedData),
  });

  const result = await res.json();
  console.log("result of create blog post req", result);

  if (result?.post?.id) {
    revalidateTag("BLOGS", "max");
    revalidatePath("/blogs");
    redirect("/");
  }
  return result;
};
