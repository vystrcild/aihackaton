import React, {useState, useEffect} from 'react'

function Modal(props){

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return(

<div className="text-white p-4">
      <button onClick={props.openModal}>Open Modal</button>

      {showModal && (
        <div className="modal p-12">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>


            <div className="container mx-auto mt-6">

            <div class="flex text-white items-center m-4">
        <img src="../assets/images/me_avatar.png" className="w-20 h-20 "/>
        <div className="flex flex-col m-4">
          <strong>Homer Simpson</strong>
          <span>A career goal is a well-defined statement explaining the profession that an individual intends to pursue throughout his or her career. It is important for every employee or job seeker to come up with effective action plans in order to reach that end result</span>
        </div>
        </div>

        <div className="grid grid-cols-2 gap-2">

        <div className="m-4 p-2 border border-zinc-700 rounded-md flex text-white items-center">
        <div className="flex flex-col m-4">
        <strong>Career 📍</strong>
        <span className="text-zinc-400">A career goal is a well-defined statement explaining the profession that an individual intends to pursue throughout his or her career. It is important for every employee or job seeker to come up with effective action plans in order to reach that end result</span>
        </div>
        </div>

        <div className="m-4 p-2 border border-zinc-700 rounded-md flex text-white items-center">
        <div className="flex flex-col m-4">
        <strong>Happines 😊</strong>
        <span className="text-zinc-400">A career goal is a well-defined statement explaining the profession that an individual intends to pursue throughout his or her career. It is important for every employee or job seeker to come up with effective action plans in order to reach that end result</span>
        </div>
        </div>

        <div className="m-4 p-2 border border-zinc-700 rounded-md flex text-white items-center">
        <div className="flex flex-col m-4">
        <strong>Finance 💵</strong>
        <span className="text-zinc-400">A career goal is a well-defined statement explaining the profession that an individual intends to pursue throughout his or her career. It is important for every employee or job seeker to come up with effective action plans in order to reach that end result</span>
        </div>
        </div>

        <div className="m-4 p-2 border border-zinc-700 rounded-md flex text-white items-center">
        <div className="flex flex-col m-4">
        <strong>Relationship 💌</strong>
        <span className="text-zinc-400">A career goal is a well-defined statement explaini plans in order to reach that end result</span>
        </div>
        </div>

        <div className="m-4 p-2 border border-zinc-700 rounded-md flex text-white items-center">
        <div className="flex flex-col m-4">
        <strong>Health ❤️</strong>
        <span className="text-zinc-400">A career goal is a well-defined statement explaining the profession that an individual intends to pursue throughout his or her career. It is important for every employee or job seeker to come up with effective action plans in order to reach that end result</span>
        </div>
        </div>

        </div>

            </div>
          </div>
        </div>
      )}
    </div>

  )
}


export default Modal
