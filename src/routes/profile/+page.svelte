<script>
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
  
    // Store for managing modal state and selected data
    const selectedPhoto = writable(null);
  
    // Dummy static data
    const data = {
      thumbnails: [
        { id: 1, src: "https://via.placeholder.com/150", alt: "Photo 1", details: "Details about Photo 1" },
        { id: 2, src: "https://via.placeholder.com/150", alt: "Photo 2", details: "Details about Photo 2" },
        { id: 3, src: "https://via.placeholder.com/150", alt: "Photo 3", details: "Details about Photo 3" },
      ],
    };
  
    // Simulate a redirect on URL navigation
    onMount(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");
      if (id) {
        const photo = data.thumbnails.find((thumb) => thumb.id === Number(id));
        if (photo) selectedPhoto.set(photo);
      }
    });
  
    // Close modal and update URL
    function closeModal() {
      selectedPhoto.set(null);
      history.pushState({}, "", "/profile");
    }
  
    // Handle thumbnail click
    function handleThumbnailClick(e, photo) {
      e.preventDefault();
      selectedPhoto.set(photo);
      history.pushState({}, "", `/profile/${photo.id}`);
    }
  </script>
  
  <style>
    .gallery {
      display: flex;
      gap: 10px;
    }
  
    .thumbnail {
      cursor: pointer;
    }
  
    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
      z-index: 1000;
    }
  
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
    }
  </style>
  
  <div class="gallery">
    {#each data.thumbnails as thumbnail}
      <a
        href="/?id={thumbnail.id}"
        class="thumbnail"
        on:click={(e) => handleThumbnailClick(e, thumbnail)}
      >
        <img alt={thumbnail.alt} src={thumbnail.src} />
      </a>
    {/each}
  </div>
  
  {#if $selectedPhoto}
    <div class="overlay" on:click={closeModal}></div>
    <div class="modal">
      <h2>{$selectedPhoto.alt}</h2>
      <p>{$selectedPhoto.details}</p>
      <button on:click={closeModal}>Close</button>
    </div>
  {/if}



   <!-- <script>
	import { preloadData, pushState, goto } from '$app/navigation';
	import { page } from '$app/stores';
    const data = {
      thumbnails: [
        { id: 1, src: "https://via.placeholder.com/150", alt: "Photo 1", details: "Details about Photo 1" },
        { id: 2, src: "https://via.placeholder.com/150", alt: "Photo 2", details: "Details about Photo 2" },
        { id: 3, src: "https://via.placeholder.com/150", alt: "Photo 3", details: "Details about Photo 3" },
      ],
    };
  // Close modal and update URL
  function closeModal() {
    selected(null);
      history.pushState({}, "", "/profile");
    }
  

</script>

<style>
    .gallery {
      display: flex;
      gap: 10px;
    }
  
    .thumbnail {
      cursor: pointer;
    }
  
    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
      z-index: 1000;
    }
  
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
    }
  </style>
{#each data.thumbnails as thumbnail}
	<a
		href="/profile/{thumbnail.id}"
		on:click={async (e) => {
			if (innerWidth < 640        // bail if the screen is too small
				|| e.shiftKey             // or the link is opened in a new window
				|| e.metaKey || e.ctrlKey // or a new tab (mac: metaKey, win/linux: ctrlKey)
				// should also consider clicking with a mouse scroll wheel
			) return;

			// prevent navigation
			e.preventDefault();

			const { href } = e.currentTarget;

			// run `load` functions (or rather, get the result of the `load` functions
			// that are already running because of `data-sveltekit-preload-data`)
			const result = await fetch(`/api/profile/${1}`);

			// console.log("🚀 ~ on:click={ ~ result:", await result.json())
            var res = await result.json()
            console.log("🚀 ~ res:", res)
			if (result.status === 200 && res) {
				console.log("🚀 ~ result.status === 200:", result.status === 200)
				pushState(href, { selected: res });
			} else {
				console.log("🚀 ~ href:", href)
				// something bad happened! try navigating
				// goto(href);
			}
		}}
	>
		<img alt={thumbnail.alt} src={thumbnail.src} />
	</a>
{/each}

{#if $page.state.selected}


<div class="modal">
    <h2>
        {$page.state.selected} kkkk
    </h2>
    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, iure!</div>
<h2>{$page.state.selected.name}</h2>
  <p>{$page.state.selected.email}</p>
  <button on:click={closeModal}>Close</button>
</div>

{/if} -->



<!-- <script>
	import { preloadData, pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';

	// Thumbnail data
	const data = {
		thumbnails: [
			{ id: 1, src: "https://via.placeholder.com/150", alt: "Photo 1", details: "Details about Photo 1" },
			{ id: 2, src: "https://via.placeholder.com/150", alt: "Photo 2", details: "Details about Photo 2" },
			{ id: 3, src: "https://via.placeholder.com/150", alt: "Photo 3", details: "Details about Photo 3" },
		],
	};

	// Writable store for modal selected data
	const selected = writable(null);

	// Function to close modal
	function closeModal() {
		selected.set(null); // Clear modal data
		history.pushState({}, "", "/profile"); // Update URL
	}
</script>

<style>
	.gallery {
		display: flex;
		gap: 10px;
	}

	.thumbnail {
		cursor: pointer;
	}

	.modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: white;
		padding: 20px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
		z-index: 1000;
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}
</style>


<div class="gallery">
	{#each data.thumbnails as thumbnail}
		<a
			href="/profile/{thumbnail.id}"
			on:click={async (e) => {
				if (
					innerWidth < 640 || // Small screen
					e.shiftKey ||       // New window
					e.metaKey || e.ctrlKey // New tab
				) return;

				e.preventDefault(); // Prevent navigation

				const result = await fetch(`/api/profile/${thumbnail.id}`);
				if (result.status === 200) {
					const res = await result.json();
					selected.set(res); // Set selected data
					pushState(`/profile/${thumbnail.id}`, { selected: res }); // Update state and URL
				}
			}}
		>
			<img alt={thumbnail.alt} src={thumbnail.src} class="thumbnail" />
		</a>
	{/each}
</div>


{#if $selected}
	<div class="overlay" on:click={closeModal}></div>
	<div class="modal">
		<h2>{$selected.name}</h2>
		<p>{$selected.details}</p>
		<button on:click={closeModal}>Close</button>
	</div>
{/if} -->
