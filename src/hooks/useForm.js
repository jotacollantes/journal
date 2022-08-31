import { useEffect, useMemo, useState } from "react"

export const useForm = (initialForm={},formValidations={}) => {
    const [formState, setFormState] = useState(initialForm)
    //const {username,email,password}= formState
    //console.log("Form", formState)

    const [formValidation,setFormValidation]=useState({})

    //Se va a ejecutar cada vez que el formState cambie
    useEffect(() => {
      //console.log('Entra al useEffect',formValidations)
      createValidators();
    }, [formState])



       //Se va a ejecutar cada vez que el initialForm cambie o sea cuanto se activa una nota nueva
       useEffect(() => {
       setFormState(initialForm);
      }, [initialForm])
    

    //Va a memorizar la respuesta y solo se ejecutara la funcion cuando el formValidation cambie
    const isFormValid = useMemo(() => {
          for (const nameField of Object.keys(formValidation)) {
                 if(formValidation[nameField] !==null) // o Sea si tiene un mensaje de error
                 {
                    return false; //Ya no continua con la iteracion y devuelve false
                 }
          }
          return true;

    }, [formValidation])


    const onInputChange=({name,value})=> {//Desestructure el e.target
        //console.log('UseForm:',{name,value})
        setFormState({
            ...formState,//mantener los valores del formulario
            [name]:value //Propiedades computadas de los objetos o sea si name tiene el input username actualizara con el value del input username si el name tiene el input del email actualizara el email

        })
    }

    const onResetForm=()=>{
        setFormState(initialForm)
    }

    const createValidators = () => {
      const formCheckedValues={};
      //Con esta iteracion voy a tener los nombres de las propiedades del objeto formValidations
      for (const formField of Object.keys(formValidations)) {
        //se imprime: email,password,displayName
        //console.log('Desde Createvalidator:', formField)
        const [fn,errorMessage]=formValidations[formField]
        //Se asigna propiedas al objeto formCheckedValues de forma dinamica (propiedades computadas)
        formCheckedValues[`${formField}Valid`]=fn(formState[formField])? null: errorMessage
      }
      setFormValidation(formCheckedValues)
      //console.log({formCheckedValues})
     }
  return {
    formState,
    onResetForm,
    setFormState,
    onInputChange,
    ...formState,//Para devolver username,email,password al componente que usa el hook y que pueda ser desestructurado
    ...formValidation, // para devolver displayNameValid,emailValid,passwordValid
    isFormValid
  }
}