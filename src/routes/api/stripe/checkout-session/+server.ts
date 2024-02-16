import type { RequestHandler } from '@sveltejs/kit';
import { stripe } from '$lib/stripe/stripe';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async  ({ request }) => {
    console.log('Received request to create Stripe Session...');
        
	const body = await request.json();
    const priceId = body.priceId;
    const host = request.headers.get('host');

    try {
        console.log('Creating a Stripe session...')
            const session = await stripe.checkout.sessions.create({
                mode: 'subscription',
                // payment_method_types: ['card'],
                billing_address_collection: 'auto',
                line_items: [
                    {
                        price: priceId,
                        quantity: 1
                    }
                ],
                success_url: `http://${host}/counter?sessionId={CHECKOUT_SESSION_ID}`,
                cancel_url: `http://${host}/`                
            });

        return json({ status: 200, message: 'Success', stripeSessionUrl: session.url});
           
        
    } catch (error) {
        const message = (error instanceof Error) ? error.message : 'Unknown error';
        return json({ status: 500, message: message });
    }
};