/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogDetailsCard from "@/src/components/modules/Blogs/BlogDetailsCard";
import { getBlogById } from "@/src/services/PostServices";

export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`);
  const responseData = await res.json();
  const blogs = responseData?.result?.data || [];

  return blogs.slice(0, 2).map((blog: any) => ({
    blogId: String(blog.post?.id),
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;
  const blog = await getBlogById(blogId);

  return {
    title: blog?.post?.title,
    description: blog?.post?.content,
  };
};

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;
  const blog = await getBlogById(blogId);

  console.log("blog details console", blog);

  return (
    <>
      <div className="py-30 px-4 max-w-7xl mx-auto">
        <BlogDetailsCard blog={blog.post} />
      </div>
    </>
  );
};

export default BlogDetailsPage;
