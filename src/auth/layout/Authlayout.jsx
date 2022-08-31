import { Grid, Typography } from '@mui/material'
import React from 'react'

export const Authlayout = ({children,title}) => {
  return (
    <Grid container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{minHeight: '100vh', backgroundColor: 'primary.main', padding:4}}
    >
    {/* Aqui esta la cajita blanca */}
      <Grid item
      className='box-shadow'
      xs={3}
      sx={{
        width:{sm: 450},
        backgroundColor:'white',
        padding:3,
        borderRadius:2
    }}
      >
        <Typography variant='h5' sx={{mb:1}}>{title}</Typography>
        {/* Children */}
        {children}
      </Grid>
    </Grid>
  )
}
