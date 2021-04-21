<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Pricing from '$lib/Pricing/index.svelte';
</script>

<svelte:head>
	<title>Pricing</title>
</svelte:head>

<section>
	<Pricing />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
