const Razorpay = require("razorpay");
const catchAsyncError = require("../middlewares/catchAsyncError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment  = catchAsyncError(async(req, res, next) => {
      const paymentIntent = await stripe.paymentIntents.create({
          amount: req.body.amount,
          currency: "inr",
          description: "Flower Haven PAYMENT",
          metadata: { integration_check: "accept_payment"},
          shipping: req.body.shipping
      })

      res.status(200).json({
          success: true,
          client_secret: paymentIntent.client_secret
      })
  })

  exports.sendStripeApi  = catchAsyncError(async(req, res, next) => {
      res.status(200).json({
          stripeApiKey: process.env.STRIPE_API_KEY
      })
  })

// exports.processPayment = catchAsyncError(async (req, res, next) => {
//   try {
//     const instance = new Razorpay({
//       key_id: process.env.KEY_ID,
//       key_secret: process.env.KEY_SECRET,
//     });
//     const options = {
//       amount: req.body.amount * 100,
//       currency: "INR",
//       receipt: crypto.randomBytes(10).toString("hex"),
//     };

//     instance.orders.create(options, (error, order) => {
//       if (error) {
//         console.log(error);
//         return res.status(500).json({
//           message: "Error creating order",
//         });
//       }
//       res.status(200).json({ data: order });
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       message: "Internal Server Error",
//     });
//   }
// });

// exports.verifyPayment = catchAsyncError(async (req, res, next) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       req.body;

//     const sign = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSign = crypto
//       .createHmac("sha256", process.env.KEY_SECRET)
//       .update(sign.toString())
//       .digest("hex");

//     if (razorpay_signature === expectedSign) {
//       res.status(200).json({ message: "Payment Verification Success" });
//     } else {
//       res.status(400).json({ message: "Payment Verification Failure " });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       message: "Internal Server Error",
//     });
//   }
// });
