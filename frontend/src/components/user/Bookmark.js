import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Bookmark() {
  const [bookmarks, setBookMarks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/bookmark");
        console.log(response.data);
        setBookMarks(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-slate-700 min-h-screen flex  flex-wrap justify-center ">
      <div className="bg-slate-600  w-full mx-20  p-8 ">
        <h1 className="text-center  text-gray-50 text-xl text-bg-dark">
          BOOK MARK
        </h1>
        {bookmarks.map((bookmark) => (

        <div className="mx-auto  max-w-2xl px-4 py-16 sm:px-6 sm:py-2 lg:max-w-7xl">
          <div className="relative overflow-hidden rounded-lg lg:h-96">
            <div className="absolute inset-0">
              <img
                src="https://tailwindui.com/img/ecommerce-images/category-page-01-featured-collection.jpg"
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div
              aria-hidden="true"
              className="relative h-96 w-full lg:hidden"
            />
            <div
              aria-hidden="true"
              className="relative h-32 w-full lg:hidden"
            />
            <div className="absolute inset-x-0 bottom-0 rounded-bl-lg rounded-br-lg bg-black bg-opacity-75 p-6 backdrop-blur backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-x-auto lg:inset-y-0 lg:w-96 lg:flex-col lg:items-start lg:rounded-br-none lg:rounded-tl-lg">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Workspace Collection
                </h2>
                <p className="mt-1 text-sm text-gray-300">
                  Upgrade your desk with objects that keep you organized and
                  clear-minded.
                </p>
              </div>
              <a
                href="#"
                className="mt-6 flex flex-shrink-0 items-center justify-center rounded-md border border-white border-opacity-25 bg-white bg-opacity-0 px-4 py-3 text-base font-medium text-white hover:bg-opacity-10 sm:ml-8 sm:mt-0 lg:ml-0 lg:w-full"
              >
                ดูรายละเอียด
              </a>
            </div>
          </div>
        </div>
          ))}

      </div>
    </div>
  );
}
