export const fileUpload=async(file)=> {
    if (!file) throw new Error('No hay archivo para cargar')
    const cloudUrl='https://api.cloudinary.com/v1_1/j2systems/upload'
    //Usamos una instancia de FormData que nos permite crear pares de valores key/value
    const formData= new FormData();
    formData.append('upload_preset','react-journal');
    formData.append('file',file);
    try {
        // usamos el fetch de JS
        const resp= await fetch(cloudUrl,{
          method: 'POST',
          body: formData  
        })
        //console.log(resp);
        if(!resp.ok) throw new Error('No se pudo subir imagen')
        // si todo sale bien
        const {secure_url} = await resp.json()
        //console.log(secure_url)
        return secure_url
    } catch (error) {
        console.log(error)
        throw new Error(error.message)        
    }
}