/* ============================================
   INTERVIEW QUESTIONS DATABASE
   ============================================ */

const interviewQuestions = {
    'software-engineer': {
        easy: [
            'Tell me about yourself.',
            'Why are you interested in this position?',
            'What is your strongest programming language?',
            'Describe a project you\'re proud of.',
            'How do you approach debugging code?'
        ],
        medium: [
            'Walk me through your approach to designing a scalable system.',
            'How do you handle technical debt in a project?',
            'Tell me about a time you had to learn a new technology quickly.',
            'How do you approach code reviews?',
            'Describe a challenging bug you fixed.'
        ],
        hard: [
            'Design a real-time collaborative editing system.',
            'How would you optimize a slow database query affecting millions of users?',
            'Explain your approach to building a microservices architecture.',
            'Tell me about a time you led a technical decision that had major impact.',
            'How do you handle conflicting requirements from stakeholders?'
        ]
    },
    'product-manager': {
        easy: [
            'Tell me about yourself.',
            'Why do you want to be a Product Manager?',
            'Describe a product you use daily and how you\'d improve it.',
            'What is your approach to user research?'
        ],
        medium: [
            'Walk me through your product development process.',
            'How would you decide between two feature requests?',
            'Tell me about a time you made a tough prioritization decision.',
            'How do you measure product success?'
        ],
        hard: [
            'How would you build a product strategy for a new market?',
            'Tell me about a product failure you learned from.',
            'How do you balance user needs with business goals?'
        ]
    },
    'data-scientist': {
        easy: [
            'Tell me about yourself.',
            'What ML algorithms are you most comfortable with?',
            'Describe a data analysis project you\'ve done.',
            'How do you handle missing data?'
        ],
        medium: [
            'Walk me through your approach to a classification problem.',
            'How do you prevent overfitting in your models?',
            'Tell me about your experience with big data tools.',
            'How do you evaluate model performance?'
        ],
        hard: [
            'Design a recommendation system for an e-commerce platform.',
            'How would you identify anomalies in large datasets?',
            'Tell me about a complex ML problem you\'ve solved.'
        ]
    },
    'marketing': {
        easy: [
            'Tell me about yourself.',
            'Why are you interested in marketing?',
            'Describe a marketing campaign you admire.',
            'How do you measure marketing success?'
        ],
        medium: [
            'How would you develop a go-to-market strategy for a new product?',
            'Tell me about your experience with digital marketing.',
            'How do you approach content strategy?',
            'What metrics do you track for campaigns?'
        ],
        hard: [
            'Design a marketing strategy for a B2B SaaS product.',
            'How would you build a brand from scratch?',
            'Tell me about a campaign where you drove significant ROI.'
        ]
    },
    'sales': {
        easy: [
            'Tell me about yourself.',
            'Why are you interested in sales?',
            'Describe your sales experience.',
            'How do you build rapport with clients?'
        ],
        medium: [
            'Walk me through your sales process.',
            'How do you handle objections?',
            'Tell me about a challenging sale you closed.',
            'How do you prospect for new business?'
        ],
        hard: [
            'How would you approach selling to enterprise customers?',
            'Tell me about a complex negotiation you led.',
            'How do you build long-term customer relationships?'
        ]
    }
};

/* ============================================
   INTERVIEW MANAGER
   ============================================ */

class InterviewManager {
    constructor() {
        this.currentQuestion = 0;
        this.questions = [];
        this.jobRole = '';
        this.difficulty = 'medium';
        this.startTime = null;
        this.recordedAudio = null;
        this.userResponse = '';
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.isRecording = false;
        this.analysisResults = null;
    }

