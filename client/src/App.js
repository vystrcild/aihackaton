import React, { useState } from 'react';
import Sidebar from "./components/Sidebar/Sidebar"
import Main from "./components/Main/Main"

function App() {
  const [selectedRoom, setSelectedRoom] = useState('chat_test');

  const handleRoomSelect = (roomId) => {
    setSelectedRoom(roomId);
  };

    return (
      <>
      <div className="font-vietnam flex h-screen">
      <Sidebar selectedRoom={selectedRoom} onRoomSelect={handleRoomSelect} />
      <Main selectedRoom={selectedRoom} />
    </div>
    </>
  )
}

export default App;
