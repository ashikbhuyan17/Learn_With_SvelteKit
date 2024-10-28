
 <script>
    import { onMount } from 'svelte';
  import CarouselList from '../../components/Carousel/CarouselList.svelte';
    let Carousel;
    console.log("🚀 ~ Carousel:", Carousel)
  
    // Ensure Carousel is only imported on the client side
    onMount(async () => {
      const module = await import('svelte-carousel');
      console.log("🚀 ~ onMount ~ module:", module)
      Carousel = module.default;
    });
  
    // Define an array of images with their descriptions
    let images = [
      {
        url: '/slider-3.jpg', // Replace with real Google image URL
        alt: 'Image 1 - Red',
      },
      {
        url: '/slider-bg-2.png', // Replace with real Google image URL
        alt: 'Image 2 - Green',
      },
      {
        url: '/slider-3.jpg', // Replace with real Google image URL
        alt: 'Image 3 - Blue',
      },
    ];
  </script>
  
  
  {#if Carousel}
    <Carousel
      autoplayDuration={2000}
      duration={500}
      autoplay
      dots={false}
      arrows={true}
      swiping={true}
    >
      {#each images as { url, alt } ,index}
        {console.log("🚀 ~ url:", url)}
        <div style="height: 400px;">
          <img src={url} alt={alt} class="w-full h-full object-contain" />
        </div>
      {/each}
    </Carousel>
  {:else}
    <p>Loading Carousel...</p>
  {/if}
  <CarouselList/>

  
  <style>
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
  </style>

