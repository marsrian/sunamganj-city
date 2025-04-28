"use client";

import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function CommentsList({ comments }) {
  const { data: session } = useSession();
  console.log("Session from blog: ", session);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleDelete = async (commentId) => {
    // Show confirmation toast
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-96 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5 p-4`}
      >
        <div className="">
              <p className="text-sm text-center font-medium text-gray-900 dark:text-white">
                Are you sure you want to delete this comment?
              </p>
        </div>
        <div className="flex gap-4 justify-center mt-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const toastId = toast.loading('Deleting comment...');
              try {
                const res = await fetch(`/api/comments/${commentId}`, {
                  method: "DELETE",
                });
            
                if (!res.ok) throw new Error("Failed to delete comment");
            
                toast.success('Comment deleted successfully!', { id: toastId });
                window.location.reload();
              } catch (error) {
                console.error("Delete error:", error);
                toast.error(error.message || "Failed to delete comment", { id: toastId });
              } finally {
                setIsDeleting(false);
              }
            }}
            className="px-4 py-1 bg-red-500 rounded-md text-white hover:bg-red-600"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-1 bg-green-500 rounded-md text-white hover:bg-green-600"
          >
            No
          </button>
        </div>
      </div>
    ), {
      duration: Infinity, // The toast won't auto-dismiss
    });
  };

  const handleUpdate = async (commentId) => {
    if (!editedContent.trim()) return;
    
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editedContent }),
      });

      if (!res.ok) throw new Error("Failed to update comment");

      setEditingCommentId(null);
      window.location.reload();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update comment");
    } finally {
      setIsUpdating(false);
    }
  };

  const startEditing = (comment) => {
    setEditingCommentId(comment._id);
    setEditedContent(comment.content);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditedContent("");
  };

  if (comments.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>;
  }

  return (
    <div className="space-y-6 mt-6">
      {comments.map((comment) => (
        <div key={comment._id} className="flex gap-4 group">
          <div className="flex-shrink-0">
            <Image
              src={comment?.userImage || "/default-avatar.png"}
              width={40}
              height={40}
              alt={comment.userName}
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {comment.userName}
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(comment.createdAt)}
                {comment.updatedAt > comment.createdAt && " (edited)"}
              </span>
            </div>

            {editingCommentId === comment._id ? (
              <div className="mt-2 space-y-2">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                  rows="3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(comment._id)}
                    disabled={isUpdating}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:cursor-pointer hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isUpdating ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="px-3 py-1 text-sm bg-gray-200 hover:cursor-pointer dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  {comment.content}
                </p>
                {session?.user?.email === comment.userEmail && (
                  <div className="mt-2 flex gap-2 ">
                    <button
                      onClick={() => startEditing(comment)}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline hover:cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(comment._id)}
                      disabled={isDeleting}
                      className="text-xs text-red-600 dark:text-red-400 hover:underline disabled:opacity-50 hover:cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}