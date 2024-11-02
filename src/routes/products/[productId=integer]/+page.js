import { error, redirect } from '@sveltejs/kit';

export async function load({ fetch, params, url, route }) {
  // console.log('🚀 ~ load ~  params,url,route:', params, url, route);
  if (params.productId > 20) {
    // throw error(404, {
    //   message: 'Product not found',
    //   hint: 'Try a different product',
    // });
    throw redirect(307, '/products');
  }
  const res = await fetch(
    `https://fakestoreapi.com/products/${params.productId}`
  );
  const data = await res.json();
  console.log('🚀 ~ load ~ data:', data);
  return { props: { data } };
}
