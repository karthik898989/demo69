/* ============================================
   DASHBOARD LOGIC
   ============================================ */

document.addEventListener('DOMContentLoaded', async () => {
    // Defensive: ensure auth system is available
    if (typeof auth === 'undefined') {
        console.warn('Auth system not found. Redirecting to home.');
        window.location.href = 'index.html';
        return;
    }

    // Check if user is logged in
    if (!auth.isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }

    const currentUser = auth.getCurrentUser();
    const sessions = auth.getUserSessions();

    // Update user greeting
    document.getElementById('user-greeting').textContent = `Welcome, ${currentUser.name}!`;

    // Calculate statistics
    const stats = calculateStats(sessions);

    // Update summary cards
    document.getElementById('total-sessions').textContent = sessions.length;
    document.getElementById('avg-score').textContent = stats.avgScore.toFixed(0);
    document.getElementById('best-score').textContent = stats.bestScore;
    document.getElementById('improvement').textContent = stats.improvement + '%';

    // Initialize charts
    initCharts(sessions, stats);

    // Update detailed metrics
    updateDetailedMetrics(stats);

    // Populate session history
    populateSessionHistory(sessions);

    // Replay modal
    const replayModal = document.getElementById('replay-modal');
    const closeBtn = replayModal?.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            replayModal.classList.add('hidden');
        });
    }
});

function calculateStats(sessions) {
    if (sessions.length === 0) {
        return {
            avgScore: 0,
            bestScore: 0,
            worstScore: 0,
            improvement: 0,
            byRole: {},
            byDifficulty: {},
            emotionData: { happy: 0, neutral: 0, nervous: 0 },
            vocalData: { pace: 0, clarity: 0, pitch: 0 }
        };
    }

    const scores = sessions.map(s => s.score || 0);
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const bestScore = Math.max(...scores);
    const worstScore = Math.min(...scores);
    const improvement = sessions.length > 1 
        ? Math.max(0, Math.round(((scores[scores.length - 1] - scores[0]) / scores[0]) * 100))
        : 0;

    // Average by role
    const byRole = {};
    sessions.forEach(s => {
        if (!byRole[s.role]) byRole[s.role] = [];
        byRole[s.role].push(s.score);
    });

    // Simulate additional metrics
    const avgBehavioral = {
        confidence: 72 + Math.floor(Math.random() * 20),
        eyeContact: 68 + Math.floor(Math.random() * 25),
        expression: 75 + Math.floor(Math.random() * 20),
        posture: 70 + Math.floor(Math.random() * 25)
    };

    const avgVocal = {
        pace: 125 + Math.floor(Math.random() * 30),
        clarity: 78 + Math.floor(Math.random() * 20),
        pitch: 72 + Math.floor(Math.random() * 25),
        fillerWords: Math.floor(Math.random() * 5)
    };

    const avgSemantic = {
        structure: 74 + Math.floor(Math.random() * 20),
        starMethod: 70 + Math.floor(Math.random() * 25),
        relevance: 78 + Math.floor(Math.random() * 18),
        completeness: 72 + Math.floor(Math.random() * 22)
    };

    return {
        avgScore: avgScore,
        bestScore: bestScore,
        worstScore: worstScore,
        improvement: improvement,
        byRole: byRole,
        behavioral: avgBehavioral,
        vocal: avgVocal,
        semantic: avgSemantic,
        emotionData: {
            happy: Math.floor(Math.random() * 30 + 20),
            neutral: Math.floor(Math.random() * 25 + 20),
            nervous: Math.floor(Math.random() * 20 + 10),
            confident: Math.floor(Math.random() * 30 + 25)
        },
        vocalData: {
            pace: Math.floor(Math.random() * 30 + 70),
            clarity: Math.floor(Math.random() * 25 + 75),
            pitch: Math.floor(Math.random() * 30 + 70)
        }
    };
}

