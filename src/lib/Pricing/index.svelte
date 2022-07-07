<script lang="ts">
	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';

	const { getStripe } = getContext('stripe');
	const stripe = getStripe();

	export let plans = [];

	function penniesToDollars(pennies: number) {
		return pennies / 100;
	}

	async function choosePlan(plan) {
		if (plan.price.id) {
			console.log(JSON.stringify({ priceId: plan.price.id }));

			const res = await fetch('/stripe/checkout-session', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ priceId: plan.price.id })
			});
			const { sessionId } = await res.json();
			stripe.redirectToCheckout({
				sessionId
			});
		} else {
			goto('/counter');
		}
	}
</script>

<section class="plans">
	{#each plans as plan}
		<div class="plan">
			<div class="top">
				<div class="about">
					<h2 class="title">
						{plan.product.name}
					</h2>
					<div class="description">
						{plan.product.description}
					</div>
				</div>
				<div class="price">
					<span class="dollars">${penniesToDollars(plan.price.unit_amount)}</span> / {plan.price
						.recurring.interval}
				</div>
				<button on:click={() => choosePlan(plan)}>Choose</button>
			</div>
			<div class="divider" />
			<div class="bottom">
				<div>Includes...</div>
				<ul>
					{#each plan.includes as feature}
						<li>{feature}</li>
					{/each}
				</ul>
			</div>
		</div>
	{/each}
</section>

<style>
	.plans {
		display: flex;
		flex-direction: column;
		color: rgb(23, 31, 31);
	}

	.plan {
		border: 1px solid black;
		border-radius: 0.5rem;
		margin: 1rem;
		width: 16rem;
		background: rgba(255, 255, 255, 0.2);
	}

	.plan .top {
		padding: 1rem 1.5rem;
	}

	.plan .bottom {
		padding: 1rem 1.5rem;
	}

	.about {
		height: 110px;
	}

	.title {
		font-size: 1.25rem;
	}

	.description {
		color: rgb(71, 97, 97);
		margin-bottom: 0.5rem;
	}

	.price {
		margin-bottom: 0.75rem;
	}

	.dollars {
		font-size: 1.5rem;
	}

	button {
		cursor: pointer;
		background: rgb(23, 31, 31);
		color: white;
		font-weight: bold;
		padding: 0.5rem 0.75rem;
		border-radius: 0.5rem;
		border: none;
		width: 100%;
		transition: background 0.2s ease-in-out;
	}

	button:hover {
		background: var(--accent-color);
	}

	button:focus {
		outline: 2px solid var(--accent-color);
		outline-offset: 2px;
	}

	.divider {
		border-top: 1px solid var(--text-color);
	}

	ul {
		color: rgb(71, 97, 97);
		padding-left: 1rem;
	}

	li {
		margin-bottom: 0.5rem;
	}

	@media (min-width: 640px) {
		.plans {
			flex-direction: row;
		}
	}
</style>
