import {jwtDecode} from 'jwt-decode';

export const setUser = (token)=>{

    const userDetails = jwtDecode(token);
  
    const user = {
        email: userDetails.email,
        username: userDetails.sub
      };

      localStorage.setItem('user', JSON.stringify(user));
   
}

export function checkUser(setUser, setValid, handleLogout){
  
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


export const getDateInFormat = (date) => {
  // Return Date in : "weekday, Month Day" format
  const dateOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", dateOptions).format(date);
};

export const setTimeFormat = (time) => {
  const date = new Date(`January 1,2022 ${time}`);

  const hour = date.getHours();
  const minutes = date.getMinutes();

  return hour * 100 + minutes;
};

export const mapTimeStringToInteger = (timeString) => {
  /*
    >>> "9:00PM"
    2100

    >>> "9:30AM"
    2130

    >>> " 10:20 AM "
    1020

    >>> "12:30 PM"
    1230
 
 */
  const timeRegex = /^\s*(\d{1,2}):(\d{2})\s*(am|pm)\s*$/i;

  const match = timeString.match(timeRegex); 
  if (!match) {
    return false;
  }

  //in this regax there are 3 groups for 9 ,  00 ,PM/AM

  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const suffix = match[3].toLowerCase();

  if (hour < 1 || hour > 12) {
    return false;
  }

  if (minute < 0 || minute > 59) {
    return false;
  }

  //if 12:30PM --> 1230 not 2430
  if (suffix === "pm" && hour < 12) {
    hour += 12;
  }

  // console.log(hour*100 + minute)
  return hour * 100 + minute;
};


export const getDateInYearFormat = (date) => {
  return date.toLocaleDateString("sv-SE", { timeZone: "Asia/Colombo" });
};