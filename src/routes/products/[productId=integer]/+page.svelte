<script>
    import {page} from '$app/stores'
    const productId = $page.params.productId
    console.log("🚀 ~ productId:", productId)
</script>


<p>dynamic page {productId} </p>
<p><a href={`${productId}/reviews`}>go to review page</a></p>