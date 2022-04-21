import React, { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { checkout } from "../store/checkout"


const initialFormState = {
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

    const itemsInCart = useSelector((state)=> state.addToCartReducer)

    const cart = !itemsInCart ? [] : itemsInCart

    console.log(cart)

    const [formState, localDispatch ] = useReducer(formReducer, initialFormState);

    const handleChange = (e) => {
        localDispatch({
            type: "HandleChange",
            field: e.target.name,
            payload: e.target.value
        })
    }

    const dispatch = useDispatch(); 

    const handleSubmit = event => {
        event.preventDefault;
        console.log(formState)
        // dispatch(checkout(values))
    }

    return (
        <div>
            <h3>Checkout</h3>
            <h4>{cart.length===0 ? "No items selected" : "Items"}</h4>
            <div>
                {cart.map((product) => {
                    <ul key={product.id}>
                        <li>{product.title}</li>
                        <li>{product.price}</li>
                    </ul>
                })}
                <h4>Order total: {cart.reduce((total,product)=> total+product.price)}</h4>
            </div>
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


