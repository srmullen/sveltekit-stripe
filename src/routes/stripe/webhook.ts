import type { Request, Response } from '@sveltejs/kit';
import stripe from './_stripe';

const WEBHOOK_SECRET = process.env['STRIPE_WEBHOOK_SECRET'];

export async function post(req: Request<any, { data: any; type: any }>): Promise<Response> {
	let data;
	let eventType;
	if (WEBHOOK_SECRET) {
		let event;
		const signature = req.headers['stripe-signature'];
		try {
			event = stripe.webhooks.constructEvent(req.rawBody as string, signature, WEBHOOK_SECRET);
			data = event.data;
			eventType = event.type;
		} catch (err) {
			return {
				status: 500,
				headers: {},
				body: JSON.stringify({
					error: err
				})
			};
		}
	} else {
		data = req.body.data;
		eventType = req.body.type;
	}

	switch (eventType) {
		case 'checkout.session.completed':
			// Payment is successful and the subscription is created.
			// You should provision the subscription and save the customer ID to your database.
			console.log('Event: checkout.session.completed');
			break;
		case 'invoice.paid':
			// Continue to provision the subscription as payments continue to be made.
			// Store the status in your database and check when a user accesses your service.
			// This approach helps you avoid hitting rate limits.
			console.log('Event: invoice.paid');
			break;
		case 'invoice.payment_failed':
			// The payment failed or the customer does not have a valid payment method.
			// The subscription becomes past_due. Notify your customer and send them to the
			// customer portal to update their payment information.
			console.log('Event: invoice.payment_failed');
			break;
		default:
		// Unhandled event type
	}

	return {
		status: 200,
		headers: {},
		body: JSON.stringify({
			message: 'Success'
		})
	};
}
