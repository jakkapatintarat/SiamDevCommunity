import React, { useEffect, useState } from "react"
// import io from "socket.io-client"
import { io } from 'socket.io-client';

var socket = io('http://localhost:5000');
export default function Community() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => { // recieve message from server
    socket.on('serverSend', (data) => {
      console.log('recieve message', data);
      setChat(prevMessage => [...prevMessage, data.message]);
    });
  }, []);

  const handelSubmit = (e) => {
    e.preventDefault();
    socket.emit('sendMessage', { message });  // send message to server
    console.log('send message', message);
    setChat(prevMessage => [...prevMessage,  `You: ${message}`]);
    setMessage('');
  }

  return (
    <>
      <div>
        <div className="lg:pl-20 border-3 border-gray-950 w-full">
          <main className="xl:pl-96 ">
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 ">
              <div className="border-2 border-black p-96">
                {chat.map((message, index) => (<li key={index}>{message}</li>))}
                <form onSubmit={handelSubmit}>
                  <input type="text" className="border-2 border-black" value={message} onChange={(e) => setMessage(e.target.value)} />
                  <button type="submit">Send</button>
                </form>






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
