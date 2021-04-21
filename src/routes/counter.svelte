<script lang="ts">
  import Counter from '$lib/Counter/index.svelte';
</script>

<svelte:head>
	<title>Counter</title>
</svelte:head>

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
</style>