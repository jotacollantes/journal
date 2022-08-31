import { DeleteOutline, SaveOutlined, UploadFileOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { ImageGallery } from "../components"
import {useForm} from "../../hooks/"
import { useEffect, useMemo, useRef } from "react"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startSaveNote, startUpLoadingFiles } from "../../store/journal/"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {

  const dispatch=useDispatch()  
  const {active:note,messageSaved,isSaving} = useSelector((state)=>{
    return state.journal;
  })

  const {title,body,date,onInputChange,formState}=useForm(note)
  
  const dateString =useMemo(() => {
    const newDate= new Date(date).toUTCString();
    return newDate;
},[date])
  

  useEffect(() => {
    
    dispatch(setActiveNote(formState))
    
  }, [formState])
  
useEffect(() => {
  
    if(messageSaved.length > 0) {
        Swal.fire('Nota actualizada:',messageSaved,'success')
    }
}, [messageSaved])

  const onSaveNote=() => {
    dispatch(startSaveNote())
  }

  const onFileinputChange=({target}) => {
      if(target.files===0) return;
      dispatch(startUpLoadingFiles(target.files))
  }

  //referenciamos al objeto del DOM <input/> y tomaremos el control de dicho elemento
  const inputFileRef=useRef()

  const onDelete=()=> {
    dispatch(startDeletingNote())
  }

  return (
   <Grid container
   direction='row'
   justifyContent='space-between'
   alignItems='center'
   sx={{mb:1}}
   className='animate__animated animate__fadeIn animate__faster'
   >
        <Grid item>
            <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
        </Grid>
        <Grid item>


           <input 
           type="file"
           multiple
           onChange={(e)=>{
            return onFileinputChange(e)
           }}
           style={{display:'none'}}
           //AQUI Referenciamos al input con el hook useRef creado 
           ref={inputFileRef}
           />
           <IconButton 
           color="primary"
           disabled={isSaving}
           onClick={()=>{
            //console.log(inputFileRef)
            //aqui simulamos el click del input referenciado con la propiedad current y la accion del usuario
            return inputFileRef.current.click()
           }}
           
           >
            <UploadFileOutlined />
           </IconButton>
            <Button
            disabled={isSaving}
            onClick={()=> {
                return onSaveNote()
            }}
            color="primary" 
            sx={{padding: 2}}>
                <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
                Guardar
            </Button>

        </Grid>
        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un titulo"
                label="Titulo"
                sx={{border: 'none', mb:1}}
                name="title"
                value={title}
                onChange={(e)=>{
                    return onInputChange(e.target)
                    }
                 }
            />
            
            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="Que sucedio el dia de hoy?"
                minRows={5}
                name="body"
                value={body}
                onChange={(e)=>{
                    return onInputChange(e.target)
                    }
                 }
            />
        </Grid>
        <Grid container justifyContent='end'>
          <Button 
          onClick={()=>{
            return onDelete()
          }}
          sx={{mt:2}}
          color="error"
          >
            <DeleteOutline/>Borrar Nota
          </Button>

        </Grid>

        {/* Envio como property (props) la propiedad de la notac activa active.imageUrls[] */}
        <ImageGallery images={note.imageUrls}/>

   </Grid>
  )
}
