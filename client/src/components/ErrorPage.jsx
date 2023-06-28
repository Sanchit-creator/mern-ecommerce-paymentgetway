import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('user')
    const checkIfCustomer = () => {
      const user = localStorage.getItem('user')
      return user === 'user' ? true : false
    }
    const isCustomer = checkIfCustomer();

  return (
    <div>
      <h1>Error</h1>
      <p>Oops! Something went wrong.</p>
      {
        user ? 
        <Button onClick={() => {isCustomer ? navigate(`/home/${localStorage.getItem('id')}`) : navigate(`/dashboard/${localStorage.getItem('params')}`)}}>Go Back</Button>
        : <Button onClick={() => navigate('/')}>Go Back</Button>
      }
      
    </div>
  )
};

export default ErrorPage;