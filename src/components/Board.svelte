<script>
let height = 0;
export let squared = false;
</script>

<main class="game-board-container">
  <div
    class="game-board"
    bind:clientHeight={height}
    style={squared ? `width: ${height}px` : ''}>
    <slot />
  </div>
</main>