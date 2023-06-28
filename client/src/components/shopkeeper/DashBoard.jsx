import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import styled from '@emotion/styled';
import { deleteUser, getProducts, postProduct } from '../../Service/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import Error from '../Error';
import ErrorPage from '../ErrorPage';

const MainBox = styled(Box)`
    background-color: #F0FFF0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
`

    const Upload = styled(Box)`
        background-color: #fff;
        height: 100px;
        width: 80vw;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &:hover {
            background-color: #D1FFBD;
        }
    `

    const InputBox = styled(Box)`
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        cursor: pointer;
    `

    const Main = styled(Box)`
        height: 100px;
        display: flex;
        border: 1px solid black;
        display: flex;
        justify-content: center;
        width: 50%;
        margin: 10px;
        background-color: #fbfbfb;
        &:hover {
            background-color: #fff;
        }
    `

    const BtnSec = styled(Box)`
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin-right: 50px;
    `
    const Thumbnail = styled(Box)`
        height: 80px;
        width: 150px;
    `
    const id = localStorage.getItem("id")
    const initialValues = {
        name: '',
        images: [],
        price: '',
        description: '',
        warranty: '',
        company: '',
        reviews: '',
        shopkeeper: ''
    }

const DashBoard = () => {
    const [open, setOpen] = React.useState(false);
    const [submit, setSubmit] = useState(initialValues);
    const [response, setResponse] = useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const {params} = useParams()
    useEffect(() => {
        const random = () => getProducts(params).then(function(result) {
            console.log(result.data);
            setResponse(result.data);
        })
        random();
    }, [])



    const onInputChange = (e) => {
        setSubmit({ ...submit, [e.target.name]: e.target.value});
        if (e.target.name === "images") {
            setSubmit({ ...submit, [e.target.name]: e.target.value, images: [...e.target.files]});
        }
        console.log(submit);
    }

    const uploadProducts = async () => {
        const data = new FormData();
        data.append('name', submit.name)
        console.log(submit.name);
        submit.images.forEach((image, index) => {
            data.append('images[]', image)
        })
        data.append('price', submit.price)
        data.append('description', submit.description)
        data.append('warranty', submit.warranty)
        data.append('company', submit.company)
        data.append('reviews', submit.reviews)
        data.append('shopkeeper', id)
        try {
          let res = await postProduct({data, params});
          setOpen(false);
          setResponse(res.data)
          console.log(res.data);
        //   setSignup(signupInitialValues)
          toast.success('Posted')
        } catch (error) {
          console.log(error);
        }
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            path: data.get('images'),
        });
      };

      
      const navigate = useNavigate();
      const clickToDtails = (e) => {
        navigate(`/details/${e._id}`)
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

      if (typeof response === 'undefined') {
        return(
            <h1>
                Loading...
            </h1>
        )
      }
    
      const deleteP = async (e) => {
        try {
            let result = await deleteUser({params, e});
            setResponse(result.data)
          } catch (error) {
            console.log(error);
          }
      }
    
  return (
    <MainBox>
        <Upload>
            <AddCircleOutlineIcon fontSize='large'  onClick={handleClickOpen} style={{ color: "#00B000", cursor:"pointer" }}/>
            <Typography style={{ color: "#00B000" }}>Upload A Product</Typography>
            <Dialog open={open} onClose={handleClose}>
            <Box component="form" onSubmit={handleSubmit} noValidate encType="multipart/form-data">
                <DialogTitle>Fill the product's information</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            required
                            id="name"
                            label="Product Name"
                            name='name'
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => onInputChange(e)}
                        />
                        <input
                            autoFocus
                            margin="dense"
                            required
                            id="name"
                            label="Upload Only 4 Images"
                            name='images'
                            type="file"
                            multiple
                            variant="standard"
                            onChange={(e) => onInputChange(e)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            required
                            label="Price of Product in Rs"
                            name='price'
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => onInputChange(e)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            required
                            label="Description"
                            name='description'
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => onInputChange(e)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Warranty"
                            name='warranty'
                            type="text"
                            fullWidth
                            required
                            variant="standard"
                            onChange={(e) => onInputChange(e)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Company"
                            name='company'
                            required
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => onInputChange(e)}
                        />
                    </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => uploadProducts()}>Submit</Button>
                <ToastContainer />
                </DialogActions>
            </Box>
        </Dialog>
        </Upload>
        {
            response ? response.map((data, key) => (
              <Main key={data._id}>
                  <InputBox>
                      {data.images && <Thumbnail component='img' src={`http://localhost:3000/${data.images[0]}`} />}
                      <Typography>Name: {data.name}</Typography>
                  </InputBox>
                  <BtnSec>
                    <Button onClick={() => clickToDtails(data)}>Edit</Button>
                    <Button onClick={() => deleteP(data)}>Delete</Button>
                  </BtnSec>
            </Main>
            )) : 'Loading...'
          }
    </MainBox>
  )
}

export default DashBoard