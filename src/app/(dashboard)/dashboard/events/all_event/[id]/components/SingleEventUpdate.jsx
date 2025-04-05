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

const SingleEventUpdate = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [description, setDescription] = useState(data?.description || "");
  const router = useRouter();
  const { data: session } = useSession();
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

  const handleEventUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (session?.user?.role !== "manager") {
      toast.error("You are not authorized to add event. Please contact admin.");
      setLoading(false);
      return;
    }

    const form = e.target;
    const event_title = form.event_title.value;
    const start_date = form.start_date.value;
    const end_date = form.end_date.value;
    const location = form.location.value;
    const event_status = form.event_status.value;
    const imageFile = form.image.files[0];

    let imageUrl = data?.image;
    if (imageFile) {
      imageUrl = await uploadImageToImgBB(imageFile);
      if (!imageUrl) {
        setLoading(false);
        return;
      }
    }

    const payload = {
      event_title: event_title || data.event_title,
      start_date: start_date || data.start_date,
      end_date: end_date || data.end_date,
      location: location || data.location,
      event_status: event_status || data.event_status,
      description: description || data.description,
      image: imageUrl,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/events/${data._id}`,
        {
          method: "PATCH",
          body: JSON.stringify(payload),
        }
      );
      const eventResponse = await res.json();
      toast.success("Event update successfully");
      form.reset();
      router.push("/dashboard/events/all_event");
    } catch (error) {
      toast.error("Failed to add services. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleEventUpdate} className="flex flex-col mt-5">
      <label
        htmlFor="event_title"
        className="text-[#444] dark:text-white font-semibold mt-6"
      >
        Event Title
      </label>
      <input
        defaultValue={data.event_title}
        type="text"
        name="event_title"
        placeholder="Event Title"
        className="text-[#A2A2A2] leading-7 border border-[#E8E8E8] rounded-[10px] py-4 px-6 mt-3"
      />
      <label
        htmlFor="start_date"
        className="text-[#444] dark:text-white font-semibold mt-6"
      >
        Start Date
      </label>
      <input
        defaultValue={data.start_date}
        type="text"
        name="start_date"
        className="text-[#A2A2A2] leading-7 border border-[#E8E8E8] rounded-[10px] py-4 px-6 mt-3"
      />
      <label
        htmlFor="end_date"
        className="text-[#444] dark:text-white font-semibold mt-6"
      >
        End Date
      </label>
      <input
        defaultValue={data.end_date}
        type="text"
        name="end_date"
        className="text-[#A2A2A2] leading-7 border border-[#E8E8E8] rounded-[10px] py-4 px-6 mt-3"
      />

      <label
        htmlFor="location"
        className="text-[#444] dark:text-white font-semibold mt-6"
      >
        Event Location
      </label>
      <input
        defaultValue={data.location}
        type="text"
        name="location"
        placeholder="News Location"
        className="text-[#A2A2A2] leading-7 border border-[#E8E8E8] rounded-[10px] py-4 px-6 mt-3"
      />

      <label
        htmlFor="event_status"
        className="text-[#444] dark:text-white font-semibold mt-6"
      >
        Event Status
      </label>
      <input
        defaultValue={data.event_status}
        type="text"
        name="event_status"
        placeholder="Event status"
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

      {/* image preview */}
      {data?.image && (
        <div className="mt-16">
          <p>Current Image:</p>
          <img
            src={data.image}
            alt="Service"
            className="w-32 h-32 object-cover"
          />
        </div>
      )}

      <label htmlFor="image" className="text-[#444] font-semibold">
        Event Image
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
        {loading || imageUploading ? "Updating..." : "Update"}
      </button>
    </form>
  );
};

export default SingleEventUpdate;
