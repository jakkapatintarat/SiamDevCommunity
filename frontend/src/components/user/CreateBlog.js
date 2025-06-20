import React, { useEffect, useState } from "react";
import axios from "axios";
import { BLOG } from '../../constants/api';
import Swal from 'sweetalert2'


export default function CreateBlog() {
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    author: "",
    tags: "",
    img: null,
  });



  const userData = localStorage.getItem("token");
  const decodedPayload = JSON.parse(atob(userData.split(".")[1]));
  const profile = decodedPayload.result || decodedPayload;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'img') {
      setBlogData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setBlogData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }

  const createBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', blogData.title)
    formData.append('content', blogData.content)
    formData.append('author', profile.username)
    if (blogData.img) {
      formData.append('img', blogData.img)
    }
    try {
      const res = await axios.post(BLOG.CREATE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      Swal.fire({
        icon: 'success',
        title: 'สร้างสำเร็จ',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload();
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการสร้าง blog:", error);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาดในการสร้าง blog',
        text: error.message || '',
      })
    }
  }

  return (
    <>
      <div className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
        <div className="flex flex-shrink-0 items-center text-center justify-end m-2">
          <a
            href="/blogs"
            className="rounded-md bg-indigo-600  w-auto px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
          >
            ย้อนกลับ
          </a>
        </div>
        <form
          className="space-y-6"
          onSubmit={createBlog}
          encType="multipart/form-data"
        >
          <div>
            <label className="text-white dark:text-gray-200" htmlFor="username">
              หัวข้อ
            </label>
            <input
              type="text"
              name="title"
              value={blogData.title}
              required
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label
              className="text-white dark:text-gray-200"
              htmlFor="passwordConfirmation"
            >
              รายละเอียด
            </label>
            <textarea
              name="content"
              value={blogData.content}
              required
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-white"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span className="">Upload a file</span>
                    <input
                      id="file-upload"
                      type="file"
                      name="img"
                      accept=".png, .jpg, .jpeg"
                      required
                      onChange={handleChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1 text-white">or drag and drop</p>
                </div>
                <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
                {blogData.img && (
                  <img  className=" w-96" src={URL.createObjectURL(blogData.img)} alt="Selected Image" />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-shrink-0 items-center text-center justify-start mt-3">
            <button
              type="submit"
              className="rounded-md bg-indigo-600  w-full px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
            >
              สร้างบทความ
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
