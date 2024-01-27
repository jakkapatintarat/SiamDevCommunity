import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Manageblog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // get data
    axios.get('http://localhost:5000/api/blogs')
    .then((res) => setBlogs(res.data))
    .catch((err) => console.error('Error get blogs', err))
  }, []);


  return (
    <main className="pt-0 pl-72 ">
      <div>
        {/* Table */}
        <div className="bg-gray-200 py-10">
          <h2 className="px-4 text-base font-semibold leading-7 text-dark sm:px-6 lg:px-8">Manageblog</h2>
          <table className="mt-6 w-full darkspace-nowrap text-left">
            <colgroup>
              <col className="w-full sm:w-4/12" />
              <col className="lg:w-4/12" />
              <col className="lg:w-2/12" />
              <col className="lg:w-1/12" />
              <col className="lg:w-1/12" />
            </colgroup>
            <thead className="border-b border-dark/10 text-sm leading-6 text-dark">
              <tr>
                <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
                  title
                </th>
                <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
                  content
                </th>
                <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
                  image
                </th>
                <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
                  author
                </th>
                <th scope="col" className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8">
                  title
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark/5">
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                    <div className="flex items-center gap-x-4">
                      <img src={blog.title} alt="" className="h-8 w-8 rounded-full bg-gray-800" />
                      <div className="truncate text-sm font-medium leading-6 text-dark">{blog.title}</div>
                    </div>
                  </td>
                  <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                    <div className="flex gap-x-3">
                      <div className="font-mono text-sm leading-6 text-gray-400">{blog.title}</div>
                      <div className="rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-dark/10">
                        {blog.title}
                      </div> 
                    </div>
                  </td>
                  <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                    <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                      <time className="text-gray-400 sm:hidden" dateTime={blog.title}>
                        {blog.title}
                      </time>
                      <div className='flex-none rounded-full p-1'>
                        <div className="h-1.5 w-1.5 rounded-full bg-current" />
                      </div>
                      <div className="hidden text-dark sm:block">{blog.title}</div>
                    </div>
                  </td>
                  <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                    {blog.title}
                  </td>
                  <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                    <time dateTime={blog.title}>{blog.title}</time>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* End Table */}


      </div>
    </main>
  )
}
