import React from 'react'
import NoteSideBar from '../Components/NoteSideBar/NoteSideBar'
import NoteContainer from '../Components/NoteContainer/NoteContainer'
import './Main.css'

function Main() {
  return (
    <div className='main'>
      <NoteSideBar></NoteSideBar>
      <NoteContainer></NoteContainer>
    </div>
  )
}

export default Main