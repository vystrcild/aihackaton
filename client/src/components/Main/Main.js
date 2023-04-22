import React, { useState, useEffect } from 'react'
import { io } from "socket.io-client";
import ChatInput from './ChatInput';
import MessageList from "./MessageList"
import { formatDateTime } from '../../helpers/dateHelpers';


const Main = ({ selectedRoom }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState(null);

  const handleSendMessage = (text) => {
    if (!socket) return;

    const newMessage = {
      user: 'Me',
      type: 'human',
      text: text,
      room: selectedRoom,
      datetime: formatDateTime(new Date()),
    };
    setMessages([...messages, newMessage]);

    socket.emit('message', {
      user: newMessage.user,
      type: newMessage.type,
      text: newMessage.text,
      room: newMessage.room,
      datetime: newMessage.datetime,
    });

    setIsLoading(true);
  };

  useEffect(() => {
    const newSocket = io('https://4320-20-199-67-79.ngrok-free.app');
    setSocket(newSocket);

    const handleNewMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      setIsLoading(false);
    };

    newSocket.on('all_messages', (data) => {
      setMessages(data);
    });

    newSocket.on('data', handleNewMessage);

    return () => {
      newSocket.off('data', handleNewMessage);
      newSocket.off('all_messages');
      newSocket.disconnect();
    };
  }, []);

  const filteredMessages = selectedRoom
    ? messages.filter((message) => message.room === selectedRoom)
    : messages;



  return (
    <div className="w-full h-screen flex flex-col pt-20">
      <MessageList messages={filteredMessages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Main;
