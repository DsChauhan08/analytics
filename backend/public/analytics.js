/**
 * Analytics Tracking Library
 * Lightweight script to track user behavior on your website
 */
(function() {
  'use strict';

  const Analytics = {
    config: {
      apiUrl: null,
      apiKey: null,
      sessionId: null
    },

    init: function(apiUrl, apiKey) {
      this.config.apiUrl = apiUrl;
      this.config.apiKey = apiKey;
      this.config.sessionId = this.getSessionId();
      
      // Auto-track pageviews
      this.trackPageview();
      
      // Track page visibility
      this.trackVisibility();
    },

    getSessionId: function() {
      let sid = localStorage.getItem('_analytics_session');
      if (!sid) {
        sid = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('_analytics_session', sid);
      }
      return sid;
    },

    track: function(type, payload) {
      if (!this.config.apiUrl || !this.config.apiKey) {
        console.warn('Analytics not initialized');
        return;
      }

      const data = {
        type,
        payload: payload || {},
        session_id: this.config.sessionId
      };

      fetch(`${this.config.apiUrl}/api/analytics/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.config.apiKey
        },
        body: JSON.stringify(data)
      }).catch(err => console.error('Analytics error:', err));
    },

    trackPageview: function() {
      this.track('pageview', {
        path: window.location.pathname,
        title: document.title,
        referrer: document.referrer,
        url: window.location.href
      });
    },

    trackEvent: function(eventName, properties) {
      this.track('event', {
        name: eventName,
        ...properties
      });
    },

    trackClick: function(element, label) {
      this.track('click', {
        element: element,
        label: label,
        path: window.location.pathname
      });
    },

    trackVisibility: function() {
      let hidden, visibilityChange;
      if (typeof document.hidden !== 'undefined') {
        hidden = 'hidden';
        visibilityChange = 'visibilitychange';
      }

      const handleVisibility = () => {
        if (document[hidden]) {
          this.track('visibility', { state: 'hidden' });
        } else {
          this.track('visibility', { state: 'visible' });
        }
      };

      document.addEventListener(visibilityChange, handleVisibility, false);
    }
  };

  // Expose to global scope
  window.Analytics = Analytics;
})();
