// src/routes/api/profile/[id]/+server.js
export async function GET({ params }) {
  const profiles = {
    1: { name: "Alice", email: "alice@example.com" },
    2: { name: "Bob", email: "bob@example.com" },
    3: { name: "Charlie", email: "charlie@example.com" },
  };

  return new Response(JSON.stringify(profiles[params.id] || {}));
}
