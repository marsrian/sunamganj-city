"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const SingleUserRoleUpdate = ({ data }) => {
  const [loading,setLoading] = useState();
  const router = useRouter();
  const handleUpdateUserRole = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const role = form.role.value;
    const updatePayload = {
      role,
    };
    console.log("update role:", updatePayload)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users/${data._id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatePayload),
        }
      );
      const updatedUser = await response.json();
      toast.success("Updated role");
      setLoading(false);
      router.push(`/dashboard/members`);
      console.log("updated user:", updatedUser);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleUpdateUserRole} className="flex flex-col mt-5">
      <label htmlFor="Name" className="text-[#444] font-semibold mt-6">
        Name
      </label>
      <input
        defaultValue={data.name}
        readOnly
        type="text"
        name="name"
        className="text-[#A2A2A2] leading-7 border border-[#E8E8E8] rounded-[10px] py-3 px-6 mt-3"
      />
      <label htmlFor="Email" className="text-[#444] font-semibold mt-4">
        Email
      </label>
      <input
        defaultValue={data.email}
        readOnly
        type="email"
        name="email"
        className="text-[#A2A2A2] leading-7 border border-[#E8E8E8] rounded-[10px] py-3 px-6 mt-3"
      />
      <label htmlFor="Role" className="text-[#444] font-semibold mt-4">
        Role
      </label>
      <input
        defaultValue={data.role}
        type="text"
        name="role"
        placeholder="Role"
        className="text-[#A2A2A2] leading-7 border border-[#E8E8E8] rounded-[10px] py-3 px-6 mt-3"
      />
      <input
        type="submit"
        value={loading ? "Updating..." : "Update"}
        
        className={`text-white text-lg font-semibold leading-7 rounded-[10px] py-4 mt-7 ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#FF3811]"
        }`}
      />
    </form>
  );
};

export default SingleUserRoleUpdate;
