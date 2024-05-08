import {jwtDecode} from 'jwt-decode';

export const checkUser = (token)=>{

    const userDetails = jwtDecode(token);
  
    const user = {
        email: userDetails.email,
        username: userDetails.sub
      };

      localStorage.setItem('user', JSON.stringify(user));
   
}



export const getTimeString = (time) => {
  const hour = Math.floor(time / 100);
  const minutes = time % 100;
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  }).format(
    new Date(
      `2000-01-01T${hour.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`
    )
  );
};

export const generateColorCode = () =>{

}

export const getDateInYearFormat = () =>{
  
}