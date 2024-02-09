import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios';
import isAuthorized from '../../utils/Adminisauthorized';
import { Dialog, Transition } from '@headlessui/react'

export default function Manageblog() {
  useEffect(() => {
    isAuthorized()
  }, []);

  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState([]);
  //create form state
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    author: '',
    img: null,
  });

  const handleDeleteClick = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/delete/${id}`)
      // console.log(res);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  const handleViewClick = (blog) => {
    setSelectedBlog(blog);
    setViewModal(true);
  }

  const handlefileChange = (e) => {
    setBlogData({ ...blogData, img: e.target.files[0] })
  }

  const createBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', blogData.title)
    formData.append('content', blogData.content)
    formData.append('author', blogData.author)
    formData.append('img', blogData.img)
    // console.log(blogData);
    try {
      const res = await axios.post(`http://localhost:5000/api/createblog`, formData)
      console.log(res);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // get data
    axios.get('http://localhost:5000/api/blogs')
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error('Error get blogs', err))
    // console.log(blogs);
  }, []);

  return (
    <main className="pt-0 pl-72">
      <div>
        {/* Table */}
        <div className="bg-gray-200">

          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto mt-10">
                <h1 className="text-base font-semibold leading-6 text-dark mb-3">Manage blogs</h1>
              </div>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="block rounded-md bg-indigo-500 px-3 py-2 mt-20 text-center text-sm font-semibold text-dark hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Add blog
              </button>

            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-dark sm:pl-0">
                          Title
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-dark">
                          Image
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-dark">
                          Author
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-dark">
                          {/* Content */}
                          create_at
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-dark">
                          update_at
                        </th>
                        <th scope="col" className="relative w-6/6 py-3.5 pl-3 pr-4 sm:pr-0">
                          <span className="sr-only">Edit</span>
                        </th>
                        <th scope="col" className="relative w-6/6 py-3.5 pl-3 pr-4 sm:pr-0">
                          <span className="sr-only">Edit</span>
                        </th>
                        <th scope="col" className="relative w-6/6 py-3.5 pl-3 pr-4 sm:pr-0">
                          <span className="sr-only">delete</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                      {blogs.map((blog) => (
                        // console.log(blog.create_at)
                        <tr key={blog._id}>
                          <td className="darkspace-nowrap py-4 pl-4 pr-3 text-sm text-dark sm:pl-0">
                            {blog.title}
                          </td>
                          <td className="darkspace-nowrap px-3 py-4 text-sm text-dark-900">
                            <img src={blog.img} alt={blog.title} style={{ maxWidth: '100px' }} />
                          </td>
                          <td
                            className="darkspace-nowrap px-3 py-4 text-sm text-dark-900">{blog.author}</td>
                          {/* <td className="darkspace-nowrap px-3 py-4 text-sm text-dark-900">{blog.content}</td> */}
                          <td className="darkspace-nowrap px-3 py-4 text-sm text-dark-900">{new Date(blog.create_at).toUTCString()}</td>
                          <td className="darkspace-nowrap px-3 py-4 text-sm text-dark-900">{new Date(blog.update_at).toUTCString()}</td>
                          <td className="relative darkspace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <button
                              type="button"
                              onClick={() => handleViewClick(blog)}
                              className="text-indigo-400 hover:text-indigo-600"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              </svg>

                            </button>
                          </td>
                          <td className="relative darkspace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            {/* <button
                              type="button"
                              // onClick={() => handleEditClick(blog)}
                              className="text-indigo-400 hover:text-indigo-600"
                            >
                              Edit
                            </button> */}
                          </td>
                          <td className="relative darkspace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <button
                              type="button"
                              onClick={() => handleDeleteClick(blog._id)}
                              className="text-red-400 hover:text-red-600"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Table */}

        {/* modal เพิ่มบล็อค */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                      <form className="space-y-6" onSubmit={createBlog} encType='multipart/form-data' >
                        <div>
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Title
                          </label>
                          <div className="mt-2">
                            <input
                              id="title"
                              name="title"
                              type="text"
                              autoComplete="title"
                              required
                              onChange={(e) => setBlogData((prev) => ({ ...prev, title: e.target.value }))}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="content"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Content
                            </label>
                          </div>
                          <div className="mt-2">
                            <input
                              id="content"
                              name="content"
                              type="text"
                              required
                              onChange={(e) => setBlogData((prev) => ({ ...prev, content: e.target.value }))}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="author"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Author
                            </label>
                          </div>
                          <div className="mt-2">
                            <input
                              id="author"
                              name="author"
                              type="text"
                              required
                              onChange={(e) => setBlogData((prev) => ({ ...prev, author: e.target.value }))}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="file" className="block text-sm font-medium leading-6 text-gray-900">
                            Upload File
                          </label>
                          <div className="mt-2">
                            <input
                              id="img"
                              name="img"
                              type="file"
                              onChange={handlefileChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            เพิ่มบล็อก
                          </button>
                        </div>

                      </form>

                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        {/*จบ modal เพิ่มบล็อค */}

        {/* modal ดูรายระเอียด */}
        <Transition.Root show={viewModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setViewModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full w-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative  bg-gradient-to-r bg-dark transform overflow-hidden rounded-lg  bg-white dark:bg-slate-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">

                    <div className=" text-center text-white">
                      <h1 className=' text-4xl mb-2'>รายละเอียดบทความ</h1>
                      <h1 className='text-xl mb-2 '>Author: {selectedBlog.author}</h1>
                      {/* <img class="h-auto mb-3 max-w-full rounded-lg" src="https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop" alt="image description"></img>

                      <div class="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"></path></svg>
                        <span><h1 class="text-black dark:text-white">{selectedUser.email}</h1></span>
                      </div>
                      <div class="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <span><h1 class="text-black dark:text-white">ชื่อ: {selectedUser.fname}  นามสกุล: {selectedUser.lname} </h1></span>
                      </div>
                      <div class="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <span><h1 class="text-black dark:text-white">Role : {selectedUser.role}</h1></span>
                      </div>
                      <div class="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>

                        <span><h1 class="text-black dark:text-white">Tel. : {selectedUser.tel}</h1></span>
                      </div> */}


                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        {/* ดู modal ดูรายระเอียด */}


      </div>
    </main>
  )
}
