<script>
    export let color;
    export let text;
</script>

<div class="color-slide" style="background-color: {color};">
    <h2 class="text-white text-2xl">{text}</h2>
</div>

<style>
  .color-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px; /* Customize the height */
    width: 100%;   /* Ensure it takes full width */
  }
</style>
