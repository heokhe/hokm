<script>
import { onMount } from 'svelte';
import { CARD_TYPES } from './core/card';
import { sortCards } from './core/utils';
import Game from './core';
import Card from './components/Card.svelte';
import Move from './components/Move.svelte';
import GameHeader from './components/GameHeader.svelte';
import TrumpSelect from './components/TrumpSelect.svelte';
import Board from './components/Board.svelte';

const game = new Game();
let cards = game.me.availableCards, base = null, trump = null;
$: isSelectingTrump = !trump;
$: activeCards = game.activeCards;
$: tricks = game.tricks;

function init(type) {
  game.init(type);
  trump = type;
}

game.addListeners({
  move() {
    activeCards = game.activeCards;
    base = game.baseSuite;
    cards = game.me.availableCards;
  },
  reset() {
    activeCards = [];
    base = null;
    tricks = game.tricks;
  },
  end({ winner: { members: [a, b] } }) {
    alert(`the game has ended. ${a.name} and ${b.name} won!`);
  }
})
</script>

<div class="game h-screen w-screen flex flex-col">
  {#if game.trumpSuite}
    <GameHeader {tricks} baseSuite={base} trumpSuite={trump} />
  {/if}
  <Board squared={!isSelectingTrump}>
    {#if isSelectingTrump}
      <TrumpSelect on:select={e => init(e.detail)} />
    {:else}
      {#each game.players as player, i}
        <Move card={activeCards.find(c => c.owner === player)} bot={player.name !== 'me'} position={i} />
      {/each}
    {/if}
  </Board>
  <section class="cards">
    {#each sortCards(cards.slice(0, isSelectingTrump ? 5 : 13)) as card}
      <Card number={card.number} type={card.type} on:click={() => game.me.move(card)} clickable={!isSelectingTrump} />
    {/each}
  </section>
</div>