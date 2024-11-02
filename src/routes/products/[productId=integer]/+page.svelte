<script>
  import { page } from '$app/stores';
  const productId = $page.params.productId;
  console.log("🚀 ~ $page:", $page)
  export let data;
  const loadData = data.props.data;
</script>

<p>dynamic page {productId}</p>
<p><a href={`${productId}/reviews`}>go to review page</a></p>
<img src={loadData.image} alt="" height="200" width="200" />
<p>{loadData?.title}</p>
<p>{loadData?.description}</p>
<p>{loadData?.price}</p>
<p>{loadData?.category}</p>
