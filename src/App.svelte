<script>
import Intro from './Intro.svelte';
import { isPlaying } from './store';

const play = () => isPlaying.set(true);
</script>

{#if $isPlaying}
  <h1>Game</h1>
{:else}
  <intro on:start={play} />
{/if}