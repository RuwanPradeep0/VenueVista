import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { registerLecturer, login } from '../../services/AuthenticationService';
import { setUser } from '../../utills';
import FeedbackMessage from '../feedbackMessage/FeedbackMessage';
import styles from '../../styles/Auth.module.scss';
import Hero from '../Hero';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminLogin = location.pathname === '/admin-login';
  const [isRegister, setIsRegister] = useState(!isAdminLogin);
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userRole: isAdminLogin ? 'admin' : 'lecturer',
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
            setIsRegister(false);
          }
        } else {
          throw new Error('Student registration is not allowed.');
        }
      } else {
        setFeedback({ message: '', type: '' });
        const response = await login(formData.email, formData.password);
        setUser(response);
        navigate('/');
        setFeedback({ message: 'Login successful!', type: 'success' });
      }
    } catch (error) {
      setFeedback({ message: error.message, type: 'error' });
    }
  };
 
  return (

    <div>
      {isRegister? <Hero

            spanText="Register or "
            title="Login"
            description="Register or login as a lecturer or instructor"
      
      
      /> : <Hero
      spanText="Admin "
          title="Login"
          description="Login as an admin and manage the system"
      />}

  
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          {isRegister && !isAdminLogin && (
            <>
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
            </>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder={isAdminLogin ? 'Admin Email' : 'Name@eng.jfn.ac.lk'}
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
          {isRegister && !isAdminLogin && (
            <div className={styles.inputGroup}>
              <label htmlFor="userRole">User Type:</label>
              <select
                id="userRole"
                name="userRole"
                value={formData.userRole}
                onChange={handleInputChange}
                required
              >
                <option value="lecturer">Lecturer</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>
          )}
          <button type="submit" className={styles.submitButton}>
            {isAdminLogin ? 'Login' : (isRegister ? 'Register' : 'Login')}
          </button>
        </form>
        {!isAdminLogin && (
          <div className={styles.toggleLink}>
            {isRegister
              ? 'Already have an account? '
              : "Don't have an account? "}
            <span onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? 'Login' : 'Register'}
            </span>
          </div>
        )}
        <FeedbackMessage
          message={feedback.message}
          type={feedback.type}
          duration={5000}
        />
      </div>
    </div>
    </div>
  );
};

export default Auth;