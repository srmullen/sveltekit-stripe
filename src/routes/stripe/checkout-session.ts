import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"], {
  apiVersion: '2020-08-27'
});

type Request<Context = any> = {
  host: string;
  method: 'GET';
  headers: Record<string, string>;
  path: string;
  params: Record<string, string | string[]>;
  query: URLSearchParams;
  // body: string | Buffer | ReadOnlyFormData;
  body: any;
  rawBody: any;
  context: Context; // see getContext, below
};

type Response = {
  status?: number;
  headers?: Record<string, string>;
  body?: any;
};

export async function post(req: Request): Promise<Response> {
  if (typeof req.body.priceId !== 'string') {
    return {
      status: 400,
      body: {
        error: {
          message: 'priceId is required'
        }
      }
    }
  }

  const priceId = req.body.priceId;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1
      }],
      success_url: 'http://localhost:3000/dashboard?sessionId={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/pricing'
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
    }
  }
}