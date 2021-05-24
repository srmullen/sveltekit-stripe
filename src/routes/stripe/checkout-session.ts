import type { Request, Response } from '@sveltejs/kit';
import stripe from './_stripe';

export async function post(req: Request<any, { priceId: string }>): Promise<Response> {
	if (typeof req.body.priceId !== 'string') {
		return {
			status: 400,
			body: {
				error: {
					message: 'priceId is required'
				}
			}
		};
	}

	const priceId = req.body.priceId;

	try {
		const session = await stripe.checkout.sessions.create({
			mode: 'subscription',
			payment_method_types: ['card'],
			line_items: [
				{
					price: priceId,
					quantity: 1
				}
			],
			success_url: `http://${req.host}/counter?sessionId={CHECKOUT_SESSION_ID}`,
			cancel_url: `http://${req.host}/`
		});
		return {
			status: 200,
			body: {
				sessionId: session.id
			}
		};
	} catch (err) {
		return {
			status: 500,
			body: {
				error: err
			}
		};
	}
}
