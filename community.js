// community.js
// Handles community challenges, user participation, and social accountability features

class CommunityManager {
  constructor() {
    this.challenges = [
      {
        id: 'challenge1',
        title: '3-Day Social Media Detox',
        description: 'Avoid all social media for 3 days and journal your experience.',
        durationDays: 3,
        participants: 0,
      },
      {
        id: 'challenge2',
        title: 'Daily Mindfulness Challenge',
        description: 'Practice mindfulness meditation for at least 5 minutes every day for a week.',
        durationDays: 7,
        participants: 0,
      },
      {
        id: 'challenge3',
        title: 'Reduce Screen Time by 30%',
        description: 'Track and reduce your daily screen time on social media by 30% for two weeks.',
        durationDays: 14,
        participants: 0,
      },
    ];

    this.userChallenges = this.loadUserChallenges();
    this.renderChallenges();
  }

  loadUserChallenges() {
    const saved = localStorage.getItem('userChallenges');
    return saved ? JSON.parse(saved) : {};
  }

  saveUserChallenges() {
    localStorage.setItem('userChallenges', JSON.stringify(this.userChallenges));
  }

  renderChallenges() {
    const container = document.getElementById('communityChallenges');
    if (!container) return;

    container.innerHTML = '';
    this.challenges.forEach(challenge => {
      const card = document.createElement('div');
      card.className = 'challenge-card';

      const title = document.createElement('h4');
      title.textContent = challenge.title;
      card.appendChild(title);

      const desc = document.createElement('p');
      desc.textContent = challenge.description;
      card.appendChild(desc);

      const participants = document.createElement('span');
      participants.className = 'participants-count';
      participants.textContent = `Participants: ${challenge.participants}`;
      card.appendChild(participants);

      const status = document.createElement('div');
      status.className = 'challenge-status';

      if (this.userChallenges[challenge.id]) {
        status.textContent = 'You are participating';
        status.classList.add('participating');
      } else {
        const joinBtn = document.createElement('button');
        joinBtn.textContent = 'Join Challenge';
        joinBtn.className = 'join-btn';
        joinBtn.addEventListener('click', () => this.joinChallenge(challenge.id, participants, status, joinBtn));
        status.appendChild(joinBtn);
      }

      card.appendChild(status);
      container.appendChild(card);
    });
  }

  joinChallenge(challengeId, participantsEl, statusEl, joinBtn) {
    if (this.userChallenges[challengeId]) return;

    this.userChallenges[challengeId] = {
      startDate: new Date().toISOString(),
      progress: 0,
    };

    // Increase participant count visually
    const challenge = this.challenges.find(c => c.id === challengeId);
    if (challenge) {
      challenge.participants++;
      participantsEl.textContent = `Participants: ${challenge.participants}`;
    }

    this.saveUserChallenges();

    // Update UI
    statusEl.textContent = 'You are participating';
    statusEl.classList.add('participating');
    if (joinBtn) joinBtn.remove();

    alert(`You joined the "${challenge.title}"! Good luck!`);
  }
}

// Initialize community manager
window.addEventListener('DOMContentLoaded', () => {
  window.communityManager = new CommunityManager();
});
