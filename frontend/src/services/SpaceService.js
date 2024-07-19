import axios from 'axios';

const endPointSpace = "http://localhost:8080/api/v1/spaces";

//create a space
const createSpaces = async (requestBody) => {
    console.log("working");
    try {
      const createSpace = await axios.post(endPointSpace + '/createspaces', requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      if (error.response) {
       
        throw new Error(error.response.data.message || 'Failed to create space: Server error');
      } else if (error.request) {
       
        throw new Error('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error('Request failed to be sent');
      }
    }
  };


  //get all spaces
  const getAllSpaces = async(setSpaces)=>{
    try{

     const response = await axios.get(endPointSpace + '/getallspaces');
     setSpaces(response?.data);
     return response.data;
    


    }catch(error){
      
      if(error.response)
        {
          throw new Error(error.response.data.message  || 'Failed to create space: Server error' )
        }else if (error.request) {
       
          throw new Error('No response received from the server');
        } else {
          // Something happened in setting up the request that triggered an Error
          throw new Error('Request failed to be sent');
        }
      
    }

  }

   const deleteSpace = async() =>{

  }



export{createSpaces , getAllSpaces ,deleteSpace} 