import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"

export const loadNotes=async(uid='')=>{
    if(!uid) throw new Error ('El UID del usuario no existe')

    //Creamos la referencia a las notas
    const collectionref = collection(FirebaseDB,`${uid}/journal/notes`)
    const docs= await getDocs(collectionref)
    //console.log(docs)
    const notes =[];
    docs.forEach(doc => {
        //con la funcion docs.data() del documento puedo recuperar o ver los datos la nota
        //return console.log(doc.data())
        //el id se muestra en un nivel superior de la respuesta por ese motivo creamos un nuevo array del objeto.
        
        notes.push({id: doc.id,...doc.data()})
        
        
    });
    //console.log(notes)
    return notes;
}