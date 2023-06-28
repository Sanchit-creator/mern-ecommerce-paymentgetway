import React from 'react'
import ErrorPage from '../ErrorPage'
import { useParams } from 'react-router-dom'

const Payment = () => {
    const {paramsfour} = useParams();
    const checkIfCustomer = () => {
        const user = localStorage.getItem('user')
        return user === 'user' ? true : false
      }
    
    
      const isCustomer = checkIfCustomer();
    
      if (!isCustomer) {
        return(
          <ErrorPage />
        )
      }
  return (
    <div>Payment</div>   
  )
}

export default Payment