import {jwtDecode} from 'jwt-decode';

export const checkUser = (token)=>{

    const userDetails = jwtDecode(token);
  
    const user = {
        email: userDetails.email,
        username: userDetails.sub
      };

      localStorage.setItem('user', JSON.stringify(user));
   

}