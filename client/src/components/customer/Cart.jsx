import React from 'react'
import { useCartContext } from '../context/productcontext'
import { Box, Button, Typography } from '@mui/material';
import styled from '@emotion/styled';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Error from '../Error';
import ErrorPage from '../ErrorPage';
import {  payment } from '../../Service/api';
import axios from 'axios';

const Main = styled(Box)`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const CartBox = styled(Box)`
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
`

const Heading = styled(Box)`
    height: 80px;
    display: flex;
    width: 90vw;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;
`

const Items = styled(Box)`
    height: 80px;
    display: flex;
    width: 90vw;
    justify-content: space-between;
    align-items: center;
`

const TextBox = styled(Box)`
    width: 20vw;
`

const Btn = styled(Box)`
    height: 100px;
    width: 90vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const TotalCost = styled(Box)`
    height: 10vh;
    min-width: 10vw;
    color: black;
    background-color: #F0FFF0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-item:center;
`

const Cart = () => {
    const {cart, clearCart} = useCartContext();
    const navigate = useNavigate();
    const {removeItem} = useCartContext();
    const {total_amount} = useCartContext();

    const submit = async (e) => {
        const {data: {key}} = await axios.get("https://ecommerce-backend-o61s.onrender.com/api/getkey")
        const res = await payment(e);
        console.log(res);

        const options = {
            key, // Enter the Key ID generated from the Dashboard
            amount: res.data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Sanchit Uppal",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: res.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: "https://ecommerce-backend-o61s.onrender.com/api/user/paymentverification",
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
            
    }
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
    if (cart.length === 0) {
        return (
            <h1>No Product added yet</h1>
        )
    }

    
    
    if (typeof cart === 'undefined') {
        return(
            <h1>Loading...</h1>
        )
    }
  return (
    <Main>
        <CartBox>
            <Heading>
                <TextBox>
                    <Typography style={{opacity: 0.5}}>Item</Typography>
                </TextBox>
                <TextBox>
                    <Typography style={{opacity: 0.5}}>Company</Typography>
                </TextBox>
                <TextBox>
                    <Typography style={{opacity: 0.5}}>Price</Typography>
                </TextBox>
                <TextBox>
                    <Typography style={{opacity: 0.5}}>Remove</Typography>
                </TextBox>
            </Heading>
            {
                cart && cart.map((data, key) => (
                    <Items key={key}>
                        <TextBox>
                            <Typography style={{opacity: 0.5}}>{data.name}</Typography>
                        </TextBox>
                        <TextBox>
                            <Typography style={{opacity: 0.5}}>{data.company}</Typography>
                        </TextBox>
                        <TextBox>
                            <Typography style={{opacity: 0.5}}>Rs.{data.price}</Typography>
                        </TextBox>
                        <TextBox>
                            <DeleteIcon fontSize='medium' onClick={()=> removeItem(data.name)}/>
                        </TextBox>
                    </Items>
                ))
            }
            <Btn>
                <Button style={{backgroundColor: '#00B000', color:'white'}} onClick={() => {navigate(`/home/${localStorage.getItem('id')}`)}}>Continue Shopping</Button>
                <Button style={{backgroundColor: '#00B000', color:'white'}} onClick={clearCart}>Clear Cart</Button>
            </Btn>
            <TotalCost>
                <h3>Total Amount: Rs.{total_amount}</h3>
                <Button style={{backgroundColor: '#00B000', color:'white'}} 
                // onClick={() => {
                //     navigate(`/payment/${total_amount}`)
                // }}
                onClick={() => submit(total_amount)}
                >Checkout</Button>
            </TotalCost>
        </CartBox>
    </Main>
  )
}

export default Cart