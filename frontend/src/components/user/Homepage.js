import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ADMIN_BLOG } from '../../constants/api';

export default function Homepage() {
  const [blogs, setBlogs] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(ADMIN_BLOG.GET_ALL);
        console.log(response.data.blogs);
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Admin Blogs</h2>
     
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {blogs.map((blog) => (
            <div key={blog._id} className="group relative">
              <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                <img
                  src={blog.img}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-900">
              <a href={`blogsadmin/${blog._id}`}>
                  <span className="absolute inset-0" />
                  {blog.title}
                </a>
              </h3>
              {/* <p className="mt-1 text-sm text-gray-500">{blog.content}</p> */}
              <p className="mb-3 text-sm font-medium text-gray-700">Author: {blog.author}</p>
            </div>
          ))}
        </div>

    
      </div>
    </div>
  )
}
