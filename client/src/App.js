import React, { useState } from 'react';
import Main from "./components/Main/Main"
import Navbar from "./components/Main/Navbar"

function App() {
  const [selectedRoom, setSelectedRoom] = useState('chat_test');

  const handleRoomSelect = (roomId) => {
    setSelectedRoom(roomId);
  };

    return (
      <div class="">
        <div className="font-vietnam flex-wrap flex-col">
        <Navbar />
        <Main selectedRoom={selectedRoom}/>
        </div>
        </div>
  )
}

export default App;
