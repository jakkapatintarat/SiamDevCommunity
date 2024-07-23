import React, { useEffect, useState } from "react";
import axios from "axios";


export default function CreateBlog() {
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    author: "",
    img: null,
  });



  const userData = localStorage.getItem("token");
  const decodedPayload = JSON.parse(atob(userData.split(".")[1]));
  const profile = decodedPayload.result || decodedPayload;
  console.log(profile);

  const handleFileChange = (e) => {
    setBlogData({ ...blogData, img: e.target.files[0] })
  }

  const createBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', blogData.title)
    formData.append('content', blogData.content)
    formData.append('author', profile.username)
    formData.append('img', blogData.img)
    try {
      const res = await axios.post(`http://localhost:5000/api/createblog`, formData)
      console.log(res);
      alert("สร้างสำเร็จ")
      window.location.reload();
    } catch (error) {
      console.error(error);
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
          enctype="multipart/form-data"
        >
          <div>
            <label className="text-white dark:text-gray-200" htmlFor="username">
              หัวข้อ
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              autoComplete="title"
              onChange={(e) => {
                console.log('New title:', e.target.value);
                setBlogData((prev) => ({ ...prev, title: e.target.value }))
              }}
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
              id="content"
              type="textarea"
              required
              onChange={(e) => {
                console.log('New content:', e.target.value);
                setBlogData((prev) => ({ ...prev, content: e.target.value }))
              }}
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
                      name="file-upload"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      required
                      onChange={handleFileChange}
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
