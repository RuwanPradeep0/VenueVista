import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerLecturer, login } from '../../services/AuthenticationService';
import { setUser } from '../../utills';
import FeedbackMessage from '../feedbackMessage/FeedbackMessage';
import styles from '../../styles/Auth.module.scss'



const Auth = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(true);
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userRole: 'lecturer',
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
       
        if (formData.userRole === 'lecturer' || formData.userRole === 'instructor') {
          const user = await registerLecturer(formData);
          if (user) {
            setFeedback({ message: 'Registration successful!', type: 'success' });
            setIsRegister(!isRegister);
          }
         
        } else {
          throw new Error('Student registration is not allowed.');
        }
      } else {
        setFeedback({ message: '', type: '' });
        const response = await login(formData.email, formData.password);
        setUser(response)
        navigate('/');
        setFeedback({ message: 'Login successful!', type: 'success' });
      }
    } catch (error) {
      setFeedback({ message: error.message, type: 'error' });
      
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
                placeholder='First Name'
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
                placeholder='Last Name'
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
              placeholder='Name@eng.jfn.ac.lk'
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
              placeholder='Password'
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {isRegister && (
            <div className={styles.inputGroup}>
              <label htmlFor="userRole">User Type:</label>
              <select
                id="userRole"
                name="userRole"
                value={formData.userRole}
                onChange={handleInputChange}
                required
              >
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>
          )}
          <button type="submit" className={styles.submitButton}>
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <div className={ styles.toggleLink}>
          {isRegister
            ? 'Already have an account? '
            : "Don't have an account? "}
          <span onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Login' : 'Register'}
          </span>
          <FeedbackMessage
            message={feedback.message}
            type={feedback.type}
            duration={5000}
          />
        </div>
      </div>
    </div>
  
      
    </div>
  )
}

export default Auth
