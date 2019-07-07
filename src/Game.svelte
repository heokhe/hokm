<script>
import Card from './components/Card.svelte';
import GameHeader from './components/GameHeader.svelte';
import CardIcon from './components/CardIcon.svelte';
import { onMount } from 'svelte';
import { CARD_TYPES } from './core/card';
import { game, isPlaying } from './store';
$: mustSelectTrumpSuite = !$game.trumpSuite;
let activeCards, base, cards = [], tricks;
onMount(() => {
  activeCards = [];
  base = null;
  cards = $game.me.availableCards;
  tricks = [0,0];
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
  <main class="game-board {mustSelectTrumpSuite ? 'centered' : ''}">
    {#if mustSelectTrumpSuite}
      <h1 class="text-2xl font-medium">Select a trump suite</h1>
      <div>
        {#each CARD_TYPES as type}
          <button on:click={() => $game.trumpSuite = type}>
            <CardIcon {type} size="1em" />
          </button>
        {/each}
      </div>
    {:else}
      {#each activeCards as { number, type, owner: { name } } }
        <div>
          player: {name}
          <Card {number} {type} />
        </div>
      {/each}
    {/if}
  </main>
  <section class="cards">
    {#each cards as card, i}
      {#if !mustSelectTrumpSuite || i < 5}
        <Card number={card.number} type={card.type} on:click={() => $game.me.move(card)} />
      {/if}
    {/each}
  </section>
</div>