// src/routes/profile/[id]/+page.js
export async function load({ params, fetch }) {
  // API থেকে ডেটা আনুন
  const res = await fetch(`/api/profile/${params.id}`);
  const profileData = await res.json();

  return {
    id: params.id, // রাউট প্যারামিটার
    profileData, // প্রোফাইল ডেটা
  };
}
