import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { checkout } from "../store/checkout"

//talk to Nikki/Danbee about adding total to car subreducer

const Checkout = () => {
    const [ values, setValues ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        streetAddress: '',
        city: '',
        state: '',
        zip: ''
    })

    const dispatch = useDispatch();

    const handleChange = event => {
        event.persist();
        setValues((values)=>({
            // ...values,
            // firstName: event.target.value
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = event => {
        event.preventDefault;
        console.log(values)
        // dispatch(checkout(values))
    }

    return (
        <div>
            <h3>Checkout</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input name="firstName" onChange={handleChange} value={values.firstName} />

                <label htmlFor="lastName">Last Name</label>
                <input name="lastName" onChange={handleChange} value={values.lastName} />

                {/* <label htmlFor="email">Email</label>
                <input name="email" onChange={handleChange} value={values.email} />

                <h3>Shipping Address</h3>

                <label htmlFor="streetAddress">Street Address</label>
                <input name="streetAddress" onChange={handleChange} value={values.streetAddress} />

                <label htmlFor="city">City</label>
                <input name="city" onChange={handleChange} value={values.city} />

                <label htmlFor="state">State</label>
                <input name="state" onChange={handleChange} value={values.state} />

                <label htmlFor="zip">zip</label>
                <input name="zip" onChange={handleChange} value={values.zip} /> */}
            </form>
        </div>
    )
}

export default Checkout;


