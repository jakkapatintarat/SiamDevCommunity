import React, { useEffect, useState } from 'react'
import isAuthorized from '../../utils/Adminisauthorized';
import TopBlogs from './components/TopBolgs';
import axios from 'axios';
import { BLOG, USER, COMMENT } from '../../constants/api';

export default function Dashboard() {
  const [userBlogs, setUserBlogs] = useState([]);
  const [user, setUser] = useState([]);
  const [comment, setComment] = useState([]);
  // Check Auth
  useEffect(() => {
    isAuthorized();
  }, []);

  useEffect(() => {
    const getUserBlog = async () => {
      const fetchUserBlogs = await axios.get(BLOG.GET_ALL);
      setUserBlogs(fetchUserBlogs.data.blogs?.length || 0);
    }
    const getUser = async () => {
      const fetchUser = await axios.get(USER.GET_ALL);
      setUser(fetchUser.data.users?.length || 0);
    }
    const getComment = async () => {
      const fetchComment = await axios.get(COMMENT.GET_ALL);
      setComment(fetchComment.data.comments?.length || 0);
    }

    getUserBlog();
    getUser();
    getComment();
  }, []);

  return (
    <main className="py-10 lg:pl-72">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* card */}
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">Dashboard</h3>

          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg bg-gray-600 px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
              <dt>
                <div className="absolute rounded-md bg-red-600 p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                  </svg>
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-300">Total User Blogs</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-100">{userBlogs}</p>
                <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  <svg className="h-5 w-5 flex-shrink-0 self-center text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
                  </svg>
                  {/* <span className="sr-only"> Increased by </span>
                  122 */}
                </p>
                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <a href="/admin/manageblog" className="font-medium text-orange-400 hover:text-red-500">View all<span className="sr-only"> Total Subscribers stats</span></a>
                  </div>
                </div>
              </dd>
            </div>
            <div className="relative overflow-hidden rounded-lg bg-gray-600 px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
              <dt>
                <div className="absolute rounded-md bg-orange-500 p-3">
                  <svg className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" strokeLinecap="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-300">Total Users</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-100">{user}</p>
                <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  <svg className="h-5 w-5 flex-shrink-0 self-center text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
                  </svg>
                  {/* <span className="sr-only"> Increased by </span>
                  5.4% */}
                </p>
                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <a href="/admin/manageuser" className="font-medium text-yellow-600 hover:text-orange-500">View all<span className="sr-only"> Avg. Open Rate stats</span></a>
                  </div>
                </div>
              </dd>
            </div>
            <div className="relative overflow-hidden rounded-lg bg-gray-600 px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
              <dt>
                <div className="absolute rounded-md bg-blue-500 p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeLinecap="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                  </svg>
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-300">Total Comments on every blogs</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-100">{comment}</p>
                <p className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeLinecap="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                  </svg>
                  {/* <span className="sr-only"> Decreased by </span>
                  3.2% */}
                </p>
                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <p href="#" className="font-medium text-white">-*-*-*-*-<span className="sr-only"> Avg. Click Rate stats</span></p>
                  </div>
                </div>
              </dd>
            </div>
          </dl>
        </div>
        {/* end card */}

        {/* table */}
        <div className='mt-10'>
          <div className="rounded overflow-hidden shadow bg-white mx-2 w-full">
            <div className="px-6 py-2 border-b bg-gray-600 border-light-grey">
              <div className="font-bold text-white text-xl">Official Blogs</div>
            </div>
            <div className='mx-10'>
              <TopBlogs />
            </div>
          </div>
        </div>
        {/* end table */}
      </div>
    </main>
  );
}
