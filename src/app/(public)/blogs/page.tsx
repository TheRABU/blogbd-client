/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogCard from "@/src/components/modules/Blogs/BlogCard";

const BlogPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
    cache: "no-store",
  });

  const responseData = await res.json();
  const blogs = responseData?.result?.data || [];

  return (
    <>
      <div className="py-30 px-4 max-w-7xl mx-auto">
        <h2 className="text-center text-4xl">All Blogs</h2>
        <div className="grid grid-cols-3 gap-4 mx-auto max-w-6xl my-5">
          {blogs.map((blog: any) => (
            <BlogCard key={blog.id} post={blog} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
