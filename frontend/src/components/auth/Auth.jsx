import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerLecturer, login } from '../../services/AuthenticationService';
import { checkUser } from '../../utills';
import styles from '../../styles/Auth.module.scss'


const Auth = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: 'lecturer',
  });

  
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        if (formData.userType === 'lecturer') {
          const user = await registerLecturer(formData);
          navigate('/');
        } else {
          throw new Error('Student registration is not allowed.');
        }
      } else {
        const token = await login(formData.email, formData.password);
        checkUser(token)
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

 
  
  return (
    <div>
    <div className={styles.container}>
      <div className={styles.formContainer}>

        <h2>{isRegister ? 'Register' : 'Login'}</h2>

        <form onSubmit={handleSubmit}>

          {isRegister && (
            <div className={styles.inputGroup}>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          
        {isRegister && (
            <div className={styles.inputGroup}>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          )}


          <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {isRegister && (
            <div className={styles.inputGroup}>
              <label htmlFor="userType">User Type:</label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                required
              >
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
              </select>
            </div>
          )}
          <button type="submit" className={styles.submitButton}>
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <div className={isRegister ? styles.toggleLink : undefined}>
          {isRegister
            ? 'Already have an account? '
            : "Don't have an account? "}
          <span onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Login' : 'Register'}
          </span>
        </div>
      </div>
    </div>
  
      
    </div>
  )
}

export default Auth
