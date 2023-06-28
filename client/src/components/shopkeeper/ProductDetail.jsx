import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { editProduct, singleProducts } from '../../Service/api';
import { Box, Button, Grid, TextField, TextareaAutosize } from '@mui/material';
import styled from '@emotion/styled';
import Error from '../Error';
import ErrorPage from '../ErrorPage';

const Content = styled(Box)`
    display: flex;
    height: 80vh;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 50vw;
`

const Main = styled(Box)`
    display: flex;
    justify-content: center;
    width: 100vw;
`

const Img = styled(Box)`
    height: 150px;
    width: 250px;
    margin: 10px
`

const ProductDetail = () => {
    const [interviewData, setInterviewData] = useState();
    const [signup, setSignup] = useState({});
    const { paramsone } = useParams();


    
    
    useEffect(() => {
        const random = () => singleProducts(paramsone).then(function(result) {
            console.log(result.data);
            setInterviewData(result.data);
        })

        random();
    }, [])

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value});
    }

    const signupUser = async () => {
        try {
          let res = await editProduct({paramsone, signup});
          if (res) {
            setInterviewData(res.data)
          }
        } catch (error) {
          console.log(error);
        }
      }

      const checkIfSHopkeeper = () => {
        const user = localStorage.getItem('user')
        return user === 'shopkeeper' ? true : false
      }
      const isShopkeeper = checkIfSHopkeeper();

      if (!isShopkeeper) {
        return(
            <ErrorPage />
        )
      }


    if (typeof interviewData === 'undefined') {
        return (
            <h1>Loading...</h1>
        )
    }

  return (
    <Main component="form" noValidate >
        <Content>
        <TextField
          required
          id="outlined-disabled"
          label="Name"
          onChange={(e) => onInputChange(e)}
          defaultValue={interviewData.name}
          name='name'
        /> 
        <TextField
          required
          id="outlined-disabled"
          label="Name"
          onChange={(e) => onInputChange(e)}
          defaultValue={interviewData.price}
          name='price'
        /> 
        <TextField
          required
          id="outlined-disabled"
          label="Name"
          onChange={(e) => onInputChange(e)}
          defaultValue={interviewData.company}
          name='company'
        /> 
        <TextField
            minRows="1"
            required
            id="outlined-disabled"
            label="Name"
              onChange={(e) => onInputChange(e)}
            defaultValue={interviewData.description}
            name='description'
        /> 
         <TextField
          minRows="1"
          required
          id="outlined-disabled"
          label="Name"
          onChange={(e) => onInputChange(e)}
          defaultValue={interviewData.warranty}
          name='warranty'
        /> 
        <Grid item xs={12} sm={6}>
        {
            interviewData.images.map((data, key) => (
                <Img 
                    key={key}
                    component="img"
                    disabled
                    required
                    id="outlined-disabled"
                    label="Adhaar Photo One"
                    src={`http://localhost:3000/${data}`}
                />
            ))
        }
        </Grid>
         <Grid item xs={12} sm={6}>
            <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => signupUser()}
                >
                    Save
            </Button> 
        </Grid>
    </Content>
    </Main>
  )
}

export default ProductDetail