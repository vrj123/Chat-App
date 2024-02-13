import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import { format } from "timeago.js";
import io from "socket.io-client";
import { useRef } from "react";
const socket = io("https://chat-app-two-beryl.vercel.app/");

const Chatview = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages([...messages, data]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  socket.on("receive_message", (data) => {
    setMessages([...messages, data]);
  });

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    const data = { text: message, createdAt: Date.now(), user };
    socket.emit("send_message", data);
    setMessage("");
  };

  return (
    <div className="py-2">
      <div className="w-full bg-gray-200 p-4 fixed top-0 left-0 h-[50px] text-center">
        Welcome to chat
      </div>
      <div className="flex mt-[50px] flex-col gap-[10px] px-4 h-[80vh] overflow-y-scroll">
        {messages.length > 0 &&
          messages.map((message, index) => (
            <div
              key={index}
              className={`${
                user.id == message.user.id ? "self-end" : "self-start"
              }`}
              ref={scrollRef}
            >
              <p className="text-gray-500 text-[14px]">{message.user.name}</p>
              <p
                className={`${
                  user.id == message.user.id
                    ? "self-end bg-green-500 text-white"
                    : "self-start bg-gray-300"
                } p-2 rounded w-fit`}
              >
                {message.text}
              </p>
              <p className="text-gray-500 text-[12px]">
                {format(message.createdAt)}
              </p>
            </div>
          ))}
      </div>
      <div className="fixed bottom-6 left-0 w-full">
        <div className="w-full relative">
          <input
            type="text"
            className="border border-gray-500 w-full p-2"
            onChange={handleMessageChange}
            value={message}
            placeholder="Entre your message..."
          />
          <button className="absolute right-2 top-2" onClick={sendMessage}>
            <IoMdSend size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatview;
