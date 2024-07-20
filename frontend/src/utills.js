import {jwtDecode} from 'jwt-decode';

export const setUser = (data)=>{

  const token = data.accessToken;
  const decodedToken = jwtDecode(token);
  const user = {
    responsibleName: decodedToken.responsibleName,
    role: decodedToken.role,
    id: decodedToken.id,
    username: decodedToken.sub,
    token: token
  };
  localStorage.setItem('user', JSON.stringify(user));
  console.log(user)
  console.log('userid' + user.id)

}


export const checkUser = (setUser, setValid, ) => {
  const storedUser = localStorage.getItem('user');

  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      // const decodedToken = jwtDecode(user.token);
      // const currentTime = Date.now() / 1000;
      // if (decodedToken.exp < currentTime) {
      //   handleLogout();
      // } else {
      //   setValid(true);
      //   setUser(user);
      setValid(true);
      setUser(user); // Set the parsed user object
      console.log(user); // Log the user object
     

    } catch (error) {
      console.error('Error decoding token:', error);
      setValid(false);
      setUser("");
    }
  } else {
    setValid(false);
    setUser("");
  }
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


export const generateColorCode = (letter) => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const index = letters.indexOf(letter.toLowerCase());
  if (index < 0) {
    throw new Error("Invalid letter");
  }

  //13.846
  const hue = (index * 30) % 360; // Generate hues based on the position of the letter in the alphabet
  return `hsl(${hue}, 30%, 55%)`; // Use HSL colors to generate vibrant and unique colors
};
