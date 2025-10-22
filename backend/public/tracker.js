/**
 * Analytics Tracking Library
 * Usage: Include this script on your website with your API key
 * <script src="https://your-domain/tracker.js" data-api-key="your-api-key"></script>
 */
(function() {
  const script = document.currentScript;
  const apiKey = script.getAttribute('data-api-key');
  const endpoint = script.getAttribute('data-endpoint') || 'http://localhost:4000';
  
  if (!apiKey) {
    console.error('Analytics: Missing API key');
    return;
  }

  let sessionId = sessionStorage.getItem('analytics_session');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('analytics_session', sessionId);
  }

  function track(type, payload) {
    fetch(endpoint + '/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify({ type, payload, session_id: sessionId })
    }).catch(err => console.error('Analytics error:', err));
  }

  // Track pageview
  track('pageview', {
    url: window.location.href,
    referrer: document.referrer,
    title: document.title
  });

  // Track clicks on links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link) {
      track('click', { href: link.href, text: link.textContent.trim() });
    }
  });

  // Expose global tracking function
  window.analytics = { track };
})();
