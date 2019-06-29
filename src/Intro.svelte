<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
const start = () => dispatch('start', null)
</script>
<main class="flex items-center justify-center h-screen flex-col">
  <h1 class="text-3xl font-medium">Hokm Game</h1>
  <p class="text-gray-700 text-lg">Play it now!</p>
  <button class="bg-blue-500 hover:bg-blue-600 text-white" on:click={start}>Start</button>
</main>
