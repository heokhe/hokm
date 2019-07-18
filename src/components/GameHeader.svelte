<script>
import Icon from './Icon.svelte';
export let trumpSuite, baseSuite, tricks;
const ICON_SIZE = 28;
const isRed = type => type === 'K' || type === 'D';
</script>

<header>
  <div class="item {isRed(trumpSuite) ? 'text-red-600' : 'text-blue-gray-800'}">
    <Icon size={ICON_SIZE} type={trumpSuite} />
    <span>
      Trump Suite
    </span>
  </div>
  <div class="tricks">
    <div class="bg-gray-100 text-deep-orange-600">{tricks[0]}</div>
    <div>{tricks[1]}</div>
  </div>
  <div class="item {isRed(baseSuite) ? 'text-red-600' : 'text-blue-gray-800'}">
    <Icon size={ICON_SIZE} type={baseSuite} />
    <span>Base Suite</span>
  </div>
</header>