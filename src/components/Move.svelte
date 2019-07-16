<script>
import Card from './Card.svelte';
import Icon from './Icon.svelte';
export let bot, card, position;
$: positionName = ['bottom', 'right', 'top', 'left'][position];
</script>

<div class="move {bot ? 'is-bot' : ''} position-{positionName}">
  <div class="avatar">
    <Icon type={bot ? 'bot' : ''} size={24} />
  </div>
  {#if card}
    <Card type={card.type} number={card.number} />
  {/if}
</div>