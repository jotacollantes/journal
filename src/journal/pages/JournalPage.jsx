import { AddOutlined } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal/thunks'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView } from '../views/NoteView'
import { NothingSelectedView } from '../views/NothingSelectedView'

export const JournalPage = () => {
  const dispatch =useDispatch()
  const onClickNewNote =() => {
        dispatch(startNewNote())
  }

  const {isSaving,active} =useSelector((state)=> {
    //Obtengo el estado isSaving del space journal dentro del store
    return state.journal
  })
  return (
      
    <JournalLayout>
      {/* <Typography >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum excepturi nam minus expedita necessitatibus, laboriosam facilis architecto possimus, eveniet dolore ducimus iste culpa. Deserunt, dolorum eaque corrupti aspernatur possimus ipsa!
    </Typography> */}


     {
      //Cuando no hay note activa el state active es null y se evalua como false
      (!active) ?<NothingSelectedView/> :<NoteView/> 
     }
      <IconButton
      disabled={isSaving}
      onClick={()=>{
        return onClickNewNote()
      }}
      size='large'
      sx={{color: 'white',
           backgroundColor:'error.main',
           ':hover':{backgroundColor: 'error.main', opacity:0.9},
           position:'fixed',
           right:50,
           bottom:50}}>
            <AddOutlined sx={{fontSize:30}}/>
        </IconButton>
    </JournalLayout>
    
  )
}
