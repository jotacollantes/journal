import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        //counter: 10
        status:'checking',//'checking', 'not-authenticated', 'authenticated'
        uid: null,
        email: null,
        displayName: null,
        photoURL:null,
        errorMessages:null
    },
    reducers: {
        login: (state,{payload})=>{
        //console.log('desde login reducer:',{payload})
        state.status ='authenticated';//'checking', 'not-authenticated', 'authenticated'
        state.uid= payload.uid;
        state.email= payload.email;
        state.displayName= payload.displayName;;
        state.photoURL=payload.photoURL;
        state.errorMessages=null
        },
        logout: (state,{payload})=>{
        //console.log('desde logout reducer:',payload.errorMessage)
        state.status ='not-authenticated';//'checking', 'not-authenticated', 'authenticated'
        state.uid= null;
        state.email= null;
        state.displayName= null;
        state.photoURL=null;
        //console.log("Tiene Payload?: ",payload?.errorMessage)
        state.errorMessages=payload?.errorMessage// con payload? evalua, si es que viene el payload busca el errorMessage caso contrario no hace nada
        },
        checkingCredentials:(state)=>{
            state.status='checking'
        }
    }
});


// Action creators functions are generated for each case reducer function
export const { login,logout,checkingCredentials } = authSlice.actions;