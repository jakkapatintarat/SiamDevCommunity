import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";

export default function Profile() {
  const [editModal, setEditmodal] = useState(false);
  // ดึงข้อมูลผู้ใช้
  const userData = localStorage.getItem("token");
  const decodedPayload = JSON.parse(atob(userData.split(".")[1]));
  const profile = decodedPayload.result || decodedPayload;
  const [user, setUser] = useState({
    username: profile.username,
    password: '',
    email: profile.email,
    fname: '',
    lname: '',
    tel: '',
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.patch(`http://localhost:5000/api/user/update/${profile._id}`, user);
    console.log(res);

  }
  const handleEditClick = async () => {
    setEditmodal(true);
  };

  return (
    <div className="p-36">
      <div className="max-w-sm mx-auto  mt-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden justify-end shadow-lg">
        <div className="border-b px-4 pb-6">
          <div className="text-center my-4">
            <img
              className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
              src={profile.img}
              alt=""
            />
            <div className="py-2">
              <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                {profile.username}
              </h3>
              <h3 className="font-bold text-2xl text-gray-400 mb-1"></h3>
              <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                <button
                  type="button"
                  onClick={() => handleEditClick()}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  แก้ไขโปร์ไฟล์
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 pt-4">
          <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
              />
            </svg>

            <span>
              <h1 className="text-black dark:text-white">
                E-mail: {profile.email}
              </h1>
            </span>
          </div>
          <div className="flex">
            <div className="flex justify-end mr-2"></div>
          </div>
        </div>
        <div className="px-4 py-0">
          <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <span>
              <h1 className="text-black dark:text-white">
                ชื่อ: {profile.fname} นามสกุล: {profile.lname}
              </h1>
            </span>
          </div>
          <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>

            <span>
              <h1 className="text-black dark:text-white">
                เบอร์โทรศัพท์: {profile.tel}
              </h1>
            </span>
          </div>
          <div className="flex">
            <div className="flex justify-end mr-2"></div>
          </div>
        </div>
      </div>
      {/* modal แก้ไข */}
      <Transition.Root show={editModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setEditmodal}>
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
                    <form className="space-y-6" onSubmit={handleUpdate}>
                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="firstname"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            ชื่อ
                          </label>
                        </div>
                        <div className="mt-2">
                          <input
                            id="firstname"
                            name="firstname"
                            type="text"
                            value={user.fname}
                            placeholder={profile.fname}
                            autoComplete="current-password"
                            required
                            onChange={(e) => {
                              console.log('fname:', e.target.value);
                              // อัปเดต state
                              setUser(prevUser => ({
                                ...prevUser,
                                fname: e.target.value,
                              }));
                            }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="lastname"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            นามสกุล
                          </label>
                        </div>
                        <div className="mt-2">
                          <input
                            id="lastname"
                            name="lastname"
                            type="text"
                            value={user.lname}
                            placeholder={profile.lname}
                            onChange={(e) => {
                              console.log('lname:', e.target.value);
                              // อัปเดต state
                              setUser(prevUser => ({
                                ...prevUser,
                                lname: e.target.value,
                              }));
                            }}
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="telephone"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            เบอร์โทรศัพท์
                          </label>
                        </div>
                        <div className="mt-2">
                          <input
                            id="telephone"
                            name="telephone"
                            value={user.tel}
                            placeholder={profile.tel}
                            onChange={(e) => {
                              console.log('tel:', e.target.value);
                              // อัปเดต state
                              setUser(prevUser => ({
                                ...prevUser,
                                tel: e.target.value,
                              }));
                            }}
                            type="text"
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            รหัสผ่านใหม่
                          </label>
                        </div>
                        <div className="mt-2">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={(e) => {
                              console.log('password:', e.target.value);
                              // อัปเดต state
                              setUser(prevUser => ({
                                ...prevUser,
                                password: e.target.value,
                              }));
                            }}
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          แก้ไข
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
      {/*จบ modal แก้ไข */}
    </div>
  );
}
