declare var require: any;
declare var process: any;
declare var exports: any;

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const { amount } = JSON.parse(event.body);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ statusCode: 500, message: error.message }),
    };
  }
};
