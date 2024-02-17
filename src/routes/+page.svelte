<script lang="ts">
	import Pricing from '$lib/components/Pricing.svelte';

	import plans from './plansData.json';
</script>

<svelte:head>
	<title>Pricing</title>
</svelte:head>

{#if plans}
	<section>
		<h2>Choose your plan and start counting!</h2>

		<Pricing {plans} />
	</section>
{/if}

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
