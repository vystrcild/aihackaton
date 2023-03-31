import React, { useState, useEffect } from 'react'
import { io } from "socket.io-client";
import ChatInput from './ChatInput';
import MessageList from "./MessageList"

const socket = io("http://localhost:5001");


function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(6, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}


const Main = ({ selectedRoom }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (text) => {
    const newMessage = {
      user: "Me",
      text: text,
      room: selectedRoom,
      datetime: formatDateTime(new Date()),
    };
    setMessages([...messages, newMessage]);

    socket.emit("message", {
      user: newMessage.user,
      text: newMessage.text,
      room: newMessage.room,
      datetime: newMessage.datetime,
    });

    // Set isLoading to true when waiting for a reply from any room
    setIsLoading(true);
  };

  useEffect(() => {
    // Fetch all messages from the server
    socket.on("all_messages", (data) => {
    setMessages(data);
    });


    const handleNewMessage = (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
      setIsLoading(false); // Set isLoading to false when the reply is received
    };
    socket.on('farnam_reply', handleNewMessage);
    // Listen for the 'data' event, which is emitted for replies from all rooms
    socket.on('data', handleNewMessage);

    return () => {
      socket.off('farnam_reply', handleNewMessage);
      socket.off("all_messages");
    };
  }, []);

  const filteredMessages = selectedRoom
    ? messages.filter((message) => message.room === selectedRoom)
    : messages;


  return (
    <div className="w-full h-full flex flex-col">
        <MessageList messages={filteredMessages} isLoading={isLoading} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
  )
}

export default Main