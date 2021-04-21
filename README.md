SvelteKit Stripe Integration
----------------------------

This demo application implements recurring subscriptions using SvelteKit and Stripe Checkout.

## How to use.

* Clone the project
* Install the dependencies
* Update the .env file with your Stripe public and private keys.
* Create products and prices on Stripe.
  `npm run stripe:init`

### Stripe Webhooks

This repo contains a SvelteKit endpoint for Stripe Webhook events.

To test the hook locally see this guide https://stripe.com/docs/webhooks/test

The stripe webhook endpoint is https://localhost:3000/stripe/webhook. That is where you'll want to forward stripe events.

## See the demo