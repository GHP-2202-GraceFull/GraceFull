import React, { useReducer, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom"
import { setCart } from "../store/cart"
import { checkoutCart } from "../store/checkout"


//laurynn TODO: validation for email

const initialFormState = {
    //TODO: should pull user info on useEffect
    firstName: '',
    lastName: '',
    email: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: ''
}

const formReducer = (state, action) => {
    switch (action.type) {
        case "HandleChange":
            return { ...state, [action.field]: action.payload};
        default:
            return state;
    }
}


const Checkout = () => {

    const [submitted, setSubmitted] = useState(false)

    let cart = useSelector((state) => {
        return state.cartReducer
    })

    const total = cart.reduce(
        (accum, item) => accum + (item.product.price * item.quantity || 0),
        0.00
      );

      const totalCartCount = cart.reduce(
        (accum, item) => accum + (item.quantity || 0),
        0
      );

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setCart())
    }, [])



    //checkout take in shipping info in a form

    //on submit, checkout sends shipping infor to store
    //thunk sends shipping info to route, which calls user method
    //updates the order from CART to ORDER,
    //add shipping info and total to order
    //
     //stripe info

    const [formState, localDispatch ] = useReducer(formReducer, initialFormState);


    const handleChange = (e) => {
        localDispatch({
            type: "HandleChange",
            field: e.target.name,
            payload: e.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault;
        dispatch(checkoutCart(formState)) 
        setSubmitted(true)
    }

    return (
        <div>
            <h3>Confirm shipping address:</h3>
            <h4> {totalCartCount}  {totalCartCount === 1 ? "item in cart" : "items in cart"}</h4>
            <h4> total: ${total.toFixed(2)} </h4>
            <a href='/cart'>Return to cart</a>
            <form onSubmit={handleSubmit} >
                <label htmlFor="firstName">First Name</label>
                <input name="firstName" onChange={handleChange} value={formState.firstName} />

                <label htmlFor="lastName">Last Name</label>
                <input name="lastName" onChange={handleChange} value={formState.lastName} />

                <label htmlFor="email">Email</label>
                <input name="email" onChange={handleChange} value={formState.email} />

                <h4>Shipping Address</h4>

                <label htmlFor="streetAddress">Street Address</label>
                <input name="streetAddress" onChange={handleChange} value={formState.streetAddress} />

                <label htmlFor="city">City</label>
                <input name="city" onChange={handleChange} value={formState.city} />

                <label htmlFor="state">State</label>
                <input name="state" onChange={handleChange} value={formState.state} />

                <label htmlFor="zip">zip</label>
                <input name="zip" onChange={handleChange} value={formState.zip} />

                <button type="submit">Checkout</button>
            </form>
            {submitted && (<Redirect to="/thankyou" />)}
        </div>
    )
}

export default Checkout;


