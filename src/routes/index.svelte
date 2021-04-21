<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Pricing from '$lib/Pricing/index.svelte';
	import StripeProvider from '$lib/stripe/StripeProvider.svelte';
</script>

<svelte:head>
	<title>Pricing</title>
</svelte:head>

<StripeProvider>
	<section>
		<h2>Choose your plan and start counting!</h2>
		<Pricing />
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
