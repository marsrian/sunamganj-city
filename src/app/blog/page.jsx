import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const getBlogData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/blogs`, {
    headers: new Headers(await headers()),
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
};

const BlogPage = async () => {
  const blogs = await getBlogData();
  return (
    <div className="mt-6 mb-6 md:mb-8">
      <h1 className="text-2xl font-bold text-center underline decoration-double underline-offset-8 ">
        All Blog
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-7xl mx-auto px-2 md:px-0">
        {blogs
          .filter((blog) => blog.approval === "approved")
          .map((blog) => (
            <div
              key={blog._id}
              className="flex flex-col rounded-lg shadow-md p-4 border bg-white hover:shadow-lg transition-shadow duration-300"
            >
              {blog?.image && (
                <div className="mb-4 relative h-48 w-full">
                  <Image
                    src={blog.image}
                    alt={blog.blog_title}
                    fill
                    className="rounded-lg object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}

              <div className="mb-2">
                <h3 className="text-xl font-semibold dark:text-black my-2">
                  {blog.blog_title}
                </h3>
                <Link
                  href={`/blog/${blog._id}`}
                  className="text-lg text-red-800 font-bold underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlogPage;
