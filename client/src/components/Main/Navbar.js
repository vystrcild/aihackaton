import React, {useState, useEffect} from 'react'
import getAvatarUrl from '../../helpers/avatarHelper'

function Navbar(props){
  return(
    <nav className="w-full flex-none px-4 bg-bgblack">
    <div className="flex w-full w-6/12" style={{ position: 'absolute', top: '10px', justifyContent: 'space-around'}}>
      <div class="flex">
        <img src="../assets/images/avatar.png" alt="Ai hackaton" className="w-12 h-12 rounded-full mr-4 mt-1"/> <h2 className="text-white text-lg display-2 flex content-left items-center ">CoachAI</h2>
        </div>
        <button className="p-4 rounded-lg gray-700 bg-yellow-400 hover:bg-yellow-600 btn btn-small border-solid text-black " onClick={props.openModal}>Profile</button>
      </div>
    </nav>
  )
}
export default Navbar
