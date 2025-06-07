// habits.js
// Manages micro-habits tracking, points, badges, and rewards

class HabitsManager {
  constructor() {
    this.habitsData = [];
    this.completedHabits = this.loadCompletedHabits();
    this.points = this.loadPoints();
    this.badges = this.loadBadges();

    this.loadHabitsData().then(() => {
      this.renderHabitsList();
      this.updatePointsDisplay();
      this.updateBadgesDisplay();
    });
  }

  async loadHabitsData() {
    try {
      const response = await fetch('./data/habits.json');
      this.habitsData = await response.json();
    } catch (err) {
      console.error('Failed to load habits data:', err);
      this.habitsData = [];
    }
  }

  loadCompletedHabits() {
    const saved = localStorage.getItem('completedHabits');
    return saved ? JSON.parse(saved) : {};
  }

  saveCompletedHabits() {
    localStorage.setItem('completedHabits', JSON.stringify(this.completedHabits));
  }

  loadPoints() {
    const saved = localStorage.getItem('points');
    return saved ? parseInt(saved, 10) : 0;
  }

  savePoints() {
    localStorage.setItem('points', this.points.toString());
  }

  loadBadges() {
    const saved = localStorage.getItem('badges');
    return saved ? JSON.parse(saved) : [];
  }

  saveBadges() {
    localStorage.setItem('badges', JSON.stringify(this.badges));
  }

  renderHabitsList() {
    const container = document.getElementById('habitsList');
    if (!container) return;

    container.innerHTML = '';
    this.habitsData.forEach(habit => {
      const habitCard = document.createElement('div');
      habitCard.className = 'habit-card';

      const title = document.createElement('h4');
      title.textContent = habit.name;
      habitCard.appendChild(title);

      const desc = document.createElement('p');
      desc.textContent = habit.description;
      habitCard.appendChild(desc);

      const points = document.createElement('span');
      points.className = 'habit-points';
      points.textContent = `Points: ${habit.points}`;
      habitCard.appendChild(points);

      const btn = document.createElement('button');
      btn.textContent = this.completedHabits[habit.id] ? 'Completed' : 'Complete Habit';
      btn.disabled = !!this.completedHabits[habit.id];
      btn.className = 'complete-btn';
      btn.addEventListener('click', () => this.completeHabit(habit.id, habit.points, btn));
      habitCard.appendChild(btn);

      container.appendChild(habitCard);
    });
  }

  completeHabit(habitId, points, btn) {
    if (this.completedHabits[habitId]) return;

    this.completedHabits[habitId] = true;
    this.points += points;

    btn.textContent = 'Completed';
    btn.disabled = true;

    this.saveCompletedHabits();
    this.savePoints();

    this.checkForBadges();
    this.updatePointsDisplay();
    this.updateBadgesDisplay();

    alert('Great job! You earned ' + points + ' points.');
  }

  updatePointsDisplay() {
    const pointsDisplay = document.getElementById('pointsDisplay');
    if (pointsDisplay) {
      pointsDisplay.textContent = `Total Points: ${this.points}`;
    }
  }

  checkForBadges() {
    // Simple badge system: award badges at certain points thresholds
    const badgeThresholds = [
      { points: 10, name: 'Getting Started', icon: '🏅' },
      { points: 30, name: 'Consistency', icon: '🎖️' },
      { points: 60, name: 'Dedicated', icon: '🏆' },
      { points: 100, name: 'Digital Freedom', icon: '🎉' },
    ];

    badgeThresholds.forEach(badge => {
      if (this.points >= badge.points && !this.badges.includes(badge.name)) {
        this.badges.push(badge.name);
        alert(`Congrats! You earned the "${badge.name}" badge! ${badge.icon}`);
      }
    });

    this.saveBadges();
  }

  updateBadgesDisplay() {
    const badgesContainer = document.getElementById('badgesDisplay');
    if (!badgesContainer) return;

    badgesContainer.innerHTML = '';

    if (this.badges.length === 0) {
      badgesContainer.textContent = 'No badges earned yet. Keep going!';
      return;
    }

    this.badges.forEach(badgeName => {
      const badgeEl = document.createElement('div');
      badgeEl.className = 'badge';
      badgeEl.textContent = badgeName;
      badgesContainer.appendChild(badgeEl);
    });
  }
}

// Initialize habits manager when DOM loaded
window.addEventListener('DOMContentLoaded', () => {
  window.habitsManager = new HabitsManager();
});
