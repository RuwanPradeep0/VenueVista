import axios from 'axios';

const endPointAuth = "http://localhost:8080/api/v1/auth";

// Check whether the email is type og name@eng.jfn.ac.lk

const isValidEmail = (email) => {
  const validEmailRegex = /^[a-zA-Z0-9]+@eng\.jfn\.ac\.lk$/;
  const blockedEmailRegex = /^\d{4}e\d{3}@eng\.jfn\.ac\.lk$/;

  return validEmailRegex.test(email) && !blockedEmailRegex.test(email);
};

//Register a lecturer
const registerLecturer = async (formData) => {
  try {
    if (!isValidEmail(formData.email)) {
      throw new Error('Invalid email format');
    }
    console.log(formData);

    const user = await axios.post(endPointAuth + '/register', formData);
    console.log(user)
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};


//log a lecturer to the system
const login = async (email, password) => {
  try {
    const { data } = await axios.post(endPointAuth +'/authenticate', { email, password });
    return data.token;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error logging in');
  }
};


const getAuthenticate = async() => {

}

export { registerLecturer, login ,getAuthenticate};