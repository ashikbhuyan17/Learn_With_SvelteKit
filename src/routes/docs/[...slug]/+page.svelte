<script>
    import { page } from '$app/stores';

    // Access the route parameters from the page store
    const params = $page.params;
    console.log("🚀 ~ params:", params);

    // Split the slug into an array for further processing
    const slugArr = params.slug ? params.slug.split('/') : [];
    console.log("🚀 ~ slugArr:", slugArr);
</script>

<h1>Catch-All Routes</h1>

<!-- Display the content conditionally based on slug array length -->
{#if slugArr.length === 0}
    <p>No parameters provided.</p>
{:else if slugArr.length === 1}
    <p>Single parameter: {slugArr[0]}</p>
{:else if slugArr.length === 2}
    <p>Two parameters: {slugArr[0]} and {slugArr[1]}</p>
{:else}
    <p>Multiple parameters:</p>
    <ul>
        {#each slugArr as segment, index}
            <li>Segment {index + 1}: {segment}</li>
        {/each}
    </ul>
{/if}
