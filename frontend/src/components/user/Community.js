import React, { useEffect, useState, useRef } from "react"
// import io from "socket.io-client"
import { io } from 'socket.io-client';

var socket = io('http://localhost:5000');
export default function Community() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const chatContainerRef = useRef(null);

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

  //auto scroll dow
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 ">

      <div className="max-h-full h-full bg-white border border-gray-200 rounded-lg shadow relative">

        {/* chat header */}
        <div className="border-b-2 border-b-gray-200 py-3 px-6 flex flex-row justify-between items-center">
          <div className="flex flex-row items-center space-x-1.5">
            {/* <Avatar /> */}
            <div className="flex flex-col">
              <p className="text-xs text-gray-600">SiamDevCommunity</p>
              <p className="text-xs text-gray-400">real time chat</p>
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

        <div className="max-h-full px-6 py-1 overflow-auto scroll-smooth" style={{height: '40rem'}} ref={chatContainerRef}>
          {chat.map((message, index) => (
            <div
              key={index}
              className={`py-2 flex flex-row w-full ${message.isChatOwner ? "justify-end" : "justify-start"
                }`}
            >
              <div className={`${message.isChatOwner ? "order-2" : "order-1"}`}>
                {/* <Avatar /> */}
                Avatar
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
        <div className="px-6 py-3 bg-white w-100 rounded-bl-xl rounded-br-xla">
          <div className="flex flex-row items-center space-x-5">
            <form onSubmit={handelSubmit}>
              <input type="text" className="border-2 border-black" value={message} onChange={(e) => setMessage(e.target.value)} />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
        {/* chat input */}

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