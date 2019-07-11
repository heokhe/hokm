<script>
import { onMount } from 'svelte';
import { CARD_TYPES } from './core/card';
import { game, isPlaying } from './store';
import Card from './components/Card.svelte';
import Move from './components/Move.svelte';
import GameHeader from './components/GameHeader.svelte';
import Board from './components/Board.svelte';

$: mustSelectTrumpSuite = !$game.trumpSuite;
let activeCards, base, cards = [], tricks;

onMount(() => {
  activeCards = [];
  base = null;
  cards = $game.me.availableCards;
  tricks = [0, 0];
})

$game.on('move', () => {
  cards = $game.me.availableCards;
  activeCards = $game.activeCards;
  base = $game.baseSuite;
  tricks = $game.tricks;
})

$game.on('end', ({ winner: { members: [a, b] } }) => {
  alert(`the game has ended. ${a.name} and ${b.name} won!`);
  $isPlaying = false
})
</script>

<div class="game h-screen w-screen flex flex-col">
  {#if !mustSelectTrumpSuite}
    <GameHeader {tricks} baseSuite={base} trumpSuite={$game.trumpSuite} />
  {/if}
  <Board>
    {#if mustSelectTrumpSuite}
      <h1 class="text-3xl tracking-wide font-light text-gray-800 text-center">Select a trump suite</h1>
      <div class="mt-3">
        {#each CARD_TYPES as type}
          <Card {type} clickable on:click={() => $game.trumpSuite = type} />
        {/each}
      </div>
    {:else}
      {#each activeCards as { number, type, owner }}
        <Move card={{ number, type }} bot={owner.name !== 'me'} position={$game.players.indexOf(owner)} />
      {/each}
    {/if}
  </Board>
  <section class="cards">
    {#each cards as card, i}
      {#if !mustSelectTrumpSuite || 5 > i}
        <Card number={card.number} type={card.type} on:click={() => $game.me.move(card)} clickable />
      {/if}
    {/each}
  </section>
</div>