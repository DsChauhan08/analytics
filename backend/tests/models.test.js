const userModel = require('../src/models/user');
const websiteModel = require('../src/models/website');
const analyticsModel = require('../src/models/analytics');

describe('Models', () => {
  describe('User Model', () => {
    it('should have createUser function', () => {
      expect(typeof userModel.createUser).toBe('function');
    });

    it('should have findByEmail function', () => {
      expect(typeof userModel.findByEmail).toBe('function');
    });
  });

  describe('Website Model', () => {
    it('should have createWebsite function', () => {
      expect(typeof websiteModel.createWebsite).toBe('function');
    });

    it('should have listWebsites function', () => {
      expect(typeof websiteModel.listWebsites).toBe('function');
    });

    it('should have findByApiKey function', () => {
      expect(typeof websiteModel.findByApiKey).toBe('function');
    });
  });

  describe('Analytics Model', () => {
    it('should have trackEvent function', () => {
      expect(typeof analyticsModel.trackEvent).toBe('function');
    });

    it('should have recentEvents function', () => {
      expect(typeof analyticsModel.recentEvents).toBe('function');
    });

    it('should have getOverview function', () => {
      expect(typeof analyticsModel.getOverview).toBe('function');
    });

    it('should have getTimeSeries function', () => {
      expect(typeof analyticsModel.getTimeSeries).toBe('function');
    });

    it('should have getTopPages function', () => {
      expect(typeof analyticsModel.getTopPages).toBe('function');
    });
  });
});
