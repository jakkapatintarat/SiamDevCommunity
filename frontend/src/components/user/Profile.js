import React, { useState } from 'react'

export default function Profile() {
  const userData = localStorage.getItem("token")
  const decodedPayload = JSON.parse(atob(userData.split(".")[1]));
  const profile = decodedPayload.result || decodedPayload;
  console.log(profile);
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData;
  //     formData.append('photo', imageUpload);
  //     console.log(imageUpload);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }


  return (
    <div className="p-36">
      <div className="max-w-sm mx-auto  mt-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden justify-end shadow-lg">
        <div className="border-b px-4 pb-6">
          <div className="text-center my-4">
            <img
              className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
              src="https://randomuser.me/api/portraits/women/21.jpg"
              alt=""
            />
            <div className="py-2">
              <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">{profile.username}</h3>
              <h3 className="font-bold text-2xl text-gray-400 mb-1"></h3>

              <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
              </div>
            </div>
          </div>

        </div>
        <div className="px-4 pt-4">
          <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
            </svg>

            <span>
              <h1 className="text-black dark:text-white">E-mail: {profile.email}</h1>
            </span>
          </div>
          <div className="flex">
            <div className="flex justify-end mr-2">

            </div>
          </div>
        </div>
        <div className="px-4 py-0">
          <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>

            <span>
              <h1 className="text-black dark:text-white">ชื่อ: {profile.fname} นามสกุล: {profile.lname}</h1>
            </span>
          </div>
          <div className="flex">
            <div className="flex justify-end mr-2">

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
{/* <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" accept=".png, .jpg, .jpeg" name="photo" onChange={handlePhoto}/>
        <button type="submit">Upload</button>
      </form> */}