<script>
import Icon from './Icon.svelte';
import { stringifyNumber as stringify } from '../core/utils/';
export let type, number = 0, clickable = false;
$: isRed = type === 'D' || type === 'K';
</script>

<div class="card {isRed ? 'red' : ''} {!number ? 'suite-only' : ''} {clickable ? 'clickable' : ''}" on:click>
  <Icon size='1em' {type} />
  {#if number}
    <span>{stringify(number)}</span>
  {/if}
</div>