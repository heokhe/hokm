<script>
import CardIcon from './CardIcon.svelte';
import { stringifyNumber as stringify } from '../core/utils/';
export let type, number;
$: isRed = type === 'D' || type === 'K';
</script>

<div class="card {isRed ? 'red' : ''}" on:click>
  <CardIcon size='1.1em' {type} />
  <span>{stringify(number)}</span>
</div>