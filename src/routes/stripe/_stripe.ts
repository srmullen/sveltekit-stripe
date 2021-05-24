import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'], {
	apiVersion: '2020-08-27'
});

export default stripe;
