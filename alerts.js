// alerts.js
// Handles dopamine alerts, micro-habit prompts, and dopamine-free mode blocking

class DopamineAlerts {
  constructor() {
    this.activeAlerts = [];
    this.dopamineFreeMode = false;
    this.blockedApps = ['Instagram', 'Facebook', 'TikTok'];
    this.init();
  }

  init() {
    // Listen for dopamineAlert events dispatched by tracker.js
    document.addEventListener('dopamineAlert', (e) => {
      this.showAlert(e.detail.message);
    });

    // Setup detox mode toggle button if available
    const detoxToggle = document.getElementById('detoxToggle');
    if (detoxToggle) {
      detoxToggle.addEventListener('click', () => this.toggleDetoxMode());
      this.updateDetoxToggleUI();
    }
  }

  showAlert(message) {
    // Create alert container if not present
    let alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) {
      alertContainer = document.createElement('div');
      alertContainer.id = 'alertContainer';
      alertContainer.className = 'alert-container';
      document.body.appendChild(alertContainer);
    }

    // Create alert message box
    const alertBox = document.createElement('div');
    alertBox.className = 'alert-box';
    alertBox.textContent = message;

    // Add micro-habit button to encourage quick positive action
    const microHabitBtn = document.createElement('button');
    microHabitBtn.className = 'micro-habit-btn';
    microHabitBtn.textContent = 'Try a Breathing Exercise';
    microHabitBtn.onclick = () => this.startMicroHabit('breathing');
    alertBox.appendChild(microHabitBtn);

    alertContainer.appendChild(alertBox);

    // Auto-remove alert after 10 seconds
    setTimeout(() => {
      alertBox.remove();
    }, 10000);
  }

  startMicroHabit(type) {
    alert('Let’s do a quick 1-minute breathing exercise. Breathe in... breathe out...'); 
    // Here you could trigger a real breathing animation or guided audio
  }

  toggleDetoxMode() {
    this.dopamineFreeMode = !this.dopamineFreeMode;
    this.updateDetoxToggleUI();
    if (this.dopamineFreeMode) {
      alert('Dopamine-Free Mode activated. Addictive apps are temporarily blocked.');
      this.blockApps();
    } else {
      alert('Dopamine-Free Mode deactivated. You can access apps now.');
      this.unblockApps();
    }
  }

  updateDetoxToggleUI() {
    const detoxToggle = document.getElementById('detoxToggle');
    if (!detoxToggle) return;
    detoxToggle.textContent = this.dopamineFreeMode ? 'Exit Dopamine-Free Mode' : 'Activate Dopamine-Free Mode';
    detoxToggle.classList.toggle('active', this.dopamineFreeMode);
  }

  blockApps() {
    // Simulate blocking by showing a full-screen overlay when user tries to open apps
    this.blockedApps.forEach(app => {
      // For demonstration, log blocked apps
      console.log(`Blocking app: ${app}`);
    });
    // You could add UI overlays or disable buttons to simulate blocking
  }

  unblockApps() {
    // Remove overlays or unblock functionality
    console.log('Apps unblocked');
  }
}

// Initialize alerts on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.dopamineAlerts = new DopamineAlerts();
});
