const express = require('express');
const { processPayment, sendStripeApi, verifyPayment } = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/authenticate');
const router = express.Router();

router.route('/payment/process').post(isAuthenticatedUser, processPayment);
router.route('/stripeapi').get(sendStripeApi);


// router.route('/payment/process').post(isAuthenticatedUser,processPayment);
// router.route('/payment/verify').post(isAuthenticatedUser,verifyPayment);

module.exports = router;