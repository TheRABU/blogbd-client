/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMyPosts } from "@/src/actions/getPosts";
import Image from "next/image";

export const dynamic = "force-dynamic";

const MyBlogsPage = async () => {
  let posts = [];
  let error = null;

  try {
    const response = await getMyPosts();
    posts = response?.data?.posts || [];
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    error = "Failed to load your posts. Please try again later.";
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            My Blog Posts
          </h1>
          <p className="text-gray-600">
            {posts.length > 0
              ? `You have ${posts.length} ${
                  posts.length === 1 ? "post" : "posts"
                }`
              : "Start creating your first post"}
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Thumbnail */}
                <div className="relative h-48 w-full bg-gray-200">
                  {post.thumbnail ? (
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                      <span className="text-gray-400 text-sm">No image</span>
                    </div>
                  )}

                  {/* Featured Badge */}
                  {post.isFeatured && (
                    <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.content}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags
                        .slice(0, 3)
                        .map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      {post.tags.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{post.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Footer Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        {post.views || 0}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 font-medium">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          // Empty State
          !error && (
            <div className="text-center py-16 bg-white rounded-lg shadow">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No posts yet
              </h3>
              <p className="text-gray-600 mb-6">
                Get started by creating your first blog post
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Create Post
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyBlogsPage;
