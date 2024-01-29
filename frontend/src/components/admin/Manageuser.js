import axios from 'axios';
import React, { useEffect, useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import isAuthorized from '../../utils/Adminisauthorized';

export default function Manageuser() {
  // Check Auth
  useEffect(() => {
    isAuthorized();
  }, []);

  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditmodal] = useState(false);

  // edit form state
  const [selectedUser, setSelectedUser] = useState({
    _id: '',
    username: '',
    password: '',
    email: '',
    fname: '',
    lname: '',
    tel: '',
  });

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        username: username,
        password: password,
        fname: firstName,
        lname: lastName,
        email: email,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setOpen(false)
    } catch (error) {
      console.error("Sign in failed", error);
    }
  };

  const handlevViewClick = async (user) => {
    console.log(user);
    setViewModal(true);
  }
  const handleEditClick = async (user) => {
    console.log(user);
    setSelectedUser(user);
    setEditmodal(true);
  }


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // console.log(selectedUser._id);
      const res = await axios.patch(`http://localhost:5000/api/user/update/${selectedUser._id}`, {
        username: selectedUser.username,
        password: selectedUser.password,
        fname: selectedUser.fname,
        lname: selectedUser.lname,
        email: selectedUser.email,
        tel: selectedUser.tel,
      });
      // console.log(res);
      setEditmodal(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  const handleDeleteClick = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(`http://localhost:5000/api/delete/user/${id}`);
      console.log(res);
      alert('deleted') //ดิส
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then((res) => {
        console.log(res.data);
        setUsers(res.data)
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main className="pt-0 pl-72 ">

      <div>

        {/* Table */}
        <div className="bg-gray-200">

          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto mt-10">
                <h1 className="text-base font-semibold leading-6 text-dark mb-3">Manage Users</h1>
              </div>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="block rounded-md bg-indigo-500 px-3 py-2 mt-20 text-center text-sm font-semibold text-dark hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Add user
              </button>

            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-dark sm:pl-0">
                          Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-dark" hidden>
                          Password
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-dark">
                          Email
                        </th>
                        <th scope="col" className="px-3 py-3.5 w-2/6 text-left text-sm font-semibold text-dark">
                          Role
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
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td className="darkspace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-dark sm:pl-0">
                            {user.username}
                          </td>
                          <td className="darkspace-nowrap px-3 py-4 text-sm text-dark-900" hidden>{user.password}</td>
                          <td className="darkspace-nowrap px-3 py-4 text-sm text-dark-900">{user.email}</td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            {user.role === 'user' ? (
                              <span className="inline-flex items-center rounded-md bg-green-200 px-2 py-1 text-sm font-bold text-green-700 ring-1 ring-inset ring-green-600/20">
                                user
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-md bg-red-200 px-2 py-1 text-sm font-bold text-red-700 ring-1 ring-inset ring-green-600/20">
                                admin
                              </span>
                            )}

                          </td>
                          {/* <td className="darkspace-nowrap px-3 py-4 text-sm text-dark-900">{user.role}</td> */}
                          <td className="relative darkspace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <button
                              type="button"
                              onClick={() => handlevViewClick(user)}
                              className="text-indigo-400 hover:text-indigo-600"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              </svg>

                            </button>
                          </td>
                          <td className="relative darkspace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <button
                              type="button"
                              onClick={() => handleEditClick(user)}
                              className="text-indigo-400 hover:text-indigo-600"
                            >
                              Edit
                            </button>
                          </td>
                          <td className="relative darkspace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <button
                              type="button"
                              onClick={() => handleDeleteClick(user._id)}
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

        {/* modal เพิ่มผู้ใช้ */}
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
                      <form className="space-y-6" onSubmit={handleCreate} >
                        <div>
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            username
                          </label>
                          <div className="mt-2">
                            <input
                              id="username"
                              name="username"
                              type="text"
                              autoComplete="username"
                              required
                              onChange={(e) => setUsername(e.target.value)}
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
                              Password
                            </label>
                          </div>
                          <div className="mt-2">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="current-password"
                              required
                              onChange={(e) => setPassword(e.target.value)}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

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
                              autoComplete="current-password"
                              required
                              onChange={(e) => setFirstName(e.target.value)}
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
                              autoComplete="current-password"
                              required
                              onChange={(e) => setLastName(e.target.value)}
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
                              type="text"
                              autoComplete="current-password"
                              required
                              onChange={(e) => setTelephone(e.target.value)}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              E-mail
                            </label>
                          </div>
                          <div className="mt-2">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="current-password"
                              required
                              onChange={(e) => setEmail(e.target.value)}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            เพิ่มผู้ใช้
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
        {/*จบ modal เพิ่มผู้ใช้ */}


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
                      <form className="space-y-6" onSubmit={handleUpdate} >
                        <div>
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            username
                          </label>
                          <div className="mt-2">
                            <input
                              id="username"
                              name="username"
                              type="text"
                              value={selectedUser.username}
                              required
                              onChange={(e) => {
                                // console.log('Username:', e.target.value);
                                // อัปเดต state
                                setSelectedUser(prevUser => ({
                                  ...prevUser,
                                  username: e.target.value,
                                }));
                              }}
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
                              Password
                            </label>
                          </div>
                          <div className="mt-2">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="current-password"
                              value={selectedUser.password}
                              required
                              onChange={(e) => {
                                // console.log('Username:', e.target.value);
                                // อัปเดต state
                                setSelectedUser(prevUser => ({
                                  ...prevUser,
                                  password: e.target.value,
                                }));
                              }}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

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
                              value={selectedUser.fname}
                              autoComplete="current-password"
                              required
                              onChange={(e) => {
                                // console.log('Username:', e.target.value);
                                // อัปเดต state
                                setSelectedUser(prevUser => ({
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
                              value={selectedUser.lname}
                              autoComplete="current-password"
                              required
                              onChange={(e) => {
                                // console.log('Username:', e.target.value);
                                // อัปเดต state
                                setSelectedUser(prevUser => ({
                                  ...prevUser,
                                  lname: e.target.value,
                                }));
                              }}
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
                              type="text"
                              value={selectedUser.tel}
                              autoComplete="current-password"
                              required
                              onChange={(e) => {
                                // console.log('Username:', e.target.value);
                                // อัปเดต state
                                setSelectedUser(prevUser => ({
                                  ...prevUser,
                                  tel: e.target.value,
                                }));
                              }}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              E-mail
                            </label>
                          </div>
                          <div className="mt-2">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              value={selectedUser.email}
                              autoComplete="current-password"
                              required
                              onChange={(e) => {
                                // console.log('Username:', e.target.value);
                                // อัปเดต state
                                setSelectedUser(prevUser => ({
                                  ...prevUser,
                                  email: e.target.value,
                                }));
                              }}
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
                  <Dialog.Panel className="relative bg-gradient-to-r from-violet-500 to-fuchsia-500 transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <div className="bg-gray-900 py-24 sm:py-32">
                      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
                        <div className="mx-auto max-w-2xl">
                          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">รายละเอียดผู้ใช้</h2>
                          <p className="mt-4 text-lg leading-8 text-gray-400">
                            We’re a dynamic group of individuals who are passionate about what we do.
                          </p>
                        </div>



                      </div>
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
