import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Error = () => {
  
    const navigate = useNavigate();
    const checkIfCustomer = () => {
      const user = localStorage.getItem('user')
      return user === 'user' ? true : false
    }
    const isCustomer = checkIfCustomer();
    return (
      <div>
        <h1>Error</h1>
        <p>Oops! Something went wrong.</p>
        <Button onClick={() => {isCustomer ? navigate(`/home/${localStorage.getItem('id')}`) : navigate(`/dashboard/${localStorage.getItem('id')}`)}}>Go Back</Button>
      </div>
    );
}

export default Error