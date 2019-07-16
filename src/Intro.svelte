<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
</script>
<main class="flex items-center justify-center h-screen flex-col bg-indigo-50 p-10 text-center">
  <h1 class="text-4xl font-medium tracking-wide">Hokm Game</h1>
  <p class="text-gray-700 text-lg tracking-tight">The classic Hokm game, right in your browser.</p>
  <button on:click={() => dispatch('start')}>Start!</button>
  <span class="text-gray-600 text-xs">(Single Player)</span>
</main>
