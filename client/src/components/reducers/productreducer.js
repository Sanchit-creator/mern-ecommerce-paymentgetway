import React from 'react'

const productreducer = (state, action) => {
    if (action.type === "ADD_TO_CART") {
        let { name, company, price, product } = action.payload;
        let cartProduct;
        cartProduct = {
            name: name,
            company: company,
            price: price
        }
        return {
            ...state,
            cart: [...state.cart, cartProduct],
        };
    }
    if (action.type === "REMOVE_ITEM") {
        let updatedCart = state.cart.filter((currItem) => currItem.name !==  action.payload)
        return {
            ...state,
            cart: updatedCart
        }
    }

    if (action.type === 'CLEAR_CART') {
        return {
            ...state,
            cart: [],
        }
    }

    if (action.type === 'CART_TOTAL_PRICE') {
        if (state.cart === null) {
            return state;
        }
        let total_amount = state.cart.reduce((initialValue, currElem) => {
            let {price } = currElem;
            initialValue = JSON.parse(initialValue) + JSON.parse(price);
            return initialValue;
        }, 0)
        return {
            ...state,
            total_amount: total_amount
        };
    }
    return state;
}

export default productreducer