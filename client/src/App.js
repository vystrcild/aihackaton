import React, { useState } from 'react';
import Main from "./components/Main/Main"
import Navbar from "./components/Main/Navbar"
import Modal from "./components/Main/Modal"

function App() {
  const [selectedRoom, setSelectedRoom] = useState('chat_test');

  const handleRoomSelect = (roomId) => {
    setSelectedRoom(roomId);
  };

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
      setShowModal(true);
    }

    const closeModal = () => {
      setShowModal(false);
    }

    return (
      <div class="">
    <div className={`font-vietnam flex-wrap flex-col ${showModal ? 'blur-lg' : ''}`}>
     <Navbar openModal={openModal}/>
    <Main selectedRoom={selectedRoom}/></div>

    <div className="text-white p-4 ">

          {showModal && (
            <div className="modal p-12">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>


                <div className="container mx-auto mt-6">

                <div class="flex text-white items-center m-4">
            <img src="../assets/images/me_avatar.png" className="w-20 h-20 "/>
            <div className="flex flex-col m-4">
              <strong>Homer Simpson</strong>
            </div>
            </div>

            <div className="grid grid-cols-2 gap-2">

            <div className="m-4 p-2 bg-black border border-zinc-700 rounded-md flex text-white items-center">
            <div className="flex flex-col m-4">
            <strong>Career 📍</strong>
            <span className="text-zinc-400">Homer works at the Springfield Nuclear Power Plant as a safety inspector, a job that he has held for many years. Despite his incompetence and lack of interest in the job, he manages to avoid serious consequences and maintain his position. His career is marked by a series of odd jobs and unsuccessful ventures, but he always returns to his position at the power plant.</span>
            </div>
            </div>

            <div className="m-4 p-2 bg-black border border-zinc-700 rounded-md flex text-white items-center">
            <div className="flex flex-col m-4">
            <strong>Happines 😊</strong>
            <span className="text-zinc-400">Homer Simpson is a character that embodies a unique mix of joy and frustration. He's often happy when he's with his family, enjoying his favorite activities like eating donuts, drinking beer, or watching TV. However, he also faces daily challenges and setbacks, which occasionally lead to comical expressions of anger or exasperation. Overall, his happiness is derived from his love for his family and his ability to find simple pleasures in life.</span>
            </div>
            </div>

            <div className="m-4 p-2 bg-black border border-zinc-700 rounded-md flex text-white items-center">
            <div className="flex flex-col m-4">
            <strong>Finance 💵</strong>
            <span className="text-zinc-400">Homer's financial situation is often portrayed as precarious, with the family living paycheck to paycheck. Despite this, they manage to maintain a comfortable lifestyle and rarely experience significant financial hardship. His impulsive spending habits and poor decision-making sometimes lead to financial troubles, but they are usually resolved in humorous ways.</span>
            </div>
            </div>

            <div className="m-4 p-2 bg-black border border-zinc-700 rounded-md flex text-white items-center">
            <div className="flex flex-col m-4">
            <strong>Relationship 💌</strong>
            <span className="text-zinc-400">Homer has a loving and supportive, yet sometimes strained, relationship with his wife Marge. They have three children: Bart, Lisa, and Maggie. He has a close bond with his kids, especially with Bart, despite their frequent disagreements. Homer also has several friends, including his drinking buddies from Moe's Tavern, and an ongoing rivalry with his neighbor, Ned Flanders.</span>
            </div>
            </div>

            <div className="m-4 p-2 bg-black border border-zinc-700 rounded-md flex text-white items-center">
            <div className="flex flex-col m-4">
            <strong>Health ❤️</strong>
            <span className="text-zinc-400">Homer's health is often a subject of humor on the show. He's overweight, largely due to his love for food and a sedentary lifestyle. He frequently indulges in unhealthy behaviors such as excessive drinking and poor diet choices. Despite these habits, he has managed to survive various accidents and health scares, often with an element of slapstick comedy.</span>
            </div>
            </div>

            </div>

                </div>
              </div>
            </div>
          )}
        </div>

        </div>
  )
}

export default App;
