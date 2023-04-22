import React, { useState } from 'react';
import Main from "./components/Main/Main"

function App() {
  const [selectedRoom, setSelectedRoom] = useState('farnam');

  const handleRoomSelect = (roomId) => {
    setSelectedRoom(roomId);
  };

    return (
      <>
      <div className="font-vietnam flex h-screen">
      <Main selectedRoom={selectedRoom} />
    </div>
    </>
  )
}

export default App;
