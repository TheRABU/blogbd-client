import BlogCard from "@/src/components/modules/Blogs/BlogCard";
import Hero from "@/src/components/modules/Home/Hero";

const HomePage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
    next: {
      tags: ["BLOGS"],
    },
  });

  const responseData = await res.json();
  const blogs = responseData?.result?.data || [];

  return (
    <div>
      <Hero />
      <h2 className="text-center my-5 text-4xl">Featured Posts</h2>
      <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto my-5">
        {blogs.slice(0, 3).map((blog: any) => (
          <BlogCard key={blog?.id} post={blog} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
