import axios from 'axios';
import React, { useEffect, useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import isAuthorized from '../../utils/Adminisauthorized';

export default function Manageuser() {
  // Check Auth
  useEffect(() => {
    const checkAutho = async () => {
      if (!isAuthorized) 
      return window.location('/login');
    }
    checkAutho();
  }, []);

  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
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


            </div>
            <div name={"modol"}>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-dark hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Add user
              </button>
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
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-dark">
                          Role
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span className="sr-only">Edit</span>
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
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
                          <td className="darkspace-nowrap px-3 py-4 text-sm text-dark-900">{user.fname}</td>
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


      </div>
    </main>
  )
}
