<script>
import Intro from './Intro.svelte';
import GameComponent from './Game.svelte';
import { game } from './store';
import Game from './core';
const start = () => game.set(new Game());
</script>

{#if !!$game}
  <GameComponent />
{:else}
  <Intro on:start={start} />
{/if}