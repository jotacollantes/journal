import { Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { NavBar, SideBar } from '../components'

const drawerWidth=280
export const JournalLayout = ({children}) => {
  return (
    // Los Box son el equivalente a los DIV de Bootstrap
    <Box sx={{display:'flex'}} className='animate__animated animate__fadeIn animate__faster'>
        {/* Navbar */}
        <NavBar drawerWidth={drawerWidth}/>
        {/* SideBar */}
        <SideBar drawerWidth={drawerWidth}/>
        
        <Box component='main'
        sx={{flexGrow:1, p:3}}
        >
             {/* Toolbar */}
             <Toolbar/>
             {children}
        </Box>

    </Box>
  )
}
