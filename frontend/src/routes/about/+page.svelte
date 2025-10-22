<script>
</script>

<main>
  <h1>About Analytics Platform</h1>
  
  <section>
    <h2>What is this?</h2>
    <p>
      Analytics Platform is an enterprise-grade, self-hosted alternative to Google Analytics. 
      It provides real-time tracking, comprehensive dashboards, and privacy-focused analytics 
      for your websites and applications.
    </p>
  </section>

  <section>
    <h2>Features</h2>
    <ul>
      <li>Real-time event tracking</li>
      <li>Session tracking and analysis</li>
      <li>Custom event support</li>
      <li>Multi-website management</li>
      <li>Time-series data visualization</li>
      <li>Top pages and referrer tracking</li>
      <li>RESTful API access</li>
      <li>PayPal subscription integration</li>
      <li>Docker deployment ready</li>
    </ul>
  </section>

  <section>
    <h2>Technology Stack</h2>
    <div class="tech-stack">
      <div class="tech-item">
        <h3>Backend</h3>
        <p>Node.js, Express.js, PostgreSQL</p>
      </div>
      <div class="tech-item">
        <h3>Frontend</h3>
        <p>SvelteKit, Svelte 4</p>
      </div>
      <div class="tech-item">
        <h3>Infrastructure</h3>
        <p>Docker, Docker Compose</p>
      </div>
    </div>
  </section>

  <section>
    <h2>Getting Started</h2>
    <ol>
      <li><a href="/register">Create an account</a></li>
      <li>Create a website in your <a href="/dashboard">dashboard</a></li>
      <li>Add the tracking script to your site</li>
      <li>View your <a href="/analytics">analytics</a></li>
    </ol>
  </section>

  <section>
    <h2>API Documentation</h2>
    <p>
      Full API documentation is available in the repository. 
      See <code>API.md</code> for endpoint details and usage examples.
    </p>
  </section>

  <section>
    <h2>Privacy</h2>
    <p>
      This platform is designed with privacy in mind. All data is stored on your own 
      infrastructure, giving you complete control over your analytics data. No data 
      is shared with third parties.
    </p>
  </section>
</main>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 2em;
  }

  section {
    margin: 2em 0;
    padding: 1.5em;
    background: #f9f9f9;
    border-radius: 8px;
  }

  h1 {
    color: #333;
    margin-bottom: 1em;
  }

  h2 {
    color: #555;
    margin-bottom: 0.8em;
  }

  ul, ol {
    padding-left: 2em;
  }

  li {
    margin: 0.5em 0;
  }

  .tech-stack {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1em;
    margin-top: 1em;
  }

  .tech-item {
    padding: 1em;
    background: white;
    border-radius: 4px;
  }

  .tech-item h3 {
    margin-bottom: 0.5em;
    color: #007bff;
  }

  code {
    background: #e8e8e8;
    padding: 0.2em 0.5em;
    border-radius: 3px;
    font-family: monospace;
  }

  a {
    color: #007bff;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
