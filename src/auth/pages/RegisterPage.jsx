import { Link as LinkRouter } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { Authlayout } from '../layout/Authlayout'
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'

const formData=
{
  email: '',
  password: '',
  displayName:''
}

//formValidations es un objeto que incluye propiedades con los mismos nombres de los elementos en el formulario y que tambien estan definidos en el objeto formData
const formValidations={
  //Cada propiedad tendra un arreglo donde el elemento 0 es la funcion que hace la evaluacion con la condicion que debe de cumplir y el elemento 1 es el mensaje de error que se va a enviar en caso de que no se cumpla la condicion.
  email: [(value)=>{ return value.includes('@')},'El correo debe de tener un @'],
  password: [(value)=>{return value.length >= 6} ,'El password debe de tener mas de 6 caracteres'],
  displayName: [(value)=>{return value.length >= 1} ,'El nombre es obligatorio'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch() 
  const [formSubmitted,setformSubmitted]=useState(false)
  const {status,errorMessages}= useSelector((state)=> {
      return state.auth
  })

  //para bloquear el boton de registrar memorizo el status
const isCheckingAuthentication=useMemo( ()=> {
  return status ==="checking" //devolvera true o false
} ,[status])

  const {formState,displayName,email,password,onInputChange,isFormValid,displayNameValid,emailValid,passwordValid} = useForm(formData,formValidations)

  
  const onSubmit=(event)=> {
    event.preventDefault()
    setformSubmitted(true)
    if(!isFormValid) return // si el formulario no es valido se sale de la funcion
    dispatch(startCreatingUserWithEmailPassword(formState))
    //console.log(formState)
  }

  //console.log({displayNameValid,emailValid,passwordValid})

  return (
    
    <Authlayout title={"Crear una cuenta"}>
      <h1>Formulario: {(isFormValid)? 'Valido' : 'Incorrecto' }</h1>
<form onSubmit={(e)=>{
      return onSubmit(e);
}} className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
          <Grid item xs={12} sx={{mt: 2}}>
              <TextField
              label="Nombre Completo"
              type="text"
              placeholder='Ingrese su nombre'
              fullWidth
              name="displayName"
              value={displayName}
              onChange={(e)=> {
                return onInputChange(e.target);
              }}
               error={ (displayNameValid !== null && formSubmitted) ? true : false}
               helperText={displayNameValid}
              />
            </Grid>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField
              label="correo"
              type="email"
              placeholder='correo@google.com'
              fullWidth
              name="email"
              value={email}
              onChange={(e)=> {
                return onInputChange(e.target);
              }}
              error={ (emailValid !== null  && formSubmitted) ? true : false}
               helperText={emailValid}
              />
            </Grid>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField
              label="contraseña"
              type="password"
              placeholder='contraseña'
              fullWidth
              name="password"
              value={password}
              onChange={(e)=> {
                return onInputChange(e.target);
              }}
              error={ (passwordValid !== null  && formSubmitted) ? true : false}
              helperText={passwordValid}
              />
            </Grid>

            <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
            <Grid item xs={12}
            display={(!errorMessages) ? 'none' : ''}//si errorMessage es null es porque no hubo error. de manera predeterminada no se tiene que mostrar. Un valor null en una evaluacion es false
            >
                <Alert severity='error'>{errorMessages}</Alert>
              </Grid>
              
              
              <Grid item xs={12}>
                <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth>
                  Crear Cuenta
                </Button>
              </Grid>
              
            </Grid>
            <Grid container direction='row' justifyContent='end'>
              {/* Este Link es un componente de material UI */}
              {/* El componente que le da la funcionabilidad de un Link es LinkRouter que es un alias del componente Link de React-router-dom */}
              <Typography sx={{mr: 1}}>Ya tienes cuenta?</Typography>
              <Link component={LinkRouter} color='inherit' to="/auth/login">
              Ingresar
              </Link>
              
            </Grid>
          </Grid>
        </form>
    </Authlayout>
)
}