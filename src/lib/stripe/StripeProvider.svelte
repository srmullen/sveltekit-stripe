<script lang="ts">
  import { loadStripe } from '@stripe/stripe-js'
  import type { Stripe } from '@stripe/stripe-js';
  import { onMount, setContext } from 'svelte';
  const key = 'stripe';

  const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

  if (typeof STRIPE_PUBLIC_KEY !== 'string') {
    throw new Error('VITE_STRIPE_PUBLIC_KEY must be added to .env');
  }

  // ID of the connected stripe account
  export let stripeAccount: string | undefined = undefined;

  let stripe: Stripe | null;

  setContext(key, {
    getStripe: () => stripe
  });

  onMount(async () => {
    stripe = await loadStripe(STRIPE_PUBLIC_KEY);
  });
</script>

{#if stripe}
  <slot />
{/if}