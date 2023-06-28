import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducers/productreducer'

const AppContext = createContext();

const getLocalCartData = () => {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
  };
  

const initialState = {
    cart: getLocalCartData(),
    total_item: "",
    total_amount: ""
}

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const add = (name, company, price, product) => {
        dispatch({type: "ADD_TO_CART", payload: {name, company, price, product}})
    }

    const removeItem = (name) => {
        dispatch({type: "REMOVE_ITEM", payload: name})    
    }

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART'})
    }

    useEffect(() => {
        dispatch({type: 'CART_TOTAL_PRICE'})
        localStorage.setItem("cart", JSON.stringify(state.cart))
    }, [state.cart])

    return <AppContext.Provider value={{...state, add, removeItem, clearCart}}>
        {children}
    </AppContext.Provider>
}

const useCartContext = () => {
    return useContext(AppContext)
}

export { AppProvider, useCartContext }