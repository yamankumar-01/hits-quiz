# 🎓 HITS – 10 MCQ Interactive Bilingual Quiz Application

A modern, responsive, and interactive bilingual (English & Hindi) Multiple Choice Question (MCQ) quiz web application built with clean semantic HTML5, modern CSS3 (Glassmorphism, custom themes), and vanilla JavaScript.

---

## 🌟 Key Features

1. **🌐 Bilingual Support (द्विभाषीय)**:
   - **Dual / Bilingual Mode**: Questions and options rendered in both Hindi and English simultaneously.
   - **Pure Hindi Mode**: Rendered exclusively in Hindi.
   - **Pure English Mode**: Rendered exclusively in English.
   - Instant language switching at any moment without resetting quiz progress.

2. **⚡ Practice & Exam Modes**:
   - **Practice Mode**: Provides instant audio-visual feedback on selection, shows green/red status, and displays a comprehensive rationale & explanation in both languages.
   - **Exam Mode**: Standard exam conditions where answers remain hidden until submission.

3. **🎨 Modern Aesthetics & Themes**:
   - Sleek dark theme by default with glowing radial backdrop orbs.
   - One-click Light / Dark mode toggle.
   - Built-in Web Audio API sound synthesizer (zero external audio file dependencies).
   - Canvas confetti shower for high scores (70%+).

4. **📊 Analytics & Scorecard**:
   - Animated SVG circular progress ring for final percentage score.
   - Metrics grid: Correct answers, Incorrect answers, Skipped questions, and Total time elapsed.
   - Detailed question-by-question review with filters: **All**, **Correct**, **Incorrect**, and **Flagged**.
   - Printable score report / certificate export option.

5. **⌨️ Accessibility & Keyboard Shortcuts**:
   - `A`, `B`, `C`, `D` or `1`, `2`, `3`, `4`: Select options.
   - `←` / `→` or `Enter`: Navigate between questions.
   - `F`: Flag / Unflag question for review.

---

## 📋 Questionnaire Syllabus & Topics Covered

| Q# | Topic | Key Concept | Correct Answer |
|---|---|---|---|
| Q1 | Educational Psychology | Multiple Intelligence Theory | B – Howard Gardner |
| Q2 | Pedagogy & Delivery | Multi-modal Presentation | C – Multiple ways / विभिन्न तरीकों से |
| Q3 | Bloom’s Taxonomy | Foundational Cognitive Level | C – Remember |
| Q4 | Pedagogic Techniques | Active Learning Methods | D – All of the above |
| Q5 | Communication Skills | Role of Strategic Pauses | B – Impactful delivery |
| Q6 | Presentation Dynamics | Meaning of Pacing | C – Variation in delivery speed |
| Q7 | Classroom Management | Handling Pressure Situations | C – Be composed under pressure |
| Q8 | Visual Design | 6 × 6 Presentation Rule | B – Concise slide text |
| Q9 | Facilitation & Body Language | Visual Delivery Best Practice | C – Maintain eye contact |
| Q10 | Public Speaking & Influence | Dale Carnegie's Magic Formula | D – All of the above |

---

## 🚀 How to Run Locally

Since this project uses pure HTML, CSS, and JavaScript, no server installation or build steps are required!

1. Double-click or open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).
2. Alternatively, run a local development server using Python or Node:
   ```bash
   # Using Python 3:
   python -m http.server 3000
   
   # Or using npx serve:
   npx serve .
   ```
3. Open `http://localhost:3000` in your browser.

---

## 🌐 Deploy to GitHub Pages (Free Hosting)

To make your quiz live on the internet:
1. Push this repository to GitHub.
2. Go to **Repository Settings** > **Pages**.
3. Under **Build and deployment** > **Branch**, select `main` (or `master`) and `/ (root)`.
4. Click **Save**. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within 1-2 minutes!
