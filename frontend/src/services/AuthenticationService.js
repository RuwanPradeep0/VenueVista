import axios from "axios";

const endPointAuth = "http://localhost:8080/api/v1/auth";

// Check whether the email is type og name@eng.jfn.ac.lk

const isValidEmail = (email) => {
  // const validEmailRegex = /^[a-zA-Z0-9]+@eng\.jfn\.ac\.lk$/;
  // const blockedEmailRegex = /^\d{4}e\d{3}@eng\.jfn\.ac\.lk$/;

  // return validEmailRegex.test(email) && !blockedEmailRegex.test(email);
  return true;
};

//Register a lecturer
const registerLecturer = async (formData) => {
  try {
    if (!isValidEmail(formData.email)) {
      throw new Error("Invalid email format");
    }
    console.log(formData);

    const user = await axios.post(endPointAuth + "/register", formData);
    console.log(user);
    return true;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || error.message);
  }
};

//log a lecturer to the system
const login = async (email, password) => {
  try {
    const { data } = await axios.post(endPointAuth + "/authenticate", {
      email,
      password,
    });
    console.log(data)
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to login to system: Server error"
      );
    } else if (error.request) {
      throw new Error("No response received from the server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("Request failed to be sent");
    }
  }
};



const registerStudent = () =>{

}

export { registerLecturer, login ,registerStudent };
