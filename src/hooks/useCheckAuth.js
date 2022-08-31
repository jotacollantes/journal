import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FirebaseAuth } from "../firebase/config"
import { login, logout } from "../store/auth"
import { startLoadingNotes } from "../store/journal/thunks"





export const useCheckAuth = () => {
 
  const {status} =useSelector((state) => {
    return state.auth
})
//en el caso del useDispatch no necesito desestructurar porque ya uso la funcion dispatch que es lo que me devuelve el useDispatch
const dispatch=useDispatch()
useEffect(() => {
  //La funcion onAuthStateChanged de Firebase es de tipo observable que obervara cambios en el estado del SignIn y renovara cada sesion del usuario
  onAuthStateChanged(FirebaseAuth, async (user)=>{
    if (!user) {
      return dispatch(logout());
    }
    const {uid,email,displayName,photoURL} =user
    dispatch(login({uid,email,displayName,photoURL}))
    //Para cargar las notas del usuario grabadas eb firebase
    dispatch(startLoadingNotes())

  })  
}, [])
//El status No necesito enviarlo como objeto al componente AppRouter que va a usar el customHook. Ojo tambie puedo enviarlo como objeto y desestructurarlo en el component que use el customhook 
return {status: status}
}