function initCharts(sessions, stats) {
    // Trend Chart
    if (document.getElementById('trend-chart')) {
        const labels = sessions.map((_, i) => `Session ${i + 1}`);
        const scores = sessions.map(s => s.score || 0);
        
        const trendCtx = document.getElementById('trend-chart').getContext('2d');
        new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Performance Score',
                    data: scores,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: '#667eea'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: true }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { color: '#718096' }
                    },
                    x: {
                        ticks: { color: '#718096' }
                    }
                }
            }
        });
    }

    // Category Breakdown
    if (document.getElementById('category-chart')) {
        const categoryCtx = document.getElementById('category-chart').getContext('2d');
        new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Behavioral', 'Vocal', 'Semantic'],
                datasets: [{
                    data: [
                        Math.round((stats.behavioral.confidence + stats.behavioral.eyeContact + stats.behavioral.expression + stats.behavioral.posture) / 4),
                        Math.round((stats.vocal.clarity + 70) / 2),
                        Math.round((stats.semantic.structure + stats.semantic.starMethod + stats.semantic.relevance + stats.semantic.completeness) / 4)
                    ],
                    backgroundColor: ['#667eea', '#f093fb', '#4facfe'],
                    borderColor: 'white',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    // Emotion Distribution
    if (document.getElementById('emotion-chart')) {
        const emotionCtx = document.getElementById('emotion-chart').getContext('2d');
        new Chart(emotionCtx, {
            type: 'bar',
            data: {
                labels: ['Happy', 'Neutral', 'Nervous', 'Confident'],
                datasets: [{
                    label: 'Frequency',
                    data: [
                        stats.emotionData.happy,
                        stats.emotionData.neutral,
                        stats.emotionData.nervous,
                        stats.emotionData.confident
                    ],
                    backgroundColor: ['#00d084', '#a0a0ff', '#ff6b6b', '#667eea'],
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#718096' }
                    },
                    x: {
                        ticks: { color: '#718096' }
                    }
                }
            }
        });
    }

    // Vocal Metrics
    if (document.getElementById('vocal-chart')) {
        const vocalCtx = document.getElementById('vocal-chart').getContext('2d');
        new Chart(vocalCtx, {
            type: 'radar',
            data: {
                labels: ['Pace', 'Clarity', 'Pitch Variation'],
                datasets: [{
                    label: 'Performance %',
                    data: [
                        stats.vocalData.pace,
                        stats.vocalData.clarity,
                        stats.vocalData.pitch
                    ],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#667eea'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
}

function updateDetailedMetrics(stats) {
    // Behavioral metrics
    updateMetric('metric-confidence', stats.behavioral.confidence);
    updateMetric('metric-eye-contact', stats.behavioral.eyeContact);
    updateMetric('metric-expression', stats.behavioral.expression);
    updateMetric('metric-posture', stats.behavioral.posture);

    // Vocal metrics
    updateMetric('metric-pace', Math.min(100, (stats.vocal.pace / 160) * 100));
    updateMetric('metric-clarity', stats.vocal.clarity);
    updateMetric('metric-pitch', stats.vocal.pitch);

    // Semantic metrics
    updateMetric('metric-structure', stats.semantic.structure);
    updateMetric('metric-star', stats.semantic.starMethod);
    updateMetric('metric-relevance', stats.semantic.relevance);
    updateMetric('metric-completeness', stats.semantic.completeness);
}

function updateMetric(id, value) {
    const bar = document.getElementById(id);
    const valSpan = document.getElementById(id + '-val');
    if (bar) bar.style.width = value + '%';
    if (valSpan) valSpan.textContent = Math.round(value) + '%';
}

function populateSessionHistory(sessions) {
    const tbody = document.getElementById('session-history');
    
    if (sessions.length === 0) {
        tbody.innerHTML = '<tr class="empty-state"><td colspan="6">No interview sessions yet. <a href="interview.html">Start practicing now!</a></td></tr>';
        return;
    }

    tbody.innerHTML = sessions.map((session, index) => {
        const date = new Date(session.timestamp);
        const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const duration = Math.floor(session.duration / 60) + 'm ' + (session.duration % 60) + 's';

        return `
            <tr>
                <td>${formattedDate}</td>
                <td>${session.role.replace('-', ' ').toUpperCase()}</td>
                <td><span style="background: ${getDifficultyColor(session.difficulty)}; color: white; padding: 4px 12px; border-radius: 12px;">${session.difficulty.toUpperCase()}</span></td>
                <td><strong>${session.score}/100</strong></td>
                <td>${duration}</td>
                <td>
                    <button class="replay-btn btn btn-secondary" data-index="${index}">Replay</button>
                </td>
            </tr>
        `;
    }).join('');

    // Add replay listeners
    document.querySelectorAll('.replay-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            showReplay(sessions[index]);
        });
    });
}

function getDifficultyColor(difficulty) {
    const colors = {
        easy: '#00d084',
        medium: '#ffa500',
        hard: '#ff6b6b'
    };
    return colors[difficulty] || '#667eea';
}

function showReplay(session) {
    const replayModal = document.getElementById('replay-modal');
    const date = new Date(session.timestamp);
    
    document.getElementById('replay-date').textContent = date.toLocaleDateString();
    document.getElementById('replay-score').textContent = session.score;
    document.getElementById('replay-duration').textContent = Math.floor(session.duration / 60) + 'm';
    document.getElementById('replay-role').textContent = session.role.replace('-', ' ').toUpperCase();

    // Placeholder video - in production, this would be the actual recording
    const videoElement = document.getElementById('replay-video');
    videoElement.src = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc2FjLnYxAAAAAImf3c/I';

    replayModal.classList.remove('hidden');
}
