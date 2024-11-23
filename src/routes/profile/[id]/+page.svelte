<script>
  export let data; // `load` ফাংশন থেকে ডেটা পাব

  // ডেটা ভেরিয়েবল তৈরি
  $: profileData = data.profileData;
</script>

<h1>Profile Page</h1>
<p><strong>User ID:</strong> {data.id}</p>
<p><strong>Name:</strong> {profileData.name}</p>
<p><strong>Email:</strong> {profileData.email}</p>

<nav>
  <a href="/profile/1">User 1</a>
  <a href="/profile/2">User 2</a>
  <a href="/profile/3">User 3</a>
</nav>
