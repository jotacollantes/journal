import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice'


export const SideBarItem = ({id,title='',body,date,imageUrls=[]}) => {

  const newTitle=useMemo(() => {
    return (title.length >17) ? title.substring(0,17) + '...' : title;
  }, [title]) 

  const dispatch=useDispatch()
  
  const noteSelected=()=> {
    
    //  const note= {
    //          id: id,
    //          title: title,
    //          body: body,
    //          date: date,
    //          imageUrls:imageUrls
    //     }
    //dispatch(setActiveNote(note))
    dispatch(setActiveNote({id,title,body,date,imageUrls}))
}

  return (
    <ListItem disablePadding>
    <ListItemButton
      onClick={()=>{
        return noteSelected()
      }}
    >
        <ListItemIcon>
        <TurnedInNot/>
        </ListItemIcon>
        <Grid container>
            <ListItemText primary={newTitle}/>
            <ListItemText secondary={body}/>
            </Grid>
    </ListItemButton>
   </ListItem>
  )
}
