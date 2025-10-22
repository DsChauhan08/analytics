<script>
  import { onMount } from 'svelte';
  let token = '';
  let name = '';
  let domain = '';
  let result = null;

  onMount(() => {
    token = localStorage.getItem('token') || '';
  });

  async function createWebsite() {
    const res = await fetch('http://localhost:4000/api/websites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, domain })
    });
    result = await res.json();
  }
</script>

<main>
  <h1>Create New Website</h1>
  
  <div class="form">
    <label>
      Website Name:
      <input bind:value={name} placeholder="My Awesome Site"/>
    </label>
    
    <label>
      Domain:
      <input bind:value={domain} placeholder="example.com"/>
    </label>
    
    <label>
      Your Token:
      <input bind:value={token} placeholder="Paste your JWT token"/>
    </label>
    
    <button on:click={createWebsite}>Create Website</button>
  </div>

  {#if result}
    <div class="result">
      <h2>Website Created!</h2>
      <p><strong>ID:</strong> {result.id}</p>
      <p><strong>Name:</strong> {result.name}</p>
      <p><strong>Domain:</strong> {result.domain}</p>
      <p><strong>API Key:</strong> <code>{result.api_key}</code></p>
      
      <h3>Add tracking to your website:</h3>
      <pre>&lt;script src="http://localhost:4000/tracker.js" 
        data-api-key="{result.api_key}"&gt;&lt;/script&gt;</pre>
    </div>
  {/if}
</main>

<style>
  .form {
    max-width: 500px;
    margin: 2em auto;
  }
  label {
    display: block;
    margin: 1em 0;
  }
  input {
    width: 100%;
    padding: 0.5em;
    margin-top: 0.3em;
  }
  button {
    padding: 0.7em 1.5em;
    background: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }
  button:hover {
    background: #0056b3;
  }
  .result {
    background: #f0f8ff;
    padding: 1.5em;
    margin: 2em auto;
    max-width: 600px;
    border-radius: 4px;
  }
  pre {
    background: #2d2d2d;
    color: #f8f8f8;
    padding: 1em;
    overflow-x: auto;
    border-radius: 4px;
  }
  code {
    background: #e8e8e8;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: monospace;
  }
</style>
