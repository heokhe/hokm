<script>
import Intro from './Intro.svelte';
import Game from './Game.svelte';
import { isPlaying } from './store';
</script>

{#if $isPlaying}
  <Game />
{:else}
  <Intro on:start={() => isPlaying.set(true)} />
{/if}