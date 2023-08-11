import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, InputBase, Typography } from '@mui/material';
import { getClientProducts } from '../../Service/api';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Error from '../Error';
import ErrorPage from '../ErrorPage';

const Image = styled(Box)`
height: 100px;
width: inherit;
object-fit: cover;
`

const ImageContainer = styled(Box)`
display: flex;
height: 100px;
justify-content: center;
`

const Main = styled(Box)`
display: grid;
grid-template-columns: auto auto auto;
grid-auto-flow: row;
grid-template-rows: auto auto auto;
grid-gap: 20px;
padding-left: 50px;
background-color: #F0FFF0;
`

const SearchBar = styled(Box)`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F0FFF0;
`

const SearchInput = styled(InputBase)`
    background-color: white;
    opacity: 0.5;
    border: 1px solid transparent;
    border-radius: 10px;
    padding-left: 5px;
`
const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const random = () => getClientProducts().then(function(result) {
        setProducts(result.data)
    })
    random();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    };
  
    filterProducts();
  }, [products, searchQuery]);
  const navigate = useNavigate();
  const detail = (e) => {
    navigate(`/product/${e._id}`)
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

  if (typeof products === 'undefined') {
    return(
      <h1>Loading...</h1>
    )
  }
 
  return (
    <>
      <SearchBar>
        <SearchInput
            placeholder="Search product…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchBar>
      <Main>
        {
          filteredProducts && filteredProducts.map((data, key) => (
            <Card sx={{ maxWidth: 345 }} key={key}>
              <ImageContainer>
                <Image component='img' src={`https://ecommerce-backend-o61s.onrender.com/${data.images[0]}`} />
              </ImageContainer>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rs.{data.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => detail(data)} style={{backgroundColor: '#00B000', color:'white'}}size="large">View</Button>
              </CardActions>
            </Card>
          ))
        }
      </Main>
    </>
  )
}

export default Home