# 🌟 AuraLite – AI Interview Practice Platform

A comprehensive, modern interview practice platform built with **HTML, CSS, and Vanilla JavaScript**. Practice interviews with an intelligent avatar interviewer and get detailed AI-powered feedback.

---

## 📋 Features

### 🎯 Core Features

1. **Authentication System**
   - Sign up with email and password
   - Secure login with localStorage
   - User session tracking

2. **Interview Simulation**
   - 5 job roles (Software Engineer, Product Manager, Data Scientist, Marketing, Sales)
   - 3 difficulty levels (Easy, Medium, Hard)
   - Dynamic role-specific questions
   - Real-time webcam preview
   - Audio/video recording

3. **3D Avatar Interviewer**
   - Animated canvas-based avatar
   - Real-time emotion display
   - Mouth animation during speaking
   - Eye movement tracking

4. **Real-time Analysis**
   - **Behavioral Analysis**
     - Confidence score
     - Eye contact tracking
     - Expression analysis
     - Posture assessment
   
   - **Vocal Feature Analysis**
     - Speech pace (WPM)
     - Clarity & articulation
     - Pitch variation
     - Filler word detection
   
   - **Semantic & Linguistic**
     - Response structure
     - STAR method effectiveness
     - Relevance scoring
     - Completeness index

5. **Performance Dashboard**
   - Session history with replay
   - Performance trends (charts)
   - Score breakdown (doughnut chart)
   - Emotion distribution
   - Vocal metrics radar
   - Detailed metric tracking
   - Improvement percentage

6. **Data Visualization**
   - Line charts for performance trends
   - Doughnut charts for category breakdown
   - Bar charts for emotion data
   - Radar charts for vocal metrics
   - Progress bars for detailed metrics
   - Gauge meters for overall score

---

## 📁 Project Structure

```
demoweb/
├── index.html          # Homepage with features & call-to-action
├── interview.html      # Interview simulation page
├── dashboard.html      # User dashboard with analytics
├── style.css           # Comprehensive styling (responsive)
├── script.js           # Homepage & navigation logic
├── auth.js             # Authentication system
├── avatar.js           # 3D avatar component
├── interview.js        # Interview simulation & analysis
└── dashboard.js        # Dashboard analytics & charts
```

---

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No server or backend required
- All data stored locally in browser localStorage

### Installation & Running

1. **Open the homepage:**
   ```
   Open index.html in your web browser
   ```

2. **Sign Up / Login:**
   - Click "Login / Sign Up" button
   - Create a new account or use test credentials
   - All data is stored in your browser's localStorage

3. **Start Interview:**
   - Click "Start Simulation" button
   - Select job role and difficulty
   - Answer interview questions
   - Get instant AI-powered feedback

4. **View Dashboard:**
   - Navigate to dashboard to see performance history
   - Track improvement over time
   - Replay past interview sessions

---

## 🎮 How to Use

### Interview Session

1. **Setup Phase**
   - Select your target job role
   - Choose interview difficulty (Easy/Medium/Hard)
   - Click "Start Interview"

2. **Interview Phase**
   - Your camera feed is displayed on the left
   - Interview questions on the right
   - Click "🎤 Start Recording" to answer
   - The avatar interviewer responds and reacts
   - Real-time metrics display (emotion, confidence, speaking)

3. **Results Phase**
   - See detailed performance scores
   - Overall performance gauge (0-100)
   - Breakdown of behavioral, vocal, and semantic metrics
   - Personalized recommendations
   - Options to retry or view dashboard

### Dashboard Features

- **Summary Cards**: Total sessions, average score, best score, improvement %
- **Performance Trends**: Line chart showing score progression
- **Score Breakdown**: Pie chart of behavioral/vocal/semantic scores
- **Emotion Analysis**: Bar chart of detected emotions
- **Vocal Metrics**: Radar chart for pace, clarity, pitch
- **Session History**: Replay past interviews
- **Detailed Metrics**: Progress bars for all dimensions

---

## 🔐 Authentication

The platform uses **localStorage** for data persistence:
- User accounts stored locally (no server required)
- Interview sessions saved per user
- Logout clears current session (data retained)
- Data persists across browser sessions

**Test Account:**
- Email: `test@example.com`
- Password: `test123`

---

## 🎨 Design & UX

