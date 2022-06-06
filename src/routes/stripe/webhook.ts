import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import stripe from './_stripe';

// todo: orefalo - properly gatekeep this variable
const WEBHOOK_SECRET = process.env['STRIPE_WEBHOOK_SECRET'];

function toBuffer(ab: ArrayBuffer): Buffer {
	const buf = Buffer.alloc(ab.byteLength);
	const view = new Uint8Array(ab);
	for (let i = 0; i < buf.length; i++) {
		buf[i] = view[i];
	}
	return buf;
}

export const post: RequestHandler = async (event: RequestEvent) => {
	// export async function post(req: Request<any, { data: any; type: any }>): Promise<Response> {
	const req = event.request;
	// let data;
	let eventType: string;
	if (WEBHOOK_SECRET) {
		// let event;

		const _rawBody = await req.arrayBuffer();
		const payload = toBuffer(_rawBody);

		// SvelteKit may sometimes modify the incoming request body
		// However, Stripe requires the exact body it sends to construct an Event
		// To avoid unintended SvelteKit modifications, we can use this workaround:
		// const payload = Buffer.from(req.rawBody);

		const signature = req.headers.get('stripe-signature');
		try {
			const event = stripe.webhooks.constructEvent(payload, signature, WEBHOOK_SECRET);
			const data = event.data;
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
		// data = req.body.data;
		eventType = (await req.formData()).get('type').toString();
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
};
