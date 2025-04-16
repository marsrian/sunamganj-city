import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { childVariants, parentVariants } from "@/components/common/Variants";

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

export const metadata = {
  title: "Blog",
  description:
    "Explore Sunamganj: Culture, festivals, nature, and community updates. Get the latest from this beautiful corner of Sylhet.",
};

const BlogPage = async () => {
  const blogs = await getBlogData();
  return (
    <div className="mt-6 mb-6 md:mb-8">
      <motion.h1
        initial={{ x: 60 }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-2xl font-bold text-center underline decoration-double underline-offset-8 "
      >
        All Blog
      </motion.h1>
      <motion.div
        variants={parentVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-7xl mx-auto px-2 md:px-0"
      >
        {blogs
          .filter((blog) => blog.approval === "approved")
          .map((blog) => (
            <motion.div
              variants={childVariants}
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
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default BlogPage;