### Color Scheme
- **Primary**: #667eea (Purple)
- **Secondary**: #f093fb (Pink)
- **Accent**: #4facfe (Blue)
- **Success**: #00d084 (Green)
- **Warning**: #ffa500 (Orange)
- **Danger**: #ff6b6b (Red)

### Responsive Design
- **Desktop**: Full-featured experience
- **Tablet**: Optimized grid layouts
- **Mobile**: Stacked layouts, touch-friendly buttons

### Animations
- Smooth transitions and hover effects
- Avatar facial animations
- Chart animations
- Progress bar animations

---

## 💾 Data Storage

All data is stored in **browser localStorage** under these keys:
- `currentUser`: Current logged-in user
- `allUsers`: All registered users with their sessions

**Structure:**
```javascript
User {
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: ISO string,
    sessions: [
        {
            id: string,
            role: string,
            difficulty: string,
            score: number,
            duration: number,
            timestamp: ISO string
        }
    ]
}
```

---

## 📊 Performance Metrics Explained

### Behavioral Analysis (25% of score)
- **Confidence**: How assured you appear
- **Eye Contact**: Looking directly at camera
- **Expression**: Natural facial expressions
- **Posture**: Sitting upright, professional stance

### Vocal Analysis (35% of score)
- **Pace**: Speaking speed in WPM (120-150 ideal)
- **Clarity**: How clearly you enunciate
- **Pitch Variation**: Avoiding monotone delivery
- **Filler Words**: Reducing "um", "uh", "like"

### Semantic Analysis (40% of score)
- **Structure**: Clear beginning-middle-end
- **STAR Method**: Situation-Task-Action-Result framework
- **Relevance**: How well you address the question
- **Completeness**: Providing sufficient detail

---

## 🔧 Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Charts**: Chart.js 3.9.1 (CDN)
- **Face Detection**: face-api.js (CDN)
- **Storage**: Browser localStorage
- **Canvas**: Custom 3D avatar rendering
- **Media**: getUserMedia API (webcam & microphone)

---

## 🌐 Browser Compatibility

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+

**Required Permissions:**
- Camera access (for video feed)
- Microphone access (for audio recording)
- Storage access (for localStorage)

---

## 📝 Interview Questions by Role

### Software Engineer
- Easy: Tell me about yourself, programming languages, projects
- Medium: System design, technical debt, learning new tech
- Hard: Architecture design, database optimization, team decisions

### Product Manager
- Easy: Why PM, product improvements
- Medium: Product development process, prioritization
- Hard: Strategy, market research, stakeholder management

### Data Scientist
- Easy: About yourself, ML algorithms
- Medium: Classification problems, model evaluation, big data
- Hard: Recommendation systems, anomaly detection, complex problems

### Marketing Manager
- Easy: Marketing interest, admired campaigns
- Medium: Go-to-market, digital marketing, content strategy
- Hard: Strategy from scratch, brand building, ROI

### Sales Executive
- Easy: Sales experience, rapport building
- Medium: Sales process, objection handling, prospecting
- Hard: Enterprise sales, complex negotiations, relationships

---

## 🐛 Troubleshooting

**Webcam not showing:**
- Check browser permissions
- Ensure no other app is using the camera
- Try refreshing the page

**Microphone not recording:**
- Check microphone is not muted
- Check browser audio permissions
- Test microphone in system settings

**Charts not displaying:**
- Ensure Chart.js CDN is loaded
- Check browser console for errors
- Try clearing browser cache

**Avatar not animating:**
- Avatar uses Canvas API - should work in all modern browsers
- If frozen, refresh the page

---

## 📈 Future Enhancements

- [ ] AI-powered backend analysis using real ML models
- [ ] Support for more job roles and domains
- [ ] Multi-language interview support
- [ ] Video upload and analysis
- [ ] Peer comparison and leaderboards
- [ ] Interview transcripts and export
- [ ] Mobile app version
- [ ] Live feedback during interview
- [ ] Integration with job boards

---

## 📄 License

This project is open source and available for educational use.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Improve UI/UX
- Optimize performance

---

## 📧 Support

For issues or questions:
- Check the troubleshooting section
- Review the code comments
- Test in a different browser

---

**Built with ❤️ using vanilla web technologies**

**AuraLite – Master Your Interview Skills** 🚀
