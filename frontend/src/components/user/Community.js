import React, { useEffect, useState, useRef } from "react"
// import io from "socket.io-client"
import { io } from 'socket.io-client';
import isAuthenticated from "../../utils/AuthAPI";

var socket = io('http://localhost:5000');
export default function Community() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const chatContainerRef = useRef(null);
  const [profile, setProfile] = useState({});

  const isAuthenticatedUser = isAuthenticated();

  useEffect(() => {
    if (isAuthenticatedUser === true) {
      const userData = localStorage.getItem("token");
      const decodedPayload = JSON.parse(atob(userData.split(".")[1]));
      const data = decodedPayload.result || decodedPayload;
      setProfile(data);
    }
  }, []);

  useEffect(() => { // recieve message from server
    socket.on('serverSend', (data) => {
      console.log('recieve message', data);
      setChat(prevMessage => [...prevMessage, data]);
    });
  }, []);

  const handelSubmit = (e) => {
    e.preventDefault();
    socket.emit('sendMessage', { message });  // send message to server
    console.log('send message', message);

    const selfChat = {
      text: message,
      isChatOwner: true,
    }

    setChat(prevMessage => [...prevMessage, selfChat]);
    setMessage('');
  }

  //auto scroll down
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 ">

      <div className="max-h-full h-full bg-white border border-gray-200 rounded-lg shadow relative">

        {/* chat header */}
        <div className="border-b-2 border-b-gray-200 py-3 px-6 flex flex-row justify-between items-center dark:bg-gray-300">
          <div className="flex flex-row items-center space-x-1.5">
            {/* <Avatar /> */}
            <div className="flex flex-col">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
            </div>

            <div className="flex flex-col">
              <p className="text-l text-gray-600 font-bold">SiamDevCommunity</p>
              <p className="text-sm text-gray-400 font-semibold">real time chat</p>
            </div>
          </div>
          <div className="space-x-1">
            <button
              type="button"
              className="hover:bg-gray-100 rounded-full font-medium text-sm p-1.5 text-center inline-flex items-center"
            >
              {/* <PhoneIcon className="text-gray-600 w-5 h-5" /> */}
            </button>
            <button
              type="button"
              className="hover:bg-gray-100 rounded-full font-medium text-sm p-1.5 text-center inline-flex items-center"
            >
              {/* <CameraIcon className="text-gray-600 w-5 h-5" /> */}
            </button>
          </div>
        </div>
        {/* chat header */}

        {/* chat content */}

        <div className="max-h-full px-6 py-1 overflow-auto scroll-smooth dark:bg-gray-50" style={{ height: '40rem' }} ref={chatContainerRef}>
          {chat.map((message, index) => (
            <div
              key={index}
              className={`py-2 flex flex-row w-full ${message.isChatOwner ? "justify-end" : "justify-start"
                }`}
            >
              <div className={`text-sm ${message.isChatOwner ? "order-2" : "order-1"}`}>
                <img src="https://img.icons8.com/?size=50&id=RbMAQFyq6YZQ&format=png" />
                {/* Anonymous */}
              </div>
              <div
                className={`px-2 w-fit py-3 flex flex-col bg-purple-500 rounded-lg text-white ${message.isChatOwner ? "order-1 mr-2" : "order-2 ml-2"
                  }`}
              >
                <span className="text-md">{message.text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* chat content */}

        {/* chat input */}
        {/* <div className="px-6 py-3 bg-white w-100 rounded-bl-xl rounded-br-xla">
            <form onSubmit={handelSubmit}>
              <input type="text" className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={message} onChange={(e) => setMessage(e.target.value)} />
              <button type="submit">Send</button>
            </form>
        </div> */}
        {/* chat input */}

        <form onSubmit={handelSubmit}>
          <label for="chat" class="sr-only">Type message</label>
          <div class="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-300">

            <input type="text" class="block mx-4 p-2.5 w-full text-sm text-black bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message..."></input>

            <button type="submit" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
              <svg class="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
            </button>
          </div>
        </form>

      </div>


    </div>
  )
}

{/* <div className="border-2 border-black p-96">

                {chat.map((message, index) => (<li key={index}>{message}</li>))}
                <form onSubmit={handelSubmit}>
                  <input type="text" className="border-2 border-black" value={message} onChange={(e) => setMessage(e.target.value)} />
                  <button type="submit">Send</button>
                </form>

              </div> */}