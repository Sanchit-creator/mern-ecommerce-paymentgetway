import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../images/logo.png'
import styled from '@emotion/styled';


const Img = styled(Box)`
  visibility: visible;
  height: 20px;
  width: 20px
`

const Contain = styled(Box)`
    height: 5vh;
    width: 95vw; 
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    bottom:0;
    left: 0;
    padding-top: 5vh;
`

export default function Footer() {

  return (
    <>
        <Contain>
            <Img component='img' src={logo} />
            <Typography style={{opacity: 0.5}} color="black" component="p" variant="caption" gutterBottom={false}>All Rights reserved Copyright @ecom 2023</Typography>
        </Contain>
    </>
  );
}