import React, { useEffect, useState } from "react"
// import io from "socket.io-client"
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function Community() {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    }
  }, []);
  // const [socket, setSocket] = useState(null);
  // const [messages, setMessages] = useState([]);
  // const [newMessage, setNewMessage] = useState('');

  // useEffect(() => {
  //   const newSocket = io('http://localhost:5000');
  //   setSocket(newSocket);

  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on('message', (message) => {
  //       setMessages((prevMessages) => [...prevMessages, message]);
  //     });
  //   }
  // }, [socket]);

  // const sendMessage = () => {
  //   if (socket && newMessage.trim() !== '') {
  //     socket.emit('message', newMessage);
  //     setNewMessage('');
  //   }
  // }

  return (
    <>
      <div>
        <div className="lg:pl-20 border-3 border-gray-950 w-full">



          <main className="xl:pl-96 ">
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 ">
              <div className="border-2 border-black p-96">
                <h1>message</h1>
              </div>
            </div>
          </main>


        </div>


        <aside className="fixed bottom-0 left-10 top-16 hidden w-96 overflow--auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
          <div className="border-2 border-black p-20 m-5">บทความที่ 1 </div>
          <div className="border-2 border-black p-20 m-5">บทความที่ 2 </div>
          <div className="border-2 border-black p-20 m-5">บทความที่ 3 </div>
          <div className="border-2 border-black p-20 m-5">บทความที่ 4 </div>
        </aside>
      </div>
    </>
  )
}
