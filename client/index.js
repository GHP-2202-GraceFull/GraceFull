import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './App'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';



ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
        <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)



// document.addEventListener('DOMContentLoaded', async () => {
//   const {publishableKey} = await fetch('/config').then((r) => r.json());
//   const stripePromise = loadStripe(publishableKey);

//   ReactDOM.render(
//     <React.StrictMode>
//     <Provider store={store}>
//     <Router history={history}>
//       <Elements stripe={stripePromise}>
//         <App />
//       </Elements>
//       </Router>
//   </Provider>,
//   </React.StrictMode>,
//     document.getElementById('app')
//   );
// });