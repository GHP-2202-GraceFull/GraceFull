const router = require("express").Router();
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


//mounted on /payment
router.post('/checkout', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: '$100',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `/success=true`,
      cancel_url: `/canceled=true`,
    });
  
    res.redirect(303, session.url);
  });

  module.exports = router