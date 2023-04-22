import React, {useState, useEffect} from 'react'
import getAvatarUrl from '../../helpers/avatarHelper'

function Navbar(){
  return(
    <nav className="w-full flex-none px-4 bg-bgblack">
    <div className="flex w-6/12" style={{ position: 'absolute', top: '10px'}}>
      <img src="../assets/images/avatar.png" alt="Ai hackaton" className="w-12 h-12 rounded-full mr-4 mt-1"/> <h2 className="text-white text-lg display-2 flex content-left items-center ">aihackaton.vercel.app</h2>
      </div>
    </nav>
  )
}
export default Navbar
