"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ApprovalForm = ({ blogDetails }) => {
  const [approval, setApproval] = useState(blogDetails?.approval);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/blogs/approval/${blogDetails._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ approval }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessage("Status updated successfully!");
        router.push("/dashboard/blogs/approval_blog");
      } else {
        setMessage("Update failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <select
        value={approval}
        onChange={(e) => setApproval(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="pending" className="dark:text-black">Pending</option>
        <option value="approved" className="dark:text-black">Approved</option>
        <option value="rejected" className="dark:text-black">Rejected</option>
      </select>
      <button
        type="submit"
        className="ml-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Update Status
      </button>
      {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
    </form>
  );
};

export default ApprovalForm;