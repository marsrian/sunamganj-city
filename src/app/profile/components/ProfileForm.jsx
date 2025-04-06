"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ProfileForm = ({ userData }) => {
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const { data: session, update } = useSession();
  const router = useRouter();

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

  const handleUserForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!session) {
      toast.error("You are not authorized update profile.");
      setLoading(false);
      return;
    }

    const form = e.target;
    const name = form.name.value;
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
      name: name || userData.name,
      email: userData.email,
      ...(imageUrl && { image: imageUrl }),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users/me/${userData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const serviceResponse = await res.json();
      toast.success("Profile update successfully");
      
      await update({
        name: payload.name,
        image: payload.image,
      });
      form.reset();
      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleUserForm} className="flex flex-col">
      <label
        htmlFor="name"
        className="text-[#444] dark:text-white font-semibold mt-6"
      >
        Profile Name
      </label>
      <input
        defaultValue={userData?.name}
        type="text"
        name="name"
        placeholder="Profile Name"
        className="text-[#A2A2A2] leading-7 border border-[#E8E8E8] rounded-[10px] py-4 px-6 mt-1"
      />
      <label
        htmlFor="email"
        className="text-[#444] dark:text-white font-semibold mt-4"
      >
        Email <span className="text-gray-500">(Read only)</span>
      </label>
      <input
        defaultValue={userData?.email}
        readOnly
        type="email"
        placeholder="Email"
        className="text-[#A2A2A2] leading-7 border border-[#E8E8E8] rounded-[10px] py-4 px-6 mt-1"
      />
      <label
        htmlFor="image"
        className="text-[#444] dark:text-white font-semibold mt-4"
      >
        Profile Image
      </label>
      <input
        type="file"
        name="image"
        accept="image/*"
        className="text-[#A2A2A2] leading-7 border border-[#E8E8E8] rounded-[10px] py-4 px-6 mt-1"
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

export default ProfileForm;
