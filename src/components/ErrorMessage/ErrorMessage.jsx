import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export const ErrorMessage = ({ isVisible }) => {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000); // Set the duration in milliseconds

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <MessageContainer style={{ display: visible ? 'block' : 'none' }}>
      <p className="error-message">
        Don't stress trying to un-stress. 3 tasks a day is enough to make a difference
      </p>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 999;

  .error-message {
    color: red;
    margin: 0;
  }
`;
