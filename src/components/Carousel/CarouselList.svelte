<script>
  import { onMount } from 'svelte';
  import Color from '../Color.svelte';
  let Carousel;

  // Ensure Carousel is only imported on the client side
  onMount(async () => {
    const module = await import('svelte-carousel');
    Carousel = module.default;
  });

  // Define your colors array
  let colors = [
    { color: 'red', text: 'Red' },
    { color: 'green', text: 'Green' },
    { color: 'blue', text: 'Blue' },
  ];
</script>

{#if Carousel}
  <Carousel
    autoplayDuration={3000}
    duration={500}
    autoplay
    timingFunction="linear"
    dots={false}
    arrows={true}
    swiping={true}
  >
    {#each colors as { color, text } (color)}
      <Color {color} {text} />
    {/each}
    <!-- {#each colors as { color, text } (color)}
        <div style="background-color: {color}; height: 300px;">
          <h2 class="text-white text-center">{text}</h2>
        </div>
      {/each} -->
  </Carousel>
{:else}
  <p>Loading Carousel...</p>
{/if}