    setupInterview(role, difficulty) {
        this.jobRole = role;
        this.difficulty = difficulty;
        this.questions = interviewQuestions[role][difficulty] || [];
        this.currentQuestion = 0;
        this.startTime = Date.now();
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestion] || '';
    }

    nextQuestion() {
        this.currentQuestion++;
        return this.currentQuestion < this.questions.length;
    }

    getSessionDuration() {
        return Math.round((Date.now() - this.startTime) / 1000);
    }

    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];

            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };

            this.mediaRecorder.onstop = () => {
                this.recordedAudio = new Blob(this.audioChunks, { type: 'audio/webm' });
            };

            this.mediaRecorder.start();
            this.isRecording = true;

            if (avatar) avatar.setTalking(true);
            return true;
        } catch (error) {
            console.error('Recording error:', error);
            return false;
        }
    }

    stopRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;
            if (avatar) avatar.setTalking(false);
        }
    }

    async analyzeResponse(responseText) {
        // Simulate analysis
        const analysis = {
            overall: Math.floor(Math.random() * 40 + 60), // 60-100
            behavioral: {
                confidence: Math.floor(Math.random() * 30 + 70),
                eyeContact: Math.floor(Math.random() * 30 + 65),
                expression: Math.floor(Math.random() * 35 + 70),
                posture: Math.floor(Math.random() * 30 + 72)
            },
            vocal: {
                pace: 120 + Math.floor(Math.random() * 40), // WPM
                clarity: Math.floor(Math.random() * 30 + 75),
                pitchVariation: Math.floor(Math.random() * 35 + 70),
                fillerWords: Math.floor(Math.random() * 8)
            },
            semantic: {
                structure: Math.floor(Math.random() * 35 + 70),
                starMethod: Math.floor(Math.random() * 30 + 65),
                relevance: Math.floor(Math.random() * 25 + 75),
                completeness: Math.floor(Math.random() * 30 + 70)
            },
            recommendations: this.generateRecommendations(responseText)
        };

        this.analysisResults = analysis;
        return analysis;
    }

    generateRecommendations(responseText) {
        const recommendations = [];
        const words = responseText.toLowerCase().split(' ').length;

        if (words < 50) {
            recommendations.push('Try to provide more detailed answers with specific examples.');
        }
        if (words > 300) {
            recommendations.push('Consider being more concise - aim for 50-200 words per answer.');
        }
        if (!responseText.includes('I') && !responseText.includes('my')) {
            recommendations.push('Use more personal examples and "I" statements to show ownership.');
        }
        if (recommendations.length < 2) {
            recommendations.push('Maintain steady eye contact and speak with confidence.');
        }
        if (recommendations.length < 3) {
            recommendations.push('Use the STAR method (Situation, Task, Action, Result) for behavioral questions.');
        }
        if (recommendations.length < 4) {
            recommendations.push('Reduce filler words like "um", "uh", and "like".');
        }

        return recommendations;
    }
}

const interviewManager = new InterviewManager();

/* ============================================
   INTERVIEW PAGE LOGIC
   ============================================ */

