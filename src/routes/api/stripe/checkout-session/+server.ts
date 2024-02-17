import type { RequestHandler } from '@sveltejs/kit';
import { stripe } from '$lib/stripe/stripe';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	console.log('Received request to create Stripe Session...');

	const body = await request.json();
	const priceId = body.priceId;
	const host = request.headers.get('host');

	try {
		console.log('Creating a Stripe session...');
		const session = await stripe.checkout.sessions.create({
			// Reference: https://docs.stripe.com/api/checkout/sessions/create
			// If you have a customer ID, you can add it here. E.g. you can create the customer before creating the session, and then pass in the customerId to the session object. Stripe will pre-fill the email field on the checkout page if the customer has an email address associated with their Stripe account.
			// customer: customerId,
			// Alternatively, if you have the user's email but havent created a Customer is Stripe yet, you can pass in the customer's email address directly to the session object:
			// customer_email: userEmailAddress
			mode: 'subscription',
			payment_method_types: ['card'],
			billing_address_collection: 'auto',
			line_items: [
				{
					price: priceId,
					quantity: 1
				}
			],
			success_url: `http://${host}/counter?checkoutSuccess=true&sessionId={CHECKOUT_SESSION_ID}`,
			cancel_url: `http://${host}/`
		});

		return json({ status: 200, message: 'Success', stripeSessionUrl: session.url });
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown error';
		return json({ status: 500, message: message });
	}
};
