<script>
  import { onMount } from 'svelte';
  let token = '';
  let planId = 'basic';

  onMount(() => {
    token = localStorage.getItem('token') || '';
  });

  async function subscribe() {
    const res = await fetch('http://localhost:4000/api/subscriptions/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ planId })
    });
    const data = await res.json();
    if (data.approval_url) {
      window.open(data.approval_url, '_blank');
    }
  }
</script>

<main>
  <h1>Subscribe to Analytics</h1>
  <p>Choose a plan:</p>
  <select bind:value={planId}>
    <option value="basic">Basic ($9/month)</option>
    <option value="pro">Pro ($29/month)</option>
    <option value="enterprise">Enterprise ($99/month)</option>
  </select>
  <button on:click={subscribe}>Subscribe with PayPal</button>
</main>
