"use client";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(
  () => import("react-quill-new").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
  }
);

const BlogForm = () => {
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [description, setDescription] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  console.log(user);

  const reactQuillRef = useRef(null);

  const uploadImageToImgBB = async (imageFile, isServiceImage = true) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      if (isServiceImage) setImageUploading(true);
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
      return null;
    } finally {
      if (isServiceImage) setImageUploading(false);
    }
  };

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file && reactQuillRef.current) {
        const url = await uploadImageToImgBB(file, false);
        if (url) {
          const quill = reactQuillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range?.index || 0, "image", url);
        }
      }
    };
  };

  // Updated Quill configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "link",
    "image",
    "color",
    "background",
  ];

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (session?.user?.role !== "writer") {
      toast.error(
        "You are not authorized to add blog. Please contact admin."
      );
      setLoading(false);
      return;
    }

    const form = e.target;
    const blog_title = form.blog_title.value;
    const imageFile = form.image.files[0];

    let imageUrl = "";
    if (imageFile) {
      imageUrl = await uploadImageToImgBB(imageFile);
      if (!imageUrl) {
        setLoading(false);
        return;
      }
    }

    const payload = {
      blog_title,
      description,
      image: imageUrl,
      writer_name: user.name,
      writer_email: user.email,
      writer_image: user.image,
      approval: "pending",
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/blogs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const serviceResponse = await res.json();
      toast.success("Blog added successfully");
      form.reset();
      router.push("/dashboard/blogs/all_blog");
    } catch (error) {
      toast.error("Failed to add services. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleBlogSubmit} className="flex flex-col mt-5">
      <label
        htmlFor="blog_title"
        className="text-[#444] dark:text-white font-semibold mt-6"
      >
        Blog Title
      </label>
      <input
        type="text"
        name="blog_title"
        placeholder="Blog Title"
        className="text-[#A2A2A2] leading-7 border border-[#E8E8E8] rounded-[10px] py-4 px-6 mt-3"
      />
      <label className="text-[#444] dark:text-white font-semibold mt-6">
        Description
      </label>
      <ReactQuill
        ref={reactQuillRef}
        theme="snow"
        value={description}
        onChange={setDescription}
        modules={modules}
        formats={formats}
        className="mt-3"
        style={{ height: "300px" }}
      />
      <label
        htmlFor="image"
        className="text-[#444] dark:text-white font-semibold mt-16"
      >
        Service Image
      </label>
      <input
        type="file"
        name="image"
        accept="image/*"
        className="text-[#A2A2A2] leading-7 border border-[#E8E8E8] rounded-[10px] py-4 px-6 mt-3"
      />
      <button
        type="submit"
        disabled={loading || imageUploading}
        className={`text-white text-lg font-semibold leading-7 rounded-[10px] py-4 mt-7 ${
          loading || imageUploading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-[#FF3811]"
        }`}
      >
        {loading || imageUploading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default BlogForm;
