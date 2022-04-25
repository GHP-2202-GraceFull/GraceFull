import React, { useReducer, useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setCart, total } from "../store/cart"
// import { checkoutCart } from "../store/checkout"
// import user from TODO: create action creator/thunk for user info

const initialFormState = {
    //TODO: should pull user info on useEffect
    // cartId: cart.id,
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

    // let cart = useSelector((state) => {
    //     return state.cart
    // })
    //TODO: load cart, waiting on Cart update
    //TODO: load line items and calculate total 

    // const dispatch = useDispatch();

    // useEffect(()=>{
    //     dispatch(setCart)
    // }, [])

    // console.log(cart)


    //checkout grabs users cart (same setCart reducer) bring is as prop?
    //calculates total (same total reducer) bring in as prop?
    //checkout take in shipping info in a form
    //on submit, checkout send to store shipping info
    //thunk updates the order from CART to ORDER, add shipping info and total

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
        console.log(formState)
        // dispatch(checkoutCart(formState))
    }

    return (
        <div>
            <h3>Checkout</h3>
            <h4> __ items in cart</h4>
            <h4> total: $__ </h4>
            <a href='/cart'>Return to cart</a>
            <form onSubmit={handleSubmit}>
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

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Checkout;


