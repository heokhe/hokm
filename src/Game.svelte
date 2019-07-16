<script>
import { onMount } from 'svelte';
import { CARD_TYPES } from './core/card';
import { sortCards } from './core/utils';
import { game } from './store';
import Card from './components/Card.svelte';
import Move from './components/Move.svelte';
import GameHeader from './components/GameHeader.svelte';
import TrumpSelect from './components/TrumpSelect.svelte';
import Board from './components/Board.svelte';

let activeCards = [], base = null, cards = [], tricks = [0, 0], mustSelectTrumpSuite = true;

function init(type) {
  $game.init(type);
  mustSelectTrumpSuite = false;
}

onMount(() => {
  cards = $game.me.availableCards;
})

$game.on('move', () => {
  cards = $game.me.availableCards;
  activeCards = $game.activeCards;
  base = $game.baseSuite;
  tricks = $game.tricks;
})

$game.on('reset', () => {
  tricks = $game.tricks;
  activeCards = [];
  base = null;
})

$game.on('end', ({ winner: { members: [a, b] } }) => {
  alert(`the game has ended. ${a.name} and ${b.name} won!`);
  $game = null;
})
</script>

<div class="game h-screen w-screen flex flex-col">
  {#if !mustSelectTrumpSuite}
    <GameHeader {tricks} baseSuite={base} trumpSuite={$game.trumpSuite} />
  {/if}
  <Board squared={!mustSelectTrumpSuite}>
    {#if mustSelectTrumpSuite}
      <TrumpSelect on:select={init} />
    {:else}
      {#each $game.players as player, i}
        <Move card={activeCards.find(c => c.owner === player)} bot={player.name !== 'me'} position={i} />
      {/each}
    {/if}
  </Board>
  <section class="cards">
    {#each sortCards(cards.slice(0, mustSelectTrumpSuite ? 5 : 13)) as card}
      <Card number={card.number} type={card.type} on:click={() => $game.me.move(card)} clickable={!mustSelectTrumpSuite} />
    {/each}
  </section>
</div>