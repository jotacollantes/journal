import { TurnedInNot } from '@mui/icons-material'
import { Box,Divider,Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'

import React from 'react'
import { useSelector } from 'react-redux'
import { SideBarItem } from './SideBarItem'

export const SideBar = ({drawerWidth=240}) => {
  const {status,displayName}=useSelector((state)=> {
        return state.auth;
  })

  const {notes} = useSelector((state)=> {
    return state.journal;
  })

  return (
    <Box
    component='nav'
    sx={
        {
            width:{sm: drawerWidth},
            flexShrink:{sm:0}
        }
    }
    >
        <Drawer
        variant='permanent'
        open
        sx={{
            
            display: {xs: 'block'},
            '& .MuiDrawer-paper':{boxSizing:'border-box',width: drawerWidth}
        }}
        >
            <Toolbar>
                <Typography varian='h6' noWrap component='div'>
                    {
                        (status==="authenticated") ? displayName :""
                    }
                    
                    </Typography>
            </Toolbar>
            <Divider/>
            <List>
                {
                    notes.map((note)=> {
                       
                       return <SideBarItem key={note.id} {...note}/>
                    })
                }

            </List>
        </Drawer>
    </Box>
  )
}
