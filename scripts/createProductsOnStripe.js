import Stripe from 'stripe';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27'
});

const plans = [
	{
		product: {
			name: 'Free Plan',
			description: 'The bare minimum.'
		},
		price: {
			currency: 'usd',
			unit_amount: 0,
			recurring: {
				interval: 'month'
			}
		},
		includes: [
			'A number starting at 0',
			'A "plus" button',
			'A "minus" button',
			'Infinite button clicks'
		]
	},
	{
		product: {
			name: 'Basic Plan',
			description: 'The basic services.'
		},
		price: {
			currency: 'usd',
			unit_amount: 1000,
			recurring: {
				interval: 'month'
			}
		},
		includes: [
			'All the features in the free plan.',
			'You get to pay money for it.',
			'Lifetime support'
		]
	},
	{
		product: {
			name: 'Premium Plan',
			description: 'Everything in the basic plan and then some.'
		},
		price: {
			currency: 'usd',
			unit_amount: 1500,
			recurring: {
				interval: 'month'
			}
		},
		includes: ['All the features of the basic plan', 'A sense of superiority', 'Nothing else']
	}
];

async function main() {
	await Promise.all(
		plans.map(async (plan) => {
			// Only create the product if it's not free
			if (plan.price.unit_amount > 0) {
				const product = await stripe.products.create(plan.product);
				const price = await stripe.prices.create({
					...plan.price,
					product: product.id
				});
				console.log(`${plan.product.name} id: ${product.id}`);
				plan.product.id = product.id;
				plan.price.id = price.id;
			}
		})
	);
	fs.writeFileSync(
		path.join(path.resolve(path.dirname('')), './src/routes/plansData.json'),
		JSON.stringify(plans, null, 2),
		'utf8'
	);
	console.log('Products created');
}

main()
	.then(() => {
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
