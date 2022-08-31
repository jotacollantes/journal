import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

//Creamos una nueva instancia de la funcion GoogleAuthProvider
const googleProvider = new GoogleAuthProvider();
export const singInWithGoogle= async() => {

try {
    const result =await signInWithPopup(FirebaseAuth,googleProvider);
    //const credentials = GoogleAuthProvider.credentialFromResult(result);
    //console.log({credentials})
    
    const {displayName,email,photoURL,uid}=result.user;
    //console.log({displayName,email,photoURL,uid})
    return {
        ok: true,
        displayName :displayName,
        email: email,
        photoURL: photoURL,
        uid: uid
    }

    
} catch (error) {
    //console.log(error)
    //De la documentacion de google firebase authentication
    const errorCode=error.code;
    const errorMessage=error.message;
    return {
        ok: false,
        errorMessage: errorMessage
    }
}

}

export const registerUserWithEmailPassword = async ({email,password,displayName})=>
{
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth,email,password)
        const {uid,photoURL} =resp.user;
        console.log('desde el provider: ',resp)
        //actualizamos el displayName con el metodo de firebase/auth updateProfile. recibe como parametro el usuario actual creado/autenticado. La funcion updateProfile no devuelve nada por eso no se asigna a una variable
        await updateProfile(FirebaseAuth.currentUser, {displayName: displayName})

        return {
            ok:true,
            uid: uid,
            photoURL: photoURL,
            email: email,
            displayName: displayName
        }
        
    } catch (error) {
        //console.log(error)
        return {
            ok: false,
            errorMessage:error.message
        }
    }
} 



    export const loginWithEmailPassword = async ({email,password}) => {

        try {
            const resp =await signInWithEmailAndPassword(FirebaseAuth,email,password)
            console.log('loginWithEmailPassword : ',resp) 
            const {uid,photoURL,displayName} =resp.user;
            return {
                ok:true,
                uid: uid,
                photoURL: photoURL,
                email: email,
                displayName: displayName
            }
            
        } catch (error) {
            return {
                ok: false,
                errorMessage:error.message
            }
        }
    }
export const logoutFirebase = async() => {

   
    return await FirebaseAuth.signOut()
    
    
}