<script>
  import { onMount } from 'svelte';
  let token = '';
  let websiteId = '';
  let events = [];
  let stats = { pageviews: 0, events: 0, sessions: 0 };

  onMount(() => {
    token = localStorage.getItem('token') || '';
  });

  async function loadAnalytics() {
    const res = await fetch(`http://localhost:4000/api/analytics/recent/${websiteId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    events = await res.json();
    
    // Calculate stats
    stats.pageviews = events.filter(e => e.type === 'pageview').length;
    stats.events = events.length;
    stats.sessions = new Set(events.map(e => e.session_id)).size;
  }
</script>

<main>
  <h1>Analytics Report</h1>
  <input bind:value={websiteId} placeholder="Website ID" type="number"/>
  <button on:click={loadAnalytics}>Load Analytics</button>
  
  <div class="stats">
    <div class="stat-card">
      <h3>Pageviews</h3>
      <p>{stats.pageviews}</p>
    </div>
    <div class="stat-card">
      <h3>Total Events</h3>
      <p>{stats.events}</p>
    </div>
    <div class="stat-card">
      <h3>Sessions</h3>
      <p>{stats.sessions}</p>
    </div>
  </div>

  <h2>Recent Events</h2>
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Session</th>
        <th>Time</th>
        <th>Payload</th>
      </tr>
    </thead>
    <tbody>
      {#each events.slice(0, 50) as event}
        <tr>
          <td>{event.type}</td>
          <td>{event.session_id}</td>
          <td>{new Date(event.created_at).toLocaleString()}</td>
          <td>{JSON.stringify(event.payload)}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>

<style>
  .stats {
    display: flex;
    gap: 1em;
    margin: 2em 0;
  }
  .stat-card {
    padding: 1em;
    background: #f9f9f9;
    border-radius: 4px;
    flex: 1;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 0.5em;
    border: 1px solid #ddd;
    text-align: left;
  }
</style>
