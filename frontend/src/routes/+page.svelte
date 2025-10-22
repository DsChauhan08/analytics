<script>
</script>

<main>
  <div class="hero">
    <h1>Analytics Platform</h1>
    <p class="subtitle">Privacy-focused, self-hosted alternative to Google Analytics</p>
    
    <div class="cta">
      <a href="/register" class="button primary">Get Started</a>
      <a href="/login" class="button secondary">Login</a>
    </div>
  </div>

  <div class="features">
    <div class="feature">
      <h3>🚀 Real-time Analytics</h3>
      <p>Track pageviews, events, and user sessions in real-time</p>
    </div>
    
    <div class="feature">
      <h3>🔒 Privacy First</h3>
      <p>Self-hosted solution that respects user privacy</p>
    </div>
    
    <div class="feature">
      <h3>💳 Flexible Plans</h3>
      <p>Pay-as-you-grow pricing with PayPal integration</p>
    </div>
    
    <div class="feature">
      <h3>📊 Powerful Dashboards</h3>
      <p>Visualize your data with comprehensive reports</p>
    </div>
  </div>

  <div class="demo">
    <h2>Try It Out</h2>
    <p>Test the tracking with our <a href="http://localhost:4000/demo.html" target="_blank">demo page</a></p>
  </div>
</main>

<style>
  main {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .hero {
    text-align: center;
    padding: 4em 2em;
  }
  
  h1 {
    font-size: 3em;
    margin-bottom: 0.3em;
    color: #333;
  }
  
  .subtitle {
    font-size: 1.3em;
    color: #666;
    margin-bottom: 2em;
  }
  
  .cta {
    display: flex;
    gap: 1em;
    justify-content: center;
  }
  
  .button {
    padding: 1em 2em;
    text-decoration: none;
    border-radius: 6px;
    font-weight: bold;
    transition: all 0.3s;
  }
  
  .button.primary {
    background: #007bff;
    color: white;
  }
  
  .button.primary:hover {
    background: #0056b3;
    transform: translateY(-2px);
  }
  
  .button.secondary {
    background: white;
    color: #007bff;
    border: 2px solid #007bff;
  }
  
  .button.secondary:hover {
    background: #f0f8ff;
  }
  
  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2em;
    padding: 3em 2em;
  }
  
  .feature {
    padding: 2em;
    background: #f9f9f9;
    border-radius: 8px;
    text-align: center;
  }
  
  .feature h3 {
    margin-bottom: 0.5em;
    font-size: 1.5em;
  }
  
  .demo {
    text-align: center;
    padding: 3em 2em;
    background: #e8f4ff;
    border-radius: 8px;
    margin: 2em;
  }
  
  .demo h2 {
    margin-bottom: 1em;
  }
</style>
