// src/routes/+page.js
export const load = async ({ fetch, url }) => {
  const category = url.searchParams.get("category") || "all";
  const sort = url.searchParams.get("sort") || "asc";
  const page = parseInt(url.searchParams.get("page")) || 1;
  const limit = 5; // Items per page

  let apiUrl = `https://fakestoreapi.com/products`;

  // Append category to URL if needed
  if (category !== "all") {
    apiUrl += `/category/${category}`;
  }

  // Add sort and limit params for pagination
  apiUrl += `?sort=${sort}&limit=${limit}&page=${page}`;

  const response = await fetch(apiUrl);
  const products = await response.json();

  return {
    products,
    category,
    sort,
    page,
    totalItems: 20, // Assuming static total items; adjust as needed
  };
};
