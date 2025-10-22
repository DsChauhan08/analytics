<script>
  let token = '';
  let planId = 'basic';

  async function subscribe() {
    const res = await fetch('http://localhost:4000/api/subscriptions/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ planId })
    });
    const data = await res.json();
    alert('Subscription created: ' + JSON.stringify(data));
  }
</script>

<main>
  <h1>Subscription</h1>
  <label>Token: <input type="password" bind:value={token} /></label>
  <select bind:value={planId}>
    <option value="basic">Basic - $9/mo</option>
    <option value="pro">Pro - $29/mo</option>
    <option value="enterprise">Enterprise - $99/mo</option>
  </select>
  <button on:click={subscribe}>Subscribe</button>
</main>

<style>
  main { padding: 2rem; }
  input, select { padding: 0.5rem; margin: 0.5rem; }
  button { padding: 0.5rem 1rem; background: #28a745; color: white; border: none; cursor: pointer; }
</style>
