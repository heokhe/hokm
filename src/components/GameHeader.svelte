<script>
import Icon from './CardIcon.svelte';
import { game } from '../store';
export let trumpSuite, baseSuite, tricks;
</script>

<header>
  <div class="item">
    Trump Suite
    <Icon size='1.2em' type={trumpSuite} />  
  </div>
  <div class="item">
    Base Suite
    <Icon size='1.2em' type={baseSuite} />
  </div>
  <div class="item">
    Tricks: {tricks.join(' - ')}
  </div>
</header>