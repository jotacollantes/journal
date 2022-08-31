import { createSlice } from '@reduxjs/toolkit';


export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved:'',
        notes:[],
        active:null,
        // active: {
        //     id:"ABCDE",
        //     title:'',
        //     body:'',
        //     date:123456,
        //     imageUrls: []
        // }
    },
    reducers: {
        savingNewNote: (state)=>{
            state.isSaving=true
        },
        addNewEmptyNote: (state, action ) => {
            //añado una nueva nota al estado state
            state.notes.push(action.payload)
            state.isSaving=false
            
        },
        setActiveNote: (state, action ) => {
            state.active=action.payload
            state.messageSaved="";
        },
        setNotes: (state, action ) => {
            state.notes=action.payload
        },
        setSaving: (state) => {
            state.isSaving=true;
            state.messageSaved="";
            //TODO: mensaje de error
            
        },
        updateNote: (state, action ) => {
            state.isSaving=false;

            //const {id,title,body,date}=action.payload
            //console.log("propiedades ",{id,title,body,date})
            //console.log(action)
            //console.log(action.payload)
            state.notes=state.notes.map((note,index)=>{
              if(note.id === action.payload.id)
              {
                //  return state.notes[index]=
                //  {
                //     id: id,
                //     title: title, 
                //     body:  body,
                //     date:  date,
                //     imageUrls: []
                // }
                return action.payload
              } 
              return note     
            })
            state.messageSaved=`${action.payload.title}, actualizado exitosamente.`
            
        },
        setPhotosToActiveNote: (state,action)=> {
          //Hago el append de las imagenes actuales con las nuevas  
          state.active.imageUrls=[...state.active.imageUrls,...action.payload]
          state.isSaving=false; 
        },
        clearNotesLogout: (state,action)=>{
            state.isSaving=false; 
            state.messageSaved='';
            state.notes=[];
            state.active=null;
        },


        deleteNoteById: (state, action ) => {
            //console.log('id',action.payload)

            state.notes=state.notes.filter((note)=>{
                return note.id !==action.payload
            })
              state.messageSaved=`Nota ${action.payload}, eliminada exitosamente.`
              //console.log(state.notes)
              state.active=null
            
        }
    }
});


// Action creators are generated for each case reducer function
export const { savingNewNote,addNewEmptyNote,setActiveNote,setNotes,setSaving,updateNote,deleteNoteById,setPhotosToActiveNote,clearNotesLogout } = journalSlice.actions;