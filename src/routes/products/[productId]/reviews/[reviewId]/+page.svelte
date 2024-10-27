<!-- <script>
    import { page } from '$app/stores';

    // Extract productId and reviewId from the URL parameters
    const { productId, reviewId } = $page.params;
    console.log("🚀 ~ productId:", productId, "reviewId:", reviewId);

    // Define the path to go one step back (to reviews page)
    const reviewPageUrl = `/products/${productId}/reviews`;
</script>

<p>Dynamic page: {productId}</p>
<p>Dynamic reviews: {reviewId}</p> -->

<!-- Link to navigate back to the reviews page -->
<!-- <p><a href={reviewPageUrl}>Go to review page</a></p> -->


<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';  // Import goto function for navigation

    // Extract productId and reviewId from the URL parameters
    const { productId, reviewId } = $page.params;
    console.log("🚀 ~ productId:", productId, "reviewId:", reviewId);

    // Navigation functions
    const goBack = () => history.back();  // Go back to the previous page in history
    const goForward = () => history.forward();  // Go forward in history
    const goToReviews = () => goto(`/products/${productId}/reviews`);  // Go to the reviews page
</script>

<h1>Product {productId} - Review {reviewId}</h1>

<!-- Buttons for navigation -->
<button on:click={goBack}>⬅️ Back</button>
<button on:click={goForward}>➡️ Forward</button>
<button on:click={goToReviews}>Go to Reviews Page</button>

