<script>
  import { onMount } from 'svelte';
  let token = '';
  let websites = [];

  onMount(() => {
    token = localStorage.getItem('token') || '';
  });

  async function loadWebsites() {
    const res = await fetch('http://localhost:4000/api/websites', {
      headers: { Authorization: `Bearer ${token}` }
    });
    websites = await res.json();
  }
</script>

<main>
  <h1>Dashboard</h1>
  <input bind:value={token} placeholder="Paste token here"/>
  <button on:click={loadWebsites}>Load Websites</button>
  <ul>
    {#each websites as site}
      <li>{site.name} - {site.domain} (API Key: {site.api_key})</li>
    {/each}
  </ul>
</main>
