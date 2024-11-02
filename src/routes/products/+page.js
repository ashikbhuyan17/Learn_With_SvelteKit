export async function load({ fetch, params }) {
  console.log('🚀 ~ load ~ fetch, params:', params);
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();
  // console.log('🚀 ~ load ~ data:', data);
  return { props: { data } };
}
