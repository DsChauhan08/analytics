/**
 * Analytics Tracking Script
 * Usage: <script src="https://your-analytics.com/tracking.js" data-api-key="YOUR_KEY"></script>
 */
(function() {
  const script = document.currentScript;
  const apiKey = script.getAttribute('data-api-key');
  const endpoint = script.getAttribute('data-endpoint') || 'http://localhost:4000/api/analytics/track';
  
  if (!apiKey) {
    console.error('Analytics: Missing data-api-key');
    return;
  }

  const sessionId = 'sess_' + Math.random().toString(36).substr(2, 9);

  function track(type, payload) {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey
      },
      body: JSON.stringify({
        type,
        payload,
        session_id: sessionId
      })
    }).catch(err => console.error('Analytics error:', err));
  }

  // Track pageview on load
  track('pageview', {
    url: window.location.pathname,
    referrer: document.referrer,
    title: document.title
  });

  // Track clicks on links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link) {
      track('click', {
        url: link.href,
        text: link.textContent
      });
    }
  });

  // Expose global tracking function
  window.analytics = { track };
})();
