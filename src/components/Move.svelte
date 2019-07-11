<script>
import Card from './Card.svelte';
import Icon from './Icon.svelte';
export let bot, card, position;
$: style = `${['bottom', 'right', 'top', 'left'][position]}: 1.5rem`;
</script>

<div class="move {bot ? 'is-bot' : ''}" {style}>
  <div class="avatar">
    <Icon type={bot ? 'bot' : ''} size={24} />
  </div>
  <Card type={card.type} number={card.number} />
</div>