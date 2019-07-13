<script>
import Intro from './Intro.svelte';
import GameComponent from './Game.svelte';
import { game } from './store';
import Game from './core';
</script>

{#if !!$game}
  <GameComponent />
{:else}
  <Intro on:start={() => $game = new Game()} />
{/if}