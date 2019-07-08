<script>
import CardIcon from './CardIcon.svelte';
import { stringifyNumber as stringify } from '../core/utils/';
export let type, number = 0;
$: isRed = type === 'D' || type === 'K';
</script>

<div class="card {isRed ? 'red' : ''} {!number ? 'suite-only' : ''}" on:click>
  <CardIcon size='1.1em' {type} />
  {#if number}
    <span>{stringify(number)}</span>
  {/if}
</div>