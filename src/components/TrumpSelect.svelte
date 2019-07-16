<script>
import { createEventDispatcher } from 'svelte';
import Card from './Card.svelte';
import { CARD_TYPES as types } from '../core/card';
const dispatch = createEventDispatcher();
</script>

<h1 class="text-3xl tracking-wide font-light text-gray-800 text-center">Select a trump suite</h1>
<div class="mt-3">
  {#each types as type}
    <Card {type} clickable on:click={() => dispatch('select', type)} />
  {/each}
</div>