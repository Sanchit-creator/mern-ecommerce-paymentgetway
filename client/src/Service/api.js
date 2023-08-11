import axios from 'axios'
const URL = 'https://ecommerce-backend-o61s.onrender.com'

export const signUpShopkeeper = async(data) => {
    try {
        return await axios.post(`${URL}/api/business/register-shopkeeper`, data)
    } catch (error) {
        console.log('Error while calling signup api', error.response.data);
    }
}

export const signInShopkeeper = async(data) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }
        const result = await axios.post(`${URL}/api/business/login`, data, config)
        return result.data;
    } catch (error) {
        console.log('Error while calling signin api', error.response.data);
    }
}

export const postProduct = async ({data, params}) => {
    try {
        const config = {
            headers: {
                Authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                'Content-Type': 'multipart/form-data',
            }
        }
        return await axios.post(`${URL}/api/business/upload/${params}`, data, config);
    } catch (error) {
        console.log('Error', error.response.data);
    }
}

export const signUpUser = async(data) => {
    try {
        return await axios.post(`${URL}/api/user/register-user`, data)
    } catch (error) {
        console.log('Error while calling signup api', error.response.data);
    }
}

export const signInUser = async(data) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }
        const result = await axios.post(`${URL}/api/user/login`, data, config)
        return result.data;
    } catch (error) {
        console.log('Error while calling signin api', error.response.data);
    }
}

export const getProducts = async (data) => {
    try {
        const config = {
            headers: {
                Authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        return await axios.get(`${URL}/api/business/products/${data}`, config);
    } catch (error) {
        console.log('Error', error.response.data);
    }
}

export const singleProducts = async (data) => {
    try {
        const config = {
            headers: {
                Authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        return await axios.get(`${URL}/api/business/single/${data}`, config);
    } catch (error) {
        console.log('Error', error.response.data);
    }
}

export const editProduct = async ({paramsone, signup}) => {
    try {
        const config = {
            headers: {
                Authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        return await axios.patch(`${URL}/api/business/update/${paramsone}`, signup, config);
    } catch (error) {
        console.log('Error', error.response.data);
    }
}

export const deleteUser = async ({params, e}) => {
    try {
        const config = {
            headers: {
                Authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        return await axios.post(`${URL}/api/business/delete/${params}`, e, config);
    } catch (error) {
        console.log('Error', error.response.data);
    }
}

export const getClientProducts = async() => {
    try {
        const config = {
            headers: {
                Authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        return await axios.get(`${URL}/api/user/products`, config);
    } catch (error) {
        console.log('Error', error.response.data);
    }
}

export const getDetail = async(data) => {
    try {
        const config = {
            headers: {
                Authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        return await axios.get(`${URL}/api/user/product/${data}`, config);
    } catch (error) {
        console.log('Error', error.response.data);
    }
}

export const postReview = async({paramsthree, review}) => {
    try {
        const config = {
            headers: {
                Authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        return await axios.post(`${URL}/api/user/post/${paramsthree}`, review, config);
    } catch (error) {
        console.log('Error', error.response.data);
    }
}

export const payment = async (e) => {
    try {
        const config = {
            headers: {
                Authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
        const amount = { total_amount: e };
        return await axios.post(`${URL}/api/user/checkout`, amount, config);
    } catch (error) {
      console.error(error);
      // Handle error, display an error message, or redirect the user
    }
  };




