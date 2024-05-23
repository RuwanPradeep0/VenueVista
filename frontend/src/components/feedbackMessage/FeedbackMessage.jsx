import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import styles from './FeedbackMessage.module.scss';

const FeedbackMessage = ({ message, type, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  const renderIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className={styles.icon} />;
      case 'error':
        return <FiAlertCircle className={styles.icon} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={classNames(
        styles.feedbackMessage,
        styles[`feedbackMessage--${type}`],
        isVisible && styles['feedbackMessage--visible']
      )}
    >
      <div className={styles.messageContainer}>
        {renderIcon()}
        <span className={styles.messageText}>{message}</span>
      </div>
    </div>
  );
};

export default FeedbackMessage;