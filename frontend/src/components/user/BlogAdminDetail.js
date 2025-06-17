import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ADMIN_BLOG } from "../../constants/api";

export default function BlogAdminDetail() {
  const [blog, setBlog] = useState({});
  const { blogId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${ADMIN_BLOG.GET_BY_ID(blogId)}`
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="bg-slate-700 min-h-screen flex justify-center ">
      <div className="bg-slate-600 w-full mx-20 p-8 ">
        <h1 className="text-center text-gray-50 text-3xl">Title : {blog.title}</h1>
        <h1 className="text-center text-gray-50 text-xl text-bg-dark">By : {blog.author} (Admin)</h1>

        <div className="p-4 rounded-md flex justify-center items-center">
          <div><img src={blog.img} className=" h-auto max-w-full rounded-lg"/></div>
        </div>

        <div className="bg-white px-5 py-2 mb-4 rounded-md ">
          {blog.content}
        </div>
      </div>
    </div>
  );
}
