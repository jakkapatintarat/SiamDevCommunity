import axios from 'axios';
import { useState } from 'react'
import { ADMIN_BLOG } from '../../../constants/api';

export default function Example() {
  const [adminBlogs, setAdminBlogs] = useState([]);
  useState(() => {
    const getAdminBlogs = async () => {
      const fetchAdminBlogs = await axios.get(ADMIN_BLOG.GET_ALL);
      if (fetchAdminBlogs.data.blogs.length > 0) {
        setAdminBlogs(fetchAdminBlogs.data.blogs);
      }
    }
  
    getAdminBlogs();
  })
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {console.log(adminBlogs)}
      {adminBlogs.map((blog) => (
        <li
          key={blog._id}
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap"
        >
          <div>
            <p className="text-sm font-semibold leading-6 text-gray-900">
              <a href={`/blogsadmin/${blog._id}`} className="hover:underline" target='_blank'>
                Title: {blog.title}
              </a>
            </p>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p>
                  Author: {blog.author}
              </p>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <p>
              {new Date(blog.create_at).toUTCString()}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
