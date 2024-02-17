/***
 *
 * If you are testing with the CLI, find the secret by running 'stripe listen --forward-to localhost:5173/api/stripe/webhook'
 * If you are using an endpoint defined with the API or dashboard, look in your webhook settings at https://dashboard.stripe.com/webhooks
 *
 ***/

import type Stripe from 'stripe';

import { env } from '$env/dynamic/private';
import { stripe } from '$lib/stripe/stripe';
import { json } from '@sveltejs/kit';

const ENV_MODE = import.meta.env.MODE;

async function doSomethingWithEvent(
	stripeCustomerId: string,
	event: Stripe.Event,
	revenue?: number
) {
	// Update this with your own event handling code. For instance, you could trigger and email to the customer, update the database with the user's subscrption status, fire an analytics event, etc.
	console.log(`Handling ${event.type} webhook for Stripe customer ${stripeCustomerId}.`);
	console.log(`Revenue: ${revenue ? `$${revenue}` : `N/A`}`);
	// Do something...
}

export async function POST({ request }) {
	console.log('*** WEBHOOK RECEIVED ***');

	const body = await request.text();
	const signature = request.headers.get('stripe-signature') || '';

	const endpointSecret =
		ENV_MODE === 'development' ? env.STRIPE_WEBHOOK_SECRET_TEST : env.STRIPE_WEBHOOK_SECRET_PROD;

	let stripeEvent: Stripe.Event;

	try {
		stripeEvent = stripe.webhooks.constructEvent(body, signature, endpointSecret);
	} catch (error) {
		return json({ status: 400, error: `Webhook Error: ${error}` });
	}

	// Get the stripeCustomerId (can be helpful for looking up the user in your database, e.g. you store the Stripe customer ID in your user metadata. Then you can protect app routes if the user doesn't have an active subscription in Stripe).
	const stripeCustomerId =
		'customer' in stripeEvent.data.object
			? (stripeEvent.data.object.customer as Stripe.Customer['id'])
			: null;

	if (!stripeCustomerId) {
		console.log('No Stripe customer ID found.');
		console.log(stripeEvent);
	}

	if (stripeCustomerId) {
		switch (stripeEvent.type) {
			case 'customer.subscription.created':
				console.log('Event: customer.subscription.created');

				// Then define and call a function to handle the stripeEvent customer.subscription.created
				doSomethingWithEvent(stripeCustomerId, stripeEvent);

				break;
			case 'customer.subscription.deleted':
				console.log('Event: customer.subscription.deleted');

				// Then define and call a function to handle the stripeEvent customer.subscription.deleted
				doSomethingWithEvent(stripeCustomerId, stripeEvent);

				break;
			case 'customer.subscription.paused':
				console.log('Event: customer.subscription.paused');

				// Then define and call a function to handle the stripeEvent customer.subscription.paused
				doSomethingWithEvent(stripeCustomerId, stripeEvent);

				break;
			case 'customer.subscription.resumed':
				console.log('Event: customer.subscription.resumed');

				// Then define and call a function to handle the stripeEvent customer.subscription.resumed
				doSomethingWithEvent(stripeCustomerId, stripeEvent);

				break;
			case 'customer.subscription.trial_will_end':
				console.log('Event: customer.subscription.trial_will_end');

				// Then define and call a function to handle the stripeEvent customer.subscription.trial_will_end
				doSomethingWithEvent(stripeCustomerId, stripeEvent);

				break;
			case 'customer.subscription.updated':
				console.log('Event: customer.subscription.updated');

				// Then define and call a function to handle the stripeEvent customer.subscription.updated
				doSomethingWithEvent(stripeCustomerId, stripeEvent);

				break;
			case 'payment_intent.succeeded':
				console.log('Event: payment_intent.succeeded');
				const revenue = stripeEvent.data.object.amount_received / 100;

				doSomethingWithEvent(stripeCustomerId, stripeEvent, revenue);

				break;
			default:
				console.log(`Unhandled stripeEvent type ${stripeEvent.type}`);
		}
	}
	// Return a 200 response to acknowledge receipt of the stripeEvent
	return json({ status: 200 });
}
