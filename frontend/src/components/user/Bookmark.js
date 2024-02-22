import React, { useState, useEffect } from "react";
import axios from "axios";
import isAuthenticated from "../../utils/AuthAPI";

export default function Bookmark() {
  // ดึงข้อมูลผู้ใช้
  const userData = localStorage.getItem("token");
  const decodedPayload = JSON.parse(atob(userData.split(".")[1]));
  const profile = decodedPayload.result || decodedPayload;
  const [user, setUser] = useState({
    id: profile._id
  });
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmark = async () => {
      const res = await axios.get(`http://localhost:5000/api/bookmark/self/${user.id}`)
      console.log('res', res.data.bookmarks);
      setBookmarks(res.data.bookmarks);
    }

    fetchBookmark();
  }, []);

  const handleDelete = async (bookmarkId) => {
    console.log(bookmarkId);
    await axios.delete(`http://localhost:5000/api/bookmark/delete`, bookmarkId);
    window.location.reload();
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Your Bookmarks
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            List of all your bookmarks
          </p>
        </div>

        <div className="mt-12 space-y-16 sm:mt-16">
          {bookmarks.map((bookmark) => (
            <section key={bookmark._id}>
              <div className="space-y-1 md:flex md:items-baseline md:space-x-4 md:space-y-0">
                <h2 className="text-lg font-medium text-gray-900 md:flex-shrink-0">
                  #{bookmark._id}
                </h2>
                <div className="space-y-5 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 md:min-w-0 md:flex-1">
                  <p className="text-sm font-medium text-gray-500">
                    {/* {order.status} */}
                  </p>
                </div>
              </div>

              <div className="-mb-6 mt-6 flow-root divide-y divide-gray-200 border-t border-gray-200">
                <div className="py-6 sm:flex">
                  <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                    <img
                      src={bookmark.blogId.img}
                      className="h-20 w-20 flex-none rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                    <div className="min-w-0 flex-1 pt-1.5 sm:pt-0">
                      <h3 className="text-sm font-medium text-gray-900">
                        <div>{bookmark.blogId.title}</div>
                      </h3>
                      <p className="truncate text-sm text-gray-500">
                        <span>Author: {bookmark.blogId.author}</span>
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{bookmark.blogId.content}</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4 sm:ml-6 sm:mt-0 sm:w-40 sm:flex-none">
                    <a href={`http://localhost:3000/blogs/${bookmark.blogId._id}`}
                      type="button"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:flex-grow-0"
                    >
                      View Blog
                    </a>
                    <button onClick={() => handleDelete(bookmark._id)}
                      type="button"
                      className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:flex-grow-0"
                    >
                      Delete Bookmark
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
