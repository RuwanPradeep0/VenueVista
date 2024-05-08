import axios from 'axios';

const endPointSpace = "http://localhost:8080/api/v1/spaces";

//create a space
const createSpaces = async(formData) =>{
    console.log(formData)

    try{
        const space = await axios.post(endPointSpace + '/createspaces' , formData)
    }catch(error){
        throw new Error(error.response?.data?.message || error.message);
    }
}

//get all spaces

export{createSpaces}