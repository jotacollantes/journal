import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/";
import { checkingCredentials, logout,login } from "./authSlice";

export const checkingAuthentication=(email,password)=> {
    //retorno la funcion async
   
    return async (dispatch)=>{
        return dispatch(checkingCredentials())
           
    }

}


export const startGoogleSignIn=()=> {
    //retorno la funcion async
   //console.log("Desde startGoogleSignIn")
    return async (dispatch)=>{
        dispatch(checkingCredentials())
        const result= await singInWithGoogle()
        //console.log(result)
        if(!result.ok)
         {
            //Con el return se ejecuta el dispatch y se termina la ejecucion
            return dispatch(logout(result)) 
         }
         dispatch(login(result)) 
           
    }

}

export const startCreatingUserWithEmailPassword = ({email,password,displayName})=> {
    return async (dispatch)=> {
        dispatch(checkingCredentials())
        const {ok,uid,photoURL,errorMessage} = await registerUserWithEmailPassword({email,password,displayName});
        //console.log('Desde el thunk: ',resp)
        //si hubo un error al crear el usuario se hace el dispath del logout definido en el slice
        if(!ok) return dispatch(logout({errorMessage}))
        //ejecuto el dispatch de la accion login definido en el slice y recibe como parametros los datos devueltos por firebase para establecerlos en el state 
        dispatch( login({uid,displayName,email,photoURL}))
    } 

}
export const startLoginWithEmailPassword =({email,password}) => {

    return async (dispatch) => {
        console.log('entro a starLogin')
        dispatch(checkingCredentials())
        const {ok,uid,photoURL,displayName,errorMessage} = await loginWithEmailPassword({email,password})
        if(!ok) return dispatch(logout({errorMessage: errorMessage})) //si da error se ejecuta el logou y se sale de la funcion
        dispatch(login({uid,displayName,email,photoURL}))

    }

}
export const startLogout=() => {
    return async(dispatch) => {
    await logoutFirebase()
    dispatch(clearNotesLogout())
    dispatch(logout())        
    }
}