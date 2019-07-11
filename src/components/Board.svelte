<script>
let height = 0;
</script>

<main class="game-board p-10" bind:clientHeight={height} style="width: {height}px">
  <slot />
</main>