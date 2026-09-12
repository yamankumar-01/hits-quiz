// HITS – 10 MCQ Interactive App Engine
document.addEventListener('DOMContentLoaded', () => {
  // App State
  const state = {
    userName: localStorage.getItem('hits_quiz_current_user') || '',
    currentIndex: 0,
    answers: {}, // { [questionId]: 'A' | 'B' | ... }
    flagged: new Set(),
    language: 'bi', // 'bi' | 'hi' | 'en'
    mode: 'exam', // 'exam' (score shown strictly at the end) | 'practice' (instant feedback)
    theme: localStorage.getItem('quiz_theme') || 'dark',
    sound: true,
    timeSeconds: 0,
    timerActive: false,
    quizFinished: false
  };

  // DOM Elements
  const el = {
    app: document.querySelector('.app-container'),
    themeToggle: document.getElementById('themeToggle'),
    soundToggle: document.getElementById('soundToggle'),
    langBtns: document.querySelectorAll('[data-lang]'),
    modeBtns: document.querySelectorAll('[data-mode]'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    progressPercent: document.getElementById('progressPercent'),
    timerDisplay: document.getElementById('timerDisplay'),
    userBadge: document.getElementById('userBadge'),
    currentUserNameDisplay: document.getElementById('currentUserNameDisplay'),
    nameModal: document.getElementById('nameModal'),
    nameForm: document.getElementById('nameForm'),
    nameInput: document.getElementById('nameInput'),
    paletteContainer: document.getElementById('paletteContainer'),
    quizCard: document.getElementById('quizCard'),
    categoryTag: document.getElementById('categoryTag'),
    flagBtn: document.getElementById('flagBtn'),
    questionText: document.getElementById('questionText'),
    questionSubtext: document.getElementById('questionSubtext'),
    optionsGrid: document.getElementById('optionsGrid'),
    explanationBox: document.getElementById('explanationBox'),
    explanationHeader: document.getElementById('explanationHeader'),
    explanationText: document.getElementById('explanationText'),
    explanationSubtext: document.getElementById('explanationSubtext'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    submitBtn: document.getElementById('submitBtn'),
    resultsScreen: document.getElementById('resultsScreen'),
    confettiCanvas: document.getElementById('confettiCanvas')
  };

  // Web Audio Synthesizer for UI Sounds (zero external dependencies)
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playSound(type) {
    if (!state.sound) return;
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'correct') {
        // Uplifting arpeggio
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const noteOsc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          noteOsc.connect(noteGain);
          noteGain.connect(ctx.destination);
          noteOsc.type = 'triangle';
          noteOsc.frequency.setValueAtTime(freq, now + i * 0.07);
          noteGain.gain.setValueAtTime(0.15, now + i * 0.07);
          noteGain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.07 + 0.2);
          noteOsc.start(now + i * 0.07);
          noteOsc.stop(now + i * 0.07 + 0.22);
        });
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'fanfare') {
        [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, idx) => {
          const fOsc = ctx.createOscillator();
          const fGain = ctx.createGain();
          fOsc.connect(fGain);
          fGain.connect(ctx.destination);
          fOsc.type = 'sine';
          fOsc.frequency.setValueAtTime(freq, now + idx * 0.12);
          fGain.gain.setValueAtTime(0.18, now + idx * 0.12);
          fGain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.4);
          fOsc.start(now + idx * 0.12);
          fOsc.stop(now + idx * 0.12 + 0.45);
        });
      }
    } catch (e) {
      console.warn("Audio unavailable:", e);
    }
  }

  // Timer: Runs every second once quiz is started
  setInterval(() => {
    if (!state.timerActive || state.quizFinished) return;
    state.timeSeconds++;
    const mins = Math.floor(state.timeSeconds / 60);
    const secs = state.timeSeconds % 60;
    el.timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, 1000);

  // Initialize UI
  function init() {
    // Theme setup
    document.documentElement.setAttribute('data-theme', state.theme);
    el.themeToggle.textContent = state.theme === 'dark' ? '🌙' : '☀️';

    // Candidate Name Setup
    if (state.userName) {
      el.currentUserNameDisplay.textContent = state.userName;
      el.nameModal.style.display = 'none';
      state.timerActive = true;
    } else {
      el.nameModal.style.display = 'flex';
      state.timerActive = false;
    }

    buildPalette();
    renderQuestion();
    updateStats();
    attachEventListeners();
  }

  // Build Palette Navigation (1-10)
  function buildPalette() {
    el.paletteContainer.innerHTML = '';
    quizData.forEach((q, idx) => {
      const item = document.createElement('button');
      item.className = `palette-item ${idx === state.currentIndex ? 'active' : ''}`;
      item.textContent = idx + 1;
      item.dataset.index = idx;
      item.title = `Question ${idx + 1}`;
      item.addEventListener('click', () => {
        playSound('click');
        state.currentIndex = idx;
        renderQuestion();
      });
      el.paletteContainer.appendChild(item);
    });
  }

  // Update Palette Status: In Exam mode, only show answered state, never reveal correctness
  function updatePalette() {
    const items = el.paletteContainer.querySelectorAll('.palette-item');
    items.forEach((item, idx) => {
      const q = quizData[idx];
      const isCurrent = idx === state.currentIndex;
      const isAnswered = state.answers[q.id] !== undefined;
      const isFlagged = state.flagged.has(q.id);

      item.className = 'palette-item';
      if (isCurrent) item.classList.add('active');
      if (isFlagged) item.classList.add('flagged');

      if (isAnswered) {
        if (state.mode === 'practice') {
          if (state.answers[q.id] === q.correct) {
            item.classList.add('correct');
          } else {
            item.classList.add('incorrect');
          }
        } else {
          // Exam Mode: simple answered indicator
          item.classList.add('answered');
        }
      }
    });
  }

  // Render Current Question
  function renderQuestion() {
    const q = quizData[state.currentIndex];
    const total = quizData.length;

    // Category Tag
    const catLabel = state.language === 'hi' ? q.categoryHi :
                    state.language === 'en' ? q.category :
                    `${q.category} • ${q.categoryHi}`;
    el.categoryTag.innerHTML = `${q.icon} ${catLabel}`;

    // Flag button state
    if (state.flagged.has(q.id)) {
      el.flagBtn.classList.add('active');
      el.flagBtn.innerHTML = `★ <span>Flagged</span>`;
    } else {
      el.flagBtn.classList.remove('active');
      el.flagBtn.innerHTML = `☆ <span>Flag</span>`;
    }

    // Question Text Rendering based on Language
    if (state.language === 'hi') {
      el.questionText.textContent = `Q${q.id}. ${q.question.hi}`;
      el.questionSubtext.style.display = 'none';
    } else if (state.language === 'en') {
      el.questionText.textContent = `Q${q.id}. ${q.question.en}`;
      el.questionSubtext.style.display = 'none';
    } else {
      // Bilingual Mode
      el.questionText.textContent = `Q${q.id}. ${q.question.hi}`;
      el.questionSubtext.textContent = q.question.en;
      el.questionSubtext.style.display = 'block';
    }

    // Render Options
    el.optionsGrid.innerHTML = '';
    const userAnswer = state.answers[q.id];
    const isAnswered = userAnswer !== undefined;

    q.options.forEach(opt => {
      const optBtn = document.createElement('button');
      optBtn.className = 'option-btn';
      optBtn.dataset.optionId = opt.id;

      // Option Texts
      let primaryText = '';
      let secondaryText = '';

      if (state.language === 'hi') {
        primaryText = opt.text.hi;
      } else if (state.language === 'en') {
        primaryText = opt.text.en;
      } else {
        // Bilingual
        primaryText = opt.text.hi;
        if (opt.text.en !== opt.text.hi) {
          secondaryText = opt.text.en;
        }
      }

      optBtn.innerHTML = `
        <span class="option-letter">${opt.id}</span>
        <div class="option-text-container">
          <span class="option-primary">${primaryText}</span>
          ${secondaryText ? `<span class="option-secondary">${secondaryText}</span>` : ''}
        </div>
      `;

      // Evaluation / Selection State
      if (isAnswered) {
        if (state.mode === 'practice') {
          // In Practice Mode, reveal correct/incorrect immediately
          optBtn.disabled = true;
          if (opt.id === q.correct) {
            optBtn.classList.add('correct');
          } else if (opt.id === userAnswer) {
            optBtn.classList.add('incorrect');
          }
        } else {
          // In Exam Mode, just mark as selected
          if (opt.id === userAnswer) {
            optBtn.classList.add('selected');
          }
        }
      }

      optBtn.addEventListener('click', () => handleOptionSelect(q, opt.id));
      el.optionsGrid.appendChild(optBtn);
    });

    // Explanation Box: Only show in practice mode when answered; hidden in exam mode
    if (state.mode === 'practice' && isAnswered) {
      el.explanationBox.style.display = 'flex';
      const isCorrect = userAnswer === q.correct;
      el.explanationHeader.innerHTML = isCorrect ?
        `<span>✅ बिल्कुल सही! / Correct!</span>` :
        `<span>💡 सही उत्तर है: विकल्प ${q.correct} / Correct Answer: Option ${q.correct}</span>`;

      if (state.language === 'hi') {
        el.explanationText.textContent = q.explanation.hi;
        el.explanationSubtext.style.display = 'none';
      } else if (state.language === 'en') {
        el.explanationText.textContent = q.explanation.en;
        el.explanationSubtext.style.display = 'none';
      } else {
        el.explanationText.textContent = q.explanation.hi;
        el.explanationSubtext.textContent = q.explanation.en;
        el.explanationSubtext.style.display = 'block';
      }
    } else {
      el.explanationBox.style.display = 'none';
    }

    // Navigation buttons
    el.prevBtn.disabled = state.currentIndex === 0;

    if (state.currentIndex === total - 1) {
      el.nextBtn.style.display = 'none';
      el.submitBtn.style.display = 'inline-flex';
    } else {
      el.nextBtn.style.display = 'inline-flex';
      el.submitBtn.style.display = 'none';
    }

    updateStats();
    updatePalette();
  }

  // Handle Option Click
  function handleOptionSelect(question, optionId) {
    if (state.mode === 'practice' && state.answers[question.id] !== undefined) {
      return; // Already answered in practice mode
    }

    state.answers[question.id] = optionId;

    if (state.mode === 'practice') {
      if (optionId === question.correct) {
        playSound('correct');
      } else {
        playSound('wrong');
      }
    } else {
      playSound('click');
    }

    renderQuestion();
  }

  // Update Stats: ONLY updates progress bar. SCORE IS NEVER DISPLAYED HERE!
  function updateStats() {
    const total = quizData.length;
    const answeredCount = Object.keys(state.answers).length;
    const pct = Math.round((answeredCount / total) * 100);

    el.progressFill.style.width = `${pct}%`;
    el.progressText.textContent = `Question ${state.currentIndex + 1} of ${total}`;
    el.progressPercent.textContent = `${pct}% Completed`;
  }

  // Submit Quiz & Show Final Results + Save to Admin Submissions
  function finishQuiz() {
    playSound('fanfare');
    state.quizFinished = true;
    state.timerActive = false;

    el.quizCard.style.display = 'none';
    document.querySelector('.stats-ribbon').style.display = 'none';
    document.querySelector('.palette-container').style.display = 'none';
    el.resultsScreen.style.display = 'flex';

    // Calculate Final Metrics
    const total = quizData.length;
    let correct = 0;
    quizData.forEach(q => {
      if (state.answers[q.id] === q.correct) correct++;
    });

    const incorrect = Object.keys(state.answers).length - correct;
    const skipped = total - Object.keys(state.answers).length;
    const scorePct = Math.round((correct / total) * 100);
    const finalTime = el.timerDisplay.textContent;

    // Render Metrics onto Results Screen
    document.getElementById('finalScoreNumber').textContent = `${scorePct}%`;
    const fracEl = document.getElementById('finalScoreFraction');
    if (fracEl) fracEl.textContent = `${correct} / ${total}`;

    document.getElementById('metricCorrect').textContent = correct;
    document.getElementById('metricIncorrect').textContent = incorrect;
    document.getElementById('metricSkipped').textContent = skipped;
    document.getElementById('metricTime').textContent = finalTime;

    // Save to Admin Panel submissions database (localStorage)
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' +
                          now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    const submissionRecord = {
      id: Date.now(),
      name: state.userName || 'Candidate',
      score: correct,
      total: total,
      percentage: scorePct,
      timeTaken: finalTime,
      submittedAt: formattedDate,
      timestamp: now.getTime()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('hits_quiz_submissions') || '[]');
      existing.unshift(submissionRecord);
      localStorage.setItem('hits_quiz_submissions', JSON.stringify(existing));
    } catch (e) {
      console.error("Storage error:", e);
    }

    // SVG Circle Animation (circumference = 2 * PI * 70 = 440)
    const circle = document.getElementById('circleProgress');
    const offset = 440 - (440 * scorePct) / 100;
    setTimeout(() => {
      if (circle) circle.style.strokeDashoffset = offset;
    }, 150);

    // Performance Badge & Remarks
    const badge = document.getElementById('performanceBadge');
    const remarks = document.getElementById('performanceRemarks');

    const candidateGreeting = state.userName ? `${state.userName}, ` : '';

    if (scorePct >= 90) {
      badge.textContent = '🏆 Master Educator / उत्कृष्ट प्रदर्शन';
      remarks.textContent = `शानदार ${candidateGreeting}! आपने शिक्षण व प्रस्तुति के सभी सिद्धांतों पर पूर्ण महारत प्रदर्शित की है।`;
      triggerConfetti();
    } else if (scorePct >= 70) {
      badge.textContent = '🌟 Proficient Facilitator / बहुत अच्छा';
      remarks.textContent = `बधाई ${candidateGreeting}! आपकी शिक्षण विधियों और संचार पर मजबूत पकड़ है।`;
      triggerConfetti();
    } else if (scorePct >= 50) {
      badge.textContent = '📚 Developing Educator / अच्छा प्रयास';
      remarks.textContent = `सराहनीय प्रयास ${candidateGreeting}! कुछ बिंदुओं और नियमों का दोबारा अध्ययन आपको शीर्ष पर ले जाएगा।`;
    } else {
      badge.textContent = '🎯 Needs Practice / और अभ्यास की आवश्यकता';
      remarks.textContent = `${candidateGreeting}चिंता न करें, सभी उत्तरों की विस्तृत व्याख्या पढ़ें और दोबारा प्रयास करें!`;
    }

    renderReviewList('all');
  }

  // Render Detailed Review List
  function renderReviewList(filter = 'all') {
    const list = document.getElementById('reviewList');
    if (!list) return;
    list.innerHTML = '';

    quizData.forEach((q, idx) => {
      const userAns = state.answers[q.id];
      const isCorrect = userAns === q.correct;
      const isFlagged = state.flagged.has(q.id);

      if (filter === 'correct' && !isCorrect) return;
      if (filter === 'incorrect' && (isCorrect || !userAns)) return;
      if (filter === 'flagged' && !isFlagged) return;

      const card = document.createElement('div');
      card.className = `review-item ${isCorrect ? 'is-correct' : 'is-incorrect'}`;

      const correctOptObj = q.options.find(o => o.id === q.correct);
      const userOptObj = q.options.find(o => o.id === userAns);

      const qText = state.language === 'en' ? q.question.en : q.question.hi;
      const explanation = state.language === 'en' ? q.explanation.en : q.explanation.hi;

      card.innerHTML = `
        <div class="review-qhead">
          <span>Question ${idx + 1} • ${q.category}</span>
          <span>${isCorrect ? '✅ Correct' : userAns ? '❌ Incorrect' : '⚠️ Skipped'}</span>
        </div>
        <div class="review-qtext">${qText}</div>
        <div class="review-ans-grid">
          <div class="review-ans-box ${isCorrect ? 'correct' : 'wrong'}">
            <strong>Your Answer:</strong> ${userOptObj ? `${userOptObj.id}. ${userOptObj.text.hi}` : 'None'}
          </div>
          <div class="review-ans-box correct">
            <strong>Correct Answer:</strong> ${correctOptObj.id}. ${correctOptObj.text.hi}
          </div>
        </div>
        <div style="font-size:0.88rem; color:var(--text-muted); margin-top:0.4rem; padding-top:0.4rem; border-top:1px dashed var(--card-border);">
          💡 <strong>Explanation:</strong> ${explanation}
        </div>
      `;

      list.appendChild(card);
    });
  }

  // Lightweight Canvas Confetti Engine
  function triggerConfetti() {
    const canvas = el.confettiCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const count = 120;
    const colors = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

    for (let i = 0; i < count; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        w: Math.random() * 10 + 6,
        h: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        vy: Math.random() * 3 + 2.5,
        vx: (Math.random() - 0.5) * 3,
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 8
      });
    }

    let frames = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      frames++;
      if (frames < 240) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    requestAnimationFrame(animate);
  }

  // Retake Quiz Reset
  function retakeQuiz() {
    state.currentIndex = 0;
    state.answers = {};
    state.flagged.clear();
    state.timeSeconds = 0;
    state.timerActive = true;
    state.quizFinished = false;

    el.resultsScreen.style.display = 'none';
    el.quizCard.style.display = 'flex';
    document.querySelector('.stats-ribbon').style.display = 'flex';
    document.querySelector('.palette-container').style.display = 'flex';

    buildPalette();
    renderQuestion();
  }

  // Attach Event Listeners
  function attachEventListeners() {
    // Name submission from modal
    if (el.nameForm) {
      el.nameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const enteredName = el.nameInput.value.trim();
        state.userName = enteredName || 'Candidate';
        localStorage.setItem('hits_quiz_current_user', state.userName);
        el.currentUserNameDisplay.textContent = state.userName;
        el.nameModal.style.display = 'none';
        state.timerActive = true;
        playSound('click');
      });
    }

    // Click candidate badge to change name
    if (el.userBadge) {
      el.userBadge.addEventListener('click', () => {
        el.nameInput.value = state.userName || '';
        el.nameModal.style.display = 'flex';
        el.nameInput.focus();
      });
    }

    // Theme Toggle
    el.themeToggle.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('quiz_theme', state.theme);
      el.themeToggle.textContent = state.theme === 'dark' ? '🌙' : '☀️';
      playSound('click');
    });

    // Sound Toggle
    el.soundToggle.addEventListener('click', () => {
      state.sound = !state.sound;
      el.soundToggle.textContent = state.sound ? '🔊' : '🔇';
      playSound('click');
    });

    // Language Selector
    el.langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        el.langBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.language = btn.dataset.lang;
        playSound('click');
        renderQuestion();
      });
    });

    // Mode Selector (Exam vs Practice)
    el.modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        el.modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.mode = btn.dataset.mode;
        playSound('click');
        renderQuestion();
      });
    });

    // Flag Question
    el.flagBtn.addEventListener('click', () => {
      const q = quizData[state.currentIndex];
      if (state.flagged.has(q.id)) {
        state.flagged.delete(q.id);
      } else {
        state.flagged.add(q.id);
      }
      playSound('click');
      renderQuestion();
    });

    // Navigation Buttons
    el.prevBtn.addEventListener('click', () => {
      if (state.currentIndex > 0) {
        state.currentIndex--;
        playSound('click');
        renderQuestion();
      }
    });

    el.nextBtn.addEventListener('click', () => {
      if (state.currentIndex < quizData.length - 1) {
        state.currentIndex++;
        playSound('click');
        renderQuestion();
      }
    });

    el.submitBtn.addEventListener('click', () => {
      const answeredCount = Object.keys(state.answers).length;
      const total = quizData.length;
      if (answeredCount < total) {
        const confirmSubmit = confirm(`आपने केवल ${answeredCount}/${total} प्रश्नों के उत्तर दिए हैं। क्या आप सबमिट करना चाहते हैं?\n(You have answered only ${answeredCount}/${total} questions. Are you sure you want to submit?)`);
        if (!confirmSubmit) return;
      }
      finishQuiz();
    });

    // Retake Quiz
    const retakeBtn = document.getElementById('retakeBtn');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => {
        playSound('click');
        retakeQuiz();
      });
    }

    // Print / Save Scorecard
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Review Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderReviewList(btn.dataset.filter);
      });
    });

    // Keyboard Shortcuts (1-4 or A-D for options, Left/Right arrow for nav, F for flag)
    window.addEventListener('keydown', (e) => {
      if (state.quizFinished || el.nameModal.style.display === 'flex') return;

      const q = quizData[state.currentIndex];
      const key = e.key.toUpperCase();

      if (['A', 'B', 'C', 'D'].includes(key)) {
        handleOptionSelect(q, key);
      } else if (['1', '2', '3', '4'].includes(key)) {
        const map = { '1': 'A', '2': 'B', '3': 'C', '4': 'D' };
        handleOptionSelect(q, map[key]);
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (state.currentIndex < quizData.length - 1) {
          state.currentIndex++;
          playSound('click');
          renderQuestion();
        }
      } else if (e.key === 'ArrowLeft') {
        if (state.currentIndex > 0) {
          state.currentIndex--;
          playSound('click');
          renderQuestion();
        }
      } else if (key === 'F') {
        el.flagBtn.click();
      }
    });
  }

  // Start app
  init();
});
