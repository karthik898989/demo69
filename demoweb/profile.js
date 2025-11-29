document.addEventListener('DOMContentLoaded', () => {
  if (typeof auth === 'undefined' || !auth.isLoggedIn()) {
    window.location.href = 'index.html';
    return;
  }

  const user = auth.getCurrentUser();
  const nameEl = document.getElementById('profile-name');
  const emailEl = document.getElementById('profile-email');
  const sessionsTbody = document.getElementById('profile-sessions');

  nameEl.textContent = user.name || 'Profile';
  emailEl.textContent = user.email || '';

  // Populate sessions
  const sessions = auth.getUserSessions() || [];
  if (!sessions || sessions.length === 0) {
    sessionsTbody.innerHTML = '<tr class="empty-state"><td colspan="6">No sessions yet. <a href="interview.html">Start a practice</a></td></tr>';
  } else {
    sessionsTbody.innerHTML = sessions.map((s) => {
      const date = new Date(s.timestamp);
      const formatted = date.toLocaleDateString();
      const duration = Math.floor(s.duration / 60) + 'm ' + (s.duration % 60) + 's';
      return `
        <tr>
          <td>${formatted}</td>
          <td>${(s.role||'').replace('-', ' ').toUpperCase()}</td>
          <td>${(s.difficulty||'').toUpperCase()}</td>
          <td><strong>${s.score||0}/100</strong></td>
          <td>${duration}</td>
          <td><button class="btn btn-secondary" onclick="alert('Replay not available in demo')">Replay</button></td>
        </tr>
      `;
    }).join('');
  }

  // Edit profile modal
  const editBtn = document.getElementById('edit-profile-btn');
  const editModal = document.getElementById('edit-modal');
  const closeBtn = editModal.querySelector('.close-btn');
  const saveBtn = document.getElementById('save-profile-btn');
  const editName = document.getElementById('edit-name');
  const editEmail = document.getElementById('edit-email');

  editName.value = user.name || '';
  editEmail.value = user.email || '';

  editBtn.addEventListener('click', () => editModal.classList.remove('hidden'));
  closeBtn.addEventListener('click', () => editModal.classList.add('hidden'));

  saveBtn.addEventListener('click', () => {
    const newName = editName.value.trim();
    if (!newName) return alert('Name required');

    // update in stored users list
    const all = auth.getStoredUsers();
    const idx = all.findIndex(u => u.email === user.email);
    if (idx !== -1) {
      all[idx].name = newName;
      auth.saveAllUsers(all);
      auth.saveUser({ id: all[idx].id, name: newName, email: all[idx].email });
      alert('Profile updated');
      window.location.reload();
    }
  });

  // Logout
  const logoutBtn = document.getElementById('logout-btn');
  const logoutLink = document.getElementById('logout-link');
  [logoutBtn, logoutLink].forEach(el => {
    if (el) el.addEventListener('click', (e) => {
      e.preventDefault();
      auth.logout();
      window.location.href = 'index.html';
    });
  });
});