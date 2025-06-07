// tracker.js
// Simulates monitoring app usage & detects dopamine-triggering behaviors

class UsageTracker {
  constructor() {
    this.usageCount = 0;            // How many times user "opened" social apps
    this.rapidScrollCount = 0;      // Detect rapid scroll "bursts"
    this.lastScrollTime = 0;
    this.scrollThreshold = 100;     // ms threshold to consider scrolls rapid
    this.maxRapidScrolls = 5;       // Number of rapid scrolls considered addictive
    this.usageLimit = 10;           // Max app openings before alert triggers
    this.listeners();
  }

  listeners() {
    // Simulate app opens by button click (in real app, would be API hooks)
    const openAppBtn = document.getElementById('openAppBtn');
    if (openAppBtn) {
      openAppBtn.addEventListener('click', () => {
        this.incrementUsage();
      });
    }

    // Listen for scroll events to detect rapid scrolling behavior
    window.addEventListener('scroll', () => {
      const now = Date.now();
      if (now - this.lastScrollTime < this.scrollThreshold) {
        this.rapidScrollCount++;
      } else {
        this.rapidScrollCount = 0;  // reset if too slow
      }
      this.lastScrollTime = now;

      if (this.rapidScrollCount >= this.maxRapidScrolls) {
        this.triggerAlert('rapidScroll');
        this.rapidScrollCount = 0;  // reset after alert
      }
    });
  }

  incrementUsage() {
    this.usageCount++;
    if (this.usageCount >= this.usageLimit) {
      this.triggerAlert('usageLimit');
      this.usageCount = 0;  // reset usage count after alert
    }
    this.updateUsageDisplay();
  }

  updateUsageDisplay() {
    const usageDisplay = document.getElementById('usageCount');
    if (usageDisplay) {
      usageDisplay.textContent = `App opens: ${this.usageCount}`;
    }
  }

  triggerAlert(type) {
    let message = '';
    switch (type) {
      case 'rapidScroll':
        message = 'You are scrolling rapidly. Consider taking a mindful break.';
        break;
      case 'usageLimit':
        message = 'You have opened the app several times. How about a quick breathing exercise?';
        break;
      default:
        message = 'Take a moment to pause.';
    }
    // Dispatch a custom event so alerts.js can listen and show alert
    document.dispatchEvent(new CustomEvent('dopamineAlert', { detail: { message, type } }));
  }
}

// Initialize tracker when page loads
window.addEventListener('DOMContentLoaded', () => {
  window.usageTracker = new UsageTracker();
});
