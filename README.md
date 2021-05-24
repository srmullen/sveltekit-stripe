# SvelteKit Stripe Integration

The SvelteKit demo template comes with an awesome counter application built in. It would be better though if it was a subscription SAAS counter. That's what this repo does.

**Check it out at https://sveltekit-stripe.netlify.app/.**

This demo application implements subscriptions using [SvelteKit](http://kit.svelte.dev/) and [Stripe Checkout](https://stripe.com/payments/checkout).
[It is based on this guide.](https://stripe.com/docs/billing/subscriptions/checkout)

## How to use.

First you need to have an account on [Stripe](https://stripe.com/).

- Clone or fork the project
  `git clone https://github.com/srmullen/sveltekit-stripe.git`

- Install the dependencies
  `cd sveltekit-stripe && npm install`

- Rename `.env.example` to `.env` and update with your Stripe public and private api keys. You can get them from the Stripe dashboard.

- Create products and prices on Stripe, using the script provided by this repo.
  `npm run stripe:init`
  This script creates the Stripe entities needed for a subscription billing model and writes them to a json file that will be loaded by a SvelteKit endpoint. You can also create the entites needed by using the Stripe dashboard, [following this section of the guide](https://stripe.com/docs/billing/subscriptions/checkout#create-business-model).

- Start up the development server
  `npm run dev`

### Stripe Webhooks

This repo contains a SvelteKit endpoint for Stripe Webhook events.

To test the hook locally see this guide https://stripe.com/docs/webhooks/test

The stripe webhook endpoint is https://localhost:3000/stripe/webhook. That is where you'll want to forward stripe events.

Verify webhook signatures by adding STRIPE_WEBHOOK_SECRET to your .env file.

## See the demo

https://sveltekit-stripe.netlify.app

(Read more about the implementation here.)[https://www.srmullen.com/articles/sveltekit-stripe-integration]
