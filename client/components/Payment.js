import {withRouter} from "react-router-dom";
import { cardElement, useElements, useStripe} from '@stripe/react-stripe-js';

const Card = () => {
    const elements = useElements()
    const stripe = useStripe();
    const [messages, addMessage] = useMessages();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!stripe || !elements) {
            return;
        }
        addMessage('Creating payment intent...')

        const {clientSecret} = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentMethod: 'card',
                currency: 'usd',
            }),
        }).then(r => r.json())

     addMessage('Payment intent created');

     const {paymentIntent} = await stripe.confirmCardPayment(
         clientSecret, {
             payment_method: {
                 card: elements.getElement((cardElement)),
             }
         }
     )
    addMessage(`PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`)
    }
    return(
        <div>
            <h1> Card</h1>

            <form id = "payment-form" onSubmit={handleSubmit}>
        <label htmlFor="cart-element"> Card</label> 
            <cardElement id="card-element" />

                <button>Pay</button>
            </form>
            </div>




      )
}

// export default withRouter(Card)
export default Card






// import React, { useState, useEffect } from "react";


// const Confirm = () => (
      
//       <form action="/create-checkout-session" method="POST">
//         <button type="submit">
//           Submit payment
//         </button>
//       </form>
//   );
  
//   const Message = ({ message }) => (
//     <section>
//       <p>{message}</p>
//     </section>
//   );

//  function Payment() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);

//     if (query.get("success")) {
//       setMessage("Order placed! Thank you for shopping with Graceful.");
//     }

//     if (query.get("canceled")) {
//       setMessage(
//         "Order canceled -- continue to shop around and checkout when you're ready."
//       );
//     }
//   }, []);

//   return message 
// }

// export default Confirm;