<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ fetch }) {
    const res = await fetch('/plans.json');
    const plans = await res.json();
    console.log(plans);
    return {
      status: 200,
      props: {
        plans
      }
    };
  }
</script>

<script lang="ts">
	import Pricing from '$lib/Pricing/index.svelte';
	import StripeProvider from '$lib/stripe/StripeProvider.svelte';

	export let plans;
</script>

<svelte:head>
	<title>Pricing</title>
</svelte:head>

<StripeProvider>
	<section>
		<h2>Choose your plan and start counting!</h2>
		<Pricing {plans} />
	</section>
</StripeProvider>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h2 {
		color: var(--heading-color);
		font-weight: bold;
		font-size: 2rem;
	}
</style>
