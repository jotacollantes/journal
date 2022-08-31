
//import { async } from "@firebase/util"
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { fileUpload, loadNotes } from "../../journal/helpers"
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice"


export const startNewNote=()=>{
    return async (dispatch,getState) => {

        //para deshabilitar el boton de añadir nota
        dispatch(savingNewNote())
        //obtener uid del usuario del space auth del space auth del store
        const {uid}=getState().auth
        
        
        //Se inicializa la nueva nota
        const newNote={
            title:'',
            body:'',
            date: new Date().getTime()
        }
        //Hay que contruir el path de la nota por usuario
        // uid/journal/notes
        //Creamos la referencia al punto ../../notes
        const newDoc=doc(collection(FirebaseDB,`${uid}/journal/notes`))
        await setDoc(newDoc,newNote)
        //Mutamos en objeto newNote
        newNote.id=newDoc.id
        
        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))

    }
}
export const startLoadingNotes=() => {
    return async(dispatch,getState)=> {
        //obtener uid del usuario del space auth del space auth del store
        const {uid}=getState().auth
        if (!uid) throw new Error('El uid del usuario no existe') 
        //console.log('desded startLoadingNotes',{uid})
        const notas= await loadNotes(uid)
        dispatch(setNotes(notas))

    }

}

export const startSaveNote= ()=>{
    return async (dispatch,getState)=>
    {
        dispatch(setSaving())
        //Obtengo el uid
        const {uid} = getState().auth;
        //Obtengo la Nota activa
        //La propiedad se llama active pero le cambiamos el nombre a note
        const {active:note} = getState().journal;
        // Como la note incluye la propiedad id si se envia a firebase intentara graba la nota con ese id.
        // Se debe de enviar la note sin el ID
        const noteToFirestore={...note}
        //delete remueve una propiedad de un objeto
        delete noteToFirestore.id;
        
        //console.log(noteToFirestore)

        //creamos la referencia al documento
        const docRef= doc(FirebaseDB,`${uid}/journal/notes/${note.id}`)
        //sobrescribimos el documento en la referencia especificada
        await setDoc(docRef,noteToFirestore,{merge: true})

        // const noteSidebar ={
        //     id: note.id,
        //     ...noteToFirestore

        // }
        //console.log(noteSidebar)

        //Usamos note que es la nota activa que incluye el id y los datos actualizados
        dispatch(updateNote(note))

    }
}

export const startUpLoadingFiles=(files=[])=> {
    return async(dispatch,getState) => {
        dispatch(setSaving())
        //console.log(files)
        //fileUpload(files[0])
        
        //Creo un arreglo de promesas para luego ejecutarlas todas juntas
        const fileUploafPromise=[]
        for (const file of files) {
            //Comienzo a llenar el arreglo con cada una de las promesas sin ejecutarlas
            fileUploafPromise.push(fileUpload(file))
        }
        //console.log(fileUploafPromise)
        //Creo una variable que va a recibir el arreglo creado por la ejecucion en lote del Promise.all
        const photosUrls=await Promise.all(fileUploafPromise)
        //console.log(photosUrls)
        dispatch(setPhotosToActiveNote(photosUrls))
    }
}
export const startDeletingNote=()=> {
    return async(dispatch,getState) => {
        const {uid}=getState().auth;
        const {active: note}=getState().journal;
        //console.log({uid,note})
        //creamos la referencia al documento
        
        const docRef= doc(FirebaseDB,`${uid}/journal/notes/${note.id}`)
        await deleteDoc(docRef)
        dispatch(deleteNoteById(note.id));
        
    }
}

export const startDeletingImage=(image)=>{
    return async(dispatch,getState) => {

        //Borramos de Cloudinary

        //Borramos de Firebase

        //Actualizamos el store
    }
}
