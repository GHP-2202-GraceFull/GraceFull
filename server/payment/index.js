const router = require("express").Router();
const stripe = require(stripe)("sk_test_51KstzdB1O300sa0zm08lWU4lmbeUhmEQBJTvlfDKnpPuv4WrkIia8owGOZCrjSjXzD6AzPHdGLCnUoJIPoVo2R2i00P9IK4HCm")


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