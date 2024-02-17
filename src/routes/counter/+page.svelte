<script lang="ts">
	import type { PageData } from '$lib/types';

	import Counter from '$lib/components/Counter.svelte';
	export let data: PageData;

	$: checkoutSuccess = data.checkoutSuccess;
</script>

<svelte:head>
	<title>Counter</title>
</svelte:head>

{#if checkoutSuccess}
	<div class="successBox">
		<h1>Thank you for your purchase!</h1>
		<p>You can now use the counter to your heart's content.</p>
	</div>
{/if}

<section>
	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
	.successBox {
		margin: 3rem auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem 1em;
		width: 50%;
		background-color: var(--success-primary);

		padding: 0rem;
		border-radius: 0.5rem;
		text-align: center;
	}
	.successBox h1,
	p {
		color: var(--success-secondary);
	}
</style>
