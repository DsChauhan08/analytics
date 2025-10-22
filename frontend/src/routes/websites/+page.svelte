<script>
  let token = '';
  let websites = [];
  let newName = '';
  let newDomain = '';

  async function loadWebsites() {
    const res = await fetch('http://localhost:4000/api/websites', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    websites = await res.json();
  }

  async function addWebsite() {
    await fetch('http://localhost:4000/api/websites', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newName, domain: newDomain })
    });
    await loadWebsites();
  }
</script>

<main>
  <h1>Manage Websites</h1>
  <label>Token: <input type="password" bind:value={token} /></label>
  <button on:click={loadWebsites}>Load</button>
  
  <h2>Add New</h2>
  <input bind:value={newName} placeholder="Name" />
  <input bind:value={newDomain} placeholder="Domain" />
  <button on:click={addWebsite}>Add</button>

  <h2>Your Websites</h2>
  {#each websites as site}
    <div class="site">
      <strong>{site.name}</strong> - {site.domain}
      <br><small>API Key: {site.api_key}</small>
    </div>
  {/each}
</main>

<style>
  main { padding: 2rem; }
  .site { margin: 1rem 0; padding: 1rem; border: 1px solid #ccc; }
  input { padding: 0.5rem; margin: 0.5rem; }
  button { padding: 0.5rem 1rem; }
</style>