document.addEventListener('DOMContentLoaded', async () => {
    const setupModal = document.getElementById('setup-modal');
    const interviewView = document.getElementById('interview-view');
    const startBtn = document.getElementById('start-interview-btn');
    const recordBtn = document.getElementById('record-btn');
    const nextBtn = document.getElementById('next-question-btn');
    const finishBtn = document.getElementById('finish-interview-btn');
    const resultsModal = document.getElementById('results-modal');
    const retryBtn = document.getElementById('retry-btn');
    const dashboardBtn = document.getElementById('view-dashboard-btn');
    const homeBtn = document.getElementById('home-btn');

    // Initialize webcam
    const initWebcam = async () => {
        const video = document.getElementById('user-webcam');
        if (!video) return;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480 },
                audio: true
            });
            video.srcObject = stream;
        } catch (error) {
            console.error('Webcam error:', error);
            alert('Please allow camera and microphone access.');
        }
    };

    // Load face-api models
    const loadFaceApiModels = async () => {
        try {
            if (typeof faceapi === 'undefined') return;
            
            const modelPath = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@latest/model/';
            await Promise.all([
                faceapi.nets.tinyFaceDetector.load(modelPath),
                faceapi.nets.faceExpressionNet.load(modelPath)
            ]);
        } catch (error) {
            console.error('Face API loading error:', error);
        }
    };

    // Setup Interview
    if (startBtn) {
        startBtn.addEventListener('click', async () => {
            const role = document.getElementById('job-role').value;
            const difficulty = document.querySelector('.difficulty-btn.active').dataset.level;

            interviewManager.setupInterview(role, difficulty);
            document.getElementById('role-display').textContent = role.replace('-', ' ').toUpperCase();

            setupModal.classList.add('hidden');
            interviewView.classList.remove('hidden');

            await initWebcam();
            await loadFaceApiModels();
            updateQuestion();
        });
    }

    // Difficulty buttons
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Session timer
    setInterval(() => {
        const time = interviewManager.getSessionDuration();
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        const timeDisplay = document.getElementById('session-time');
        if (timeDisplay) {
            timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }, 1000);

    // Update question display
    function updateQuestion() {
        const question = interviewManager.getCurrentQuestion();
        document.getElementById('current-question').textContent = question;
        document.getElementById('response-text').textContent = 'Speak to see transcript here...';
    }

    // Recording
    let recordingStarted = false;
    if (recordBtn) {
        recordBtn.addEventListener('click', async () => {
            if (!recordingStarted) {
                const success = await interviewManager.startRecording();
                if (success) {
                    recordBtn.textContent = '⏹️ Stop Recording';
                    recordBtn.classList.add('recording');
                    recordingStarted = true;
                }
            } else {
                interviewManager.stopRecording();
                recordBtn.textContent = '🎤 Start Recording';
                recordBtn.classList.remove('recording');
                recordingStarted = false;

                nextBtn.style.display = 'inline-block';
                if (interviewManager.currentQuestion === interviewManager.questions.length - 1) {
                    finishBtn.style.display = 'inline-block';
                }
            }
        });
    }

    // Next question
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (interviewManager.nextQuestion()) {
                updateQuestion();
                nextBtn.style.display = 'none';
                finishBtn.style.display = 'none';
                recordBtn.style.display = 'inline-block';
                recordBtn.textContent = '🎤 Start Recording';
                recordingStarted = false;
            }
        });
    }

    // Finish interview
    if (finishBtn) {
        finishBtn.addEventListener('click', async () => {
            interviewView.classList.add('hidden');
            
            // Simulate analysis
            const responseText = interviewManager.getCurrentQuestion();
            const results = await interviewManager.analyzeResponse(responseText);
            
            displayResults(results);
            resultsModal.classList.remove('hidden');
        });
    }

    // Results actions
    if (retryBtn) {
        retryBtn.addEventListener('click', () => {
            resultsModal.classList.add('hidden');
            setupModal.classList.remove('hidden');
            location.reload();
        });
    }

    if (dashboardBtn) {
        dashboardBtn.addEventListener('click', () => {
            // Save session
            auth.saveSession({
                role: interviewManager.jobRole,
                difficulty: interviewManager.difficulty,
                score: interviewManager.analysisResults.overall,
                duration: interviewManager.getSessionDuration(),
                timestamp: new Date().toISOString()
            });
            window.location.href = 'dashboard.html';
        });
    }

    if (homeBtn) {
        homeBtn.addEventListener('click', () => {
            // Save session
            auth.saveSession({
                role: interviewManager.jobRole,
                difficulty: interviewManager.difficulty,
                score: interviewManager.analysisResults.overall,
                duration: interviewManager.getSessionDuration(),
                timestamp: new Date().toISOString()
            });
            window.location.href = 'index.html';
        });
    }

    // Display results
    function displayResults(results) {
        // Overall score
        document.getElementById('overall-score').textContent = results.overall;
        const gaugeCircle = document.getElementById('overall-gauge');
        if (gaugeCircle) {
            const circumference = 2 * Math.PI * 50;
            const offset = circumference * (1 - results.overall / 100);
            gaugeCircle.style.strokeDashoffset = offset;
        }

        // Behavioral
        updateMetricDisplay('conf', results.behavioral.confidence);
        updateMetricDisplay('eye', results.behavioral.eyeContact);
        updateMetricDisplay('expr', results.behavioral.expression);
        updateMetricDisplay('pos', results.behavioral.posture);

        // Vocal
        updateMetricDisplay('pace', Math.min(100, (results.vocal.pace / 160) * 100));
        updateMetricDisplay('clarity', results.vocal.clarity);
        updateMetricDisplay('pitch', results.vocal.pitchVariation);
        document.getElementById('filler-bar').style.width = (results.vocal.fillerWords * 12) + '%';
        document.getElementById('filler-score').textContent = results.vocal.fillerWords;

        // Semantic
        updateMetricDisplay('struct', results.semantic.structure);
        updateMetricDisplay('star', results.semantic.starMethod);
        updateMetricDisplay('relevance', results.semantic.relevance);
        updateMetricDisplay('complete', results.semantic.completeness);

        // Recommendations
        const recList = document.getElementById('recommendations-list');
        recList.innerHTML = results.recommendations
            .map(rec => `<div class="recommendation-item">${rec}</div>`)
            .join('');
    }

    function updateMetricDisplay(id, value) {
        const bar = document.getElementById(`${id}-bar`);
        const score = document.getElementById(`${id}-score`);
        if (bar) bar.style.width = value + '%';
        if (score) score.textContent = Math.round(value) + '%';
    }
});
