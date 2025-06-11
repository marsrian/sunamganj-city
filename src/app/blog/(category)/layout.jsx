import React from "react";

const BlogLayout = ({children}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 m:px-0 mt-5 mb-8 grid grid-cols-1 md:grid-cols-6 gap-4 p-4">
      <div className="col-span-4">
        <div className="bg-white dark:bg-gray-800">
          {children}
        </div>
      </div>
      <div className="col-span-2">
        {/* <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Sidebar</h2>
          <p>Links to categories, recent posts, etc.</p>
        </div> */}
      </div>
    </div>
  );
};

export default BlogLayout;
