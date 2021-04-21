SvelteKit Stripe Integration
----------------------------

This demo application implements subscriptions using SvelteKit and Stripe Checkout. 
[It is based on this guide.](https://stripe.com/docs/billing/subscriptions/checkout)

## How to use.

First you need to have an account on [Stripe](https://stripe.com/).

* Clone or fork the project
  `git clone https://github.com/srmullen/sveltekit-stripe.git`

* Install the dependencies
  `cd sveltekit-stripe && npm install`

* Rename `.env.example` to `.env` and update with your Stripe public and private api keys. You can get them from the Stripe dashboard.

* Create products and prices on Stripe, using the script provided by this repo.
  `npm run stripe:init`
  This script creates the Stripe entities needed for a subscription billing model and writes them to a json file that will be loaded by a SvelteKit endpoint. You can also create the entites needed by using the Stripe dashboard, [following this section of the guide](https://stripe.com/docs/billing/subscriptions/checkout#create-business-model).

* Start up the development server
  `npm run dev`

### Stripe Webhooks

This repo contains a SvelteKit endpoint for Stripe Webhook events.

To test the hook locally see this guide https://stripe.com/docs/webhooks/test

The stripe webhook endpoint is https://localhost:3000/stripe/webhook. That is where you'll want to forward stripe events.

## See the demo

https://sveltekit-stripe.netlify.app