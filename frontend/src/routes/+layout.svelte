<script>
  import { page } from '$app/stores';
</script>

<nav class="navbar">
  <div class="brand">
    <a href="/">📊 Analytics</a>
  </div>
  <div class="nav-links">
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/register">Register</a>
    <a href="/login">Login</a>
    <a href="/dashboard">Dashboard</a>
    <a href="/websites/new">New Website</a>
    <a href="/analytics">Analytics</a>
    <a href="/subscribe">Subscribe</a>
  </div>
</nav>

<slot />

<footer>
  <p>Analytics Platform © 2025 | <a href="https://github.com" target="_blank">GitHub</a></p>
</footer>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  }
  
  .navbar {
    background: #2c3e50;
    color: white;
    padding: 1em 2em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .brand a {
    color: white;
    text-decoration: none;
    font-size: 1.5em;
    font-weight: bold;
  }
  
  .nav-links {
    display: flex;
    gap: 1.5em;
  }
  
  .nav-links a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .nav-links a:hover {
    color: #3498db;
  }
  
  :global(main) {
    min-height: calc(100vh - 120px);
    padding: 2em;
  }
  
  footer {
    background: #34495e;
    color: white;
    text-align: center;
    padding: 1.5em;
    margin-top: 3em;
  }
  
  footer a {
    color: #3498db;
    text-decoration: none;
  }
  
  footer a:hover {
    text-decoration: underline;
  }
</style>
