
import { Link as LinkRouter } from 'react-router-dom'
import { Google } from '@mui/icons-material'
import { Alert,Button, Grid, Link, TextField, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { Authlayout } from '../layout/Authlayout'
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { checkingAuthentication,startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'

const formData={
    email: '',
    password: ''
}

const formValidations={
  //Cada propiedad tendra un arreglo donde el elemento 0 es la funcion que hace la evaluacion con la condicion que debe de cumplir y el elemento 1 es el mensaje de error que se va a enviar en caso de que no se cumpla la condicion.
  email: [(value)=>{ return value.includes('@')},'El correo debe de tener un @'],
  password: [(value)=>{return value.length >= 6} ,'El password debe de tener mas de 6 caracteres']
}

export const LoginPage = () => {
  
  const dispatch=useDispatch();
  const [formSubmitted,setformSubmitted]=useState(false)
 


  const {status,errorMessages} = useSelector((state)=> {
    return state.auth
  })
  //console.log('status',status)

  //Se memoriza, solo se vuelve  a evaluar si el status en la dependencia [status] cambia
  const isCheckingAuthentication= useMemo(() => {
    console.log(' desde Login Page isCheckingAuthentication:',status)
    return (status==='checking')//Devuelve true o false
  }, 
  [status])

  //console.log('isAuthenticating',isCheckingAuthentication)

  //const {email,password,onInputChange,formState} = useForm(formData,formValidations)
  const {formState,email,password,onInputChange,isFormValid,emailValid,passwordValid} = useForm(formData,formValidations)
  
  const onSubmit = (event)=> {
    event.preventDefault();
    //console.log('Desde el onSubmit',{email,password})
    //disptach( checkingAuthentication(email,password))
    setformSubmitted(true)
    if(!isFormValid) return // si el formulario no es valido se sale de la funcion
    //hacemos dispatch del metodo startLoginWithEmailPassword que esta en el thunk
    dispatch(startLoginWithEmailPassword(formState))
    //console.log(formState)
  }

  const onGoogleSignIn=()=>{
    //console.log('onGoogleSignIn')
    dispatch( startGoogleSignIn(email,password))
  }
 

    
  return (
    <Authlayout title={"Login"}>
<form onSubmit={(e)=>{
  return onSubmit(e)
}} className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
          <Grid item xs={12} sx={{mt: 2}}>
              <TextField
              label="correo"
              type="email"
              placeholder='correo@google.com'
              fullWidth
              name="email"
              value={email}
              onChange={(e)=>{
                return onInputChange(e.target)
              }}
              error={ (emailValid !== null && formSubmitted) ? true : false}
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
              onChange={(e)=>{
                return onInputChange(e.target)
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

              <Grid item xs={12} sm={6}>
                <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                disabled={isCheckingAuthentication}
                variant="contained"
                fullWidth
                onClick={()=>{
                  return onGoogleSignIn()
                }}
                >
                  <Google/>
                  <Typography sx={{ml: 1}}>Google</Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid container direction='row' justifyContent='end'>
              {/* Este Link es un componente de material UI */}
              {/* El componente que le da la funcionabilidad de un Link es LinkRouter que es un alias del componente Link de React-router-dom */}
              <Link component={LinkRouter} color='inherit' to="/auth/register">
              Crear una cuenta
              </Link>
              
            </Grid>
          </Grid>
        </form>
    </Authlayout>
)
}