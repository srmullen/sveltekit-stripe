import Stripe from 'stripe';
import { env } from '$env/dynamic/private';

const ENV_MODE = import.meta.env.MODE;

const API_KEY =
	ENV_MODE === 'development' ? env.STRIPE_SECRET_KEY_TEST : env.STRIPE_SECRET_KEY_PROD;

export const stripe = new Stripe(API_KEY, {
	apiVersion: '2023-10-16'
});
