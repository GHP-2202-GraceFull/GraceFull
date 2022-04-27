const path = require('path')
const stripe = require("stripe")("sk_test_51KstzdB1O300sa0zm08lWU4lmbeUhmEQBJTvlfDKnpPuv4WrkIia8owGOZCrjSjXzD6AzPHdGLCnUoJIPoVo2R2i00P9IK4HCm")
const express = require('express')
const morgan = require('morgan')
const app = express()
module.exports = app


// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json())

// auth and api routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))
// app.use('/payment', require('./payment'))
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `localhost:8080?success=true`,
    cancel_url: `localhost:8080?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', 'public/index.html')));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
})

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})
