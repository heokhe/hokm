<script>
import Card from './components/Card.svelte';
import GameHeader from './components/GameHeader.svelte';
import CardIcon from './components/CardIcon.svelte';
import { onMount } from 'svelte';
import { CARD_TYPES } from './core/utils/';
import { game, isPlaying } from './store';
$: mustSelectTrumpSuite = !$game.trumpSuite;
let moves, base, cards = [], tricks;
onMount(() => {
  moves = [];
  base = null;
  cards = $game.me.availableCards;
  tricks = [0,0];
})
$game.on('move', () => {
  cards = $game.me.availableCards
  moves = $game.moves
  base = $game.baseSuite;
  tricks = $game.tricks;
})
$game.on('end', ({ winner: { members: [a, b] } }) => {
  alert(`the game has ended. ${a.id} and ${b.id} won!`);
  $isPlaying = false
})
</script>

<div class="game h-screen w-screen flex flex-col">
  {#if !mustSelectTrumpSuite}
    <GameHeader {tricks} baseSuite={base} trumpSuite={$game.trumpSuite} />
  {/if}
  <main class="h-full {mustSelectTrumpSuite ? 'flex items-center justify-center flex-col' : ''}">
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
      {#each moves as { player, card: { number, type } }}
        <div>
          player: {player.id}
          <Card {number} {type} />
        </div>
      {/each}
    {/if}
  </main>
  <div class="cards text-center block flex-shrink-0 pl-2 pt-2 border-grey-100 border-t">
    {#each cards as card, i}
      {#if !mustSelectTrumpSuite || i < 5}
        <Card {...card} on:click={() => $game.me.move(card)} />
      {/if}
    {/each}
  </div>
</div>