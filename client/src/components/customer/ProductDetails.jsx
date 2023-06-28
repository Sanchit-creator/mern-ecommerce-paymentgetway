import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { getDetail, postReview } from '../../Service/api';
import { Box, Button, Input, Typography } from '@mui/material';
import styled from '@emotion/styled';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useCartContext } from '../context/productcontext';
import SendIcon from '@mui/icons-material/Send';
import Error from '../Error';
import ErrorPage from '../ErrorPage';

const MainSection = styled(Box)`
  width: 100wv;
  height: 80vh;
  display: flex;
  justify-content: center;
`

const ImageSection = styled(Box)`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
`

const Description = styled(Box)`
  width: 50%;
`
const DetailBox = styled(Box)`
  display: flex;
  justify-content: start;
`


const MainImage = styled(Box)`
  width: 500px;
  height: 280px
`

const LeftArrow = styled(ChevronLeftIcon)`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  left: 5%;
  font-size: 45px;
  color: black;
  z-index: 1;
  cursor: pointer
`

const RightArrow = styled(ChevronRightIcon)`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 55%;
  font-size: 45px;
  color: black;
  z-index: 1;
  cursor: pointer
`

const Reviews = styled(Box)`
  display: flex;
  padding-left: 100px;
  justify-content: start;
  align-items: center;
`

const Upload = styled(Box)`
  width: inherit;
  height: 30px;
  width: 20vw;
  border-radius: 5px
`

const ReviewsSection = styled(Box)`
  width: 40vw;
  display: flex;
  padding-left: 100px;
  justify-content: start;
  align-items: center;
`

const ReviewBorder = styled(Box)`
  border-bottom: 1px solid black;
  width: inherit;

`


const ProductDetails = () => {
    const [detail, setDetail] = useState()
    const [currntIndex, setCurrntIndex] = useState(0);
    const [review, setReview] = useState('')
    const {add} = useCartContext();
    const { paramsthree } = useParams();
    const inputChange = (e) => {
      setReview({...review, [e.target.name]: e.target.value})
    }
    useEffect(() => {
        const random = () => getDetail(paramsthree).then(function(result) {
            setDetail(result.data);
            console.log(result.data);
        })

        random();
    }, [])

    const goToPrevious = () => {
      const isFirstSlide = currntIndex === 0
      const newIndex = isFirstSlide ? detail.images.length - 1 : currntIndex -1;
      setCurrntIndex(newIndex)
    }
    const navigate = useNavigate();

    const addToCart = (e) => {
      navigate(`/cart`)
      add(e.name, e.company, e.price, e)
    }

    const submitReview = async() => {
      try {
        let res = await postReview({paramsthree, review});
        setDetail(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    const goToNext = () => {
      const isLastSlide = currntIndex === detail.images.length - 1
      const newIndex = isLastSlide ? 0 :currntIndex + 1
      setCurrntIndex(newIndex)
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
  

    if (typeof detail === 'undefined') {
      return (
        <h1>Loading...</h1>
      )
    }

    
  return (
    <>
      <MainSection>
      <ImageSection>
        <LeftArrow onClick={goToPrevious}/>
        <RightArrow onClick={goToNext}/>
        <MainImage component='img' src={`http://localhost:3000/${detail.images[currntIndex]}`}/>
      </ImageSection>
      <Description>
        <DetailBox component="h1">{detail.name}</DetailBox>
        <DetailBox component="h3">Company: {detail.company}</DetailBox>
        <Typography component="h3" style={{opacity: 0.5}}>Description:{detail.description}</Typography>
        <DetailBox component="h3" style={{opacity: 0.5}}>Warranty: {detail.warranty}</DetailBox>
        <DetailBox component="h2">Price: Rs.{detail.price}</DetailBox>
        <Button onClick={() => addToCart(detail)} style={{backgroundColor: '#00B000', color:'white'}}size="large">Add To Cart</Button>
      </Description>
      </MainSection>
      <Reviews component="form" noValidate>
        <Upload component='input' placeholder='Add review...' name='reviews' onChange={(e) => inputChange(e)} />
        <Button onClick={() => submitReview()} style={{backgroundColor: '#00B000', color:'white'}}><SendIcon /></Button>
      </Reviews>
      {
        detail && detail.reviews.map((review, key) => (
          <ReviewsSection key={key}>
            <ReviewBorder>
              <Typography>Anonymous User: {review}</Typography>
            </ReviewBorder>
          </ReviewsSection>
        ))
      }
    </>
  )
}

export default ProductDetails