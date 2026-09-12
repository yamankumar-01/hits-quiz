// HITS – 10 MCQ Questionnaire Data (Bilingual: Hindi & English)
const quizData = [
  {
    id: 1,
    category: "Educational Psychology",
    categoryHi: "शिक्षा मनोविज्ञान",
    icon: "🧠",
    question: {
      hi: "Multiple Intelligence Theory किसने दी थी?",
      en: "Who proposed the Theory of Multiple Intelligences?"
    },
    options: [
      { id: "A", text: { hi: "Benjamin Bloom", en: "Benjamin Bloom" } },
      { id: "B", text: { hi: "Howard Gardner", en: "Howard Gardner" } },
      { id: "C", text: { hi: "Albert Einstein", en: "Albert Einstein" } },
      { id: "D", text: { hi: "Jean Piaget", en: "Jean Piaget" } }
    ],
    correct: "B",
    explanation: {
      hi: "हॉवर्ड गार्डनर (Howard Gardner) ने 1983 में अपनी पुस्तक 'Frames of Mind' में Multiple Intelligence Theory प्रस्तुत की थी। उन्होंने बताया कि बुद्धिमत्ता केवल एक सामान्य योग्यता (IQ) नहीं है, बल्कि 8 अलग-अलग प्रकार की होती है (उदा. भाषाई, तार्किक, संगीतमय, आदि)।",
      en: "Howard Gardner proposed the Theory of Multiple Intelligences in his 1983 book 'Frames of Mind'. He posited that human intelligence is not a single general ability (IQ), but encompasses 8 distinct modalities such as linguistic, logical-mathematical, spatial, and musical."
    }
  },
  {
    id: 2,
    category: "Pedagogy & Delivery",
    categoryHi: "शिक्षण विधि व प्रस्तुति",
    icon: "🎯",
    question: {
      hi: "एक teacher को learning material किस प्रकार present करना चाहिए?",
      en: "In what manner should a teacher present the learning material?"
    },
    options: [
      { id: "A", text: { hi: "केवल lecture के रूप में", en: "Exclusively in the form of a lecture" } },
      { id: "B", text: { hi: "केवल लिखित रूप में", en: "Only in written format" } },
      { id: "C", text: { hi: "Multiple ways / विभिन्न तरीकों से", en: "Multiple ways / Diverse multi-sensory approaches" } },
      { id: "D", text: { hi: "केवल PPT के द्वारा", en: "Only through PowerPoint slides" } }
    ],
    correct: "C",
    explanation: {
      hi: "हर छात्र की सीखने की क्षमता और शैली भिन्न होती है (Visual, Auditory, Kinesthetic)। इसलिए शिक्षण सामग्री को दृश्य, श्रव्य और क्रियात्मक जैसी विभिन्न विधियों (Multiple ways) से प्रस्तुत करना सबसे अधिक प्रभावशाली रहता है।",
      en: "Learners exhibit varied sensory strengths (visual, auditory, kinesthetic). Multi-modal instruction maximizes comprehension, retention, and student engagement."
    }
  },
  {
    id: 3,
    category: "Bloom's Taxonomy",
    categoryHi: "ब्लूम का वर्गीकरण",
    icon: "📊",
    question: {
      hi: "Bloom’s Taxonomy में सबसे पहला level कौन-सा है?",
      en: "What is the first (foundational) level in Bloom’s Taxonomy?"
    },
    options: [
      { id: "A", text: { hi: "Apply (लागू करना)", en: "Apply" } },
      { id: "B", text: { hi: "Understand (समझना)", en: "Understand" } },
      { id: "C", text: { hi: "Remember (याद रखना)", en: "Remember" } },
      { id: "D", text: { hi: "Create (रचना करना)", en: "Create" } }
    ],
    correct: "C",
    explanation: {
      hi: "Bloom की संशोधित वर्गीकरण (Anderson & Krathwohl, 2001) के 6 स्तर होते हैं: 1. Remember (याद रखना), 2. Understand (समझना), 3. Apply (लागू करना), 4. Analyze (विश्लेषण), 5. Evaluate (मूल्यांकन), 6. Create (सृजन)। अतः पहला आधारभूत स्तर 'Remember' है।",
      en: "In the revised Bloom's Taxonomy, the cognitive hierarchy starts with 'Remember' at the foundation, followed by Understand, Apply, Analyze, Evaluate, and culminates in Create."
    }
  },
  {
    id: 4,
    category: "Pedagogic Techniques",
    categoryHi: "शिक्षण तकनीकें",
    icon: "💡",
    question: {
      hi: "निम्न में से कौन-सा Pedagogic Technique है?",
      en: "Which of the following is a Pedagogic Technique?"
    },
    options: [
      { id: "A", text: { hi: "Brainstorming (विचार-मंथन)", en: "Brainstorming" } },
      { id: "B", text: { hi: "Case Study (केस स्टडी)", en: "Case Study" } },
      { id: "C", text: { hi: "Role-play (भूमिका निर्वहन)", en: "Role-play" } },
      { id: "D", text: { hi: "All of the above (उपरोक्त सभी)", en: "All of the above" } }
    ],
    correct: "D",
    explanation: {
      hi: "Brainstorming (नए विचारों को जन्म देना), Case Study (वास्तविक परिदृश्यों का विश्लेषण), और Role-play (व्यावहारिक अनुभव) — ये सभी सक्रिय शिक्षण (Active Learning) की प्रमुख शिक्षण विधियाँ हैं।",
      en: "Brainstorming (ideation), Case Studies (contextual problem analysis), and Role-play (experiential simulation) are all established pedagogic techniques promoting active learning."
    }
  },
  {
    id: 5,
    category: "Communication Skills",
    categoryHi: "संचार कौशल",
    icon: "⏸️",
    question: {
      hi: "Effective communication में Pauses का क्या role है?",
      en: "What is the role of Pauses in effective communication?"
    },
    options: [
      { id: "A", text: { hi: "Audience को confuse करना", en: "To confuse the audience" } },
      { id: "B", text: { hi: "Message को impactfully deliver करने में मदद करना", en: "Helps deliver the message impactfully" } },
      { id: "C", text: { hi: "बोलने की speed बढ़ाना", en: "To increase speaking speed" } },
      { id: "D", text: { hi: "Presentation को रोक देना", en: "To abruptly disrupt the presentation" } }
    ],
    correct: "B",
    explanation: {
      hi: "रणनीतिक ठहराव (Strategic Pauses) महत्वपूर्ण बिंदुओं पर जोर देते हैं, श्रोताओं को विचार को आत्मसात करने का अवसर देते हैं, और वक्तव्य को गरिमा व प्रभाव प्रदान करते हैं।",
      en: "Intentional pauses allow listeners cognitive processing time to digest key insights, punctuate major thoughts, and enhance presentation authority."
    }
  },
  {
    id: 6,
    category: "Presentation Dynamics",
    categoryHi: "प्रस्तुति गतिशीलता",
    icon: "⏱️",
    question: {
      hi: "“Pacing” का अर्थ क्या है?",
      en: "What is the meaning of 'Pacing' in teaching/speaking?"
    },
    options: [
      { id: "A", text: { hi: "आवाज़ को बहुत ऊँचा करना", en: "Raising the vocal pitch and loudness" } },
      { id: "B", text: { hi: "Words को बार-बार repeat करना", en: "Repeating keywords continuously" } },
      { id: "C", text: { hi: "Delivery की speed में variation करना", en: "Varying the speed and cadence of delivery" } },
      { id: "D", text: { hi: "केवल बहुत धीरे बोलना", en: "Speaking strictly at a slow tempo" } }
    ],
    correct: "C",
    explanation: {
      hi: "Pacing का तात्पर्य बोलने और सिखाने की गति में उचित उतार-चढ़ाव (variation) रखने से है। कठिन बिंदुओं पर गति धीमी और उत्साहवर्धक बिंदुओं पर गति थोड़ी तीव्र की जाती है ताकि एकाग्रता बनी रहे।",
      en: "Pacing refers to dynamically modulating speech tempo to match concept complexity, keeping the audience attentive and preventing cognitive fatigue."
    }
  },
  {
    id: 7,
    category: "Classroom Management",
    categoryHi: "कक्षा प्रबंधन",
    icon: "🧘",
    question: {
      hi: "Difficult classroom situation में teacher को सबसे पहले क्या करना चाहिए?",
      en: "What should a teacher do first during a difficult classroom situation?"
    },
    options: [
      { id: "A", text: { hi: "गुस्सा करना और चिल्लाना", en: "Get angry and shout" } },
      { id: "B", text: { hi: "Classroom छोड़ देना", en: "Leave the classroom in frustration" } },
      { id: "C", text: { hi: "Be composed under pressure / दबाव में शांत रहना", en: "Be composed under pressure" } },
      { id: "D", text: { hi: "Student को तुरंत बाहर भेजना", en: "Immediately dismiss students without understanding" } }
    ],
    correct: "C",
    explanation: {
      hi: "दबाव या तनावपूर्ण स्थिति में शिक्षक का शांत व संयमित (composed) रहना परिस्थिति को नियंत्रित रखने, निष्पक्ष निर्णय लेने और कक्षा में सकारात्मक वातावरण बनाए रखने की पहली शर्त है।",
      en: "Maintaining emotional poise and composure under pressure de-escalates conflicts, models emotional intelligence, and allows reasoned interventions."
    }
  },
  {
    id: 8,
    category: "Visual Design",
    categoryHi: "दृश्य डिज़ाइन नियम",
    icon: "📐",
    question: {
      hi: "Visual Design में 6 × 6 Rule किससे संबंधित है?",
      en: "In Visual Design, what does the '6 × 6 Rule' relate to?"
    },
    options: [
      { id: "A", text: { hi: "Classroom का भौतिक आकार", en: "Physical classroom dimensions" } },
      { id: "B", text: { hi: "Slide पर text को concise रखने से", en: "Keeping slide text concise (max 6 lines, 6 words/line)" } },
      { id: "C", text: { hi: "बैठने वाले छात्रों की संख्या", en: "Number of students per row" } },
      { id: "D", text: { hi: "Presentation की कुल अवधि", en: "Total length of the lecture" } }
    ],
    correct: "B",
    explanation: {
      hi: "प्रस्तुति डिज़ाइन का 6 × 6 नियम यह सुझाता है कि एक स्लाइड में अधिकतम 6 लाइनें (बुलेट पॉइंट्स) हों और प्रत्येक लाइन में अधिकतम 6 शब्द हों, जिससे स्लाइड भीड़-भाड़ मुक्त और पठनीय रहे।",
      en: "The 6 × 6 presentation rule advises displaying no more than 6 bullet lines per slide, with a maximum of 6 words per line, preventing cognitive clutter."
    }
  },
  {
    id: 9,
    category: "Facilitation & Body Language",
    categoryHi: "शारीरिक भाषा व संचालन",
    icon: "👁️",
    question: {
      hi: "Visual Delivery में teacher को क्या करना चाहिए?",
      en: "What should an educator practice during Visual Delivery?"
    },
    options: [
      { id: "A", text: { hi: "Slides को word-to-word पढ़ना", en: "Read slides verbatim word-for-word" } },
      { id: "B", text: { hi: "केवल computer screen की ओर देखना", en: "Keep eyes glued exclusively to the computer monitor" } },
      { id: "C", text: { hi: "Maintain eye contact / आँखों से संपर्क बनाए रखना", en: "Maintain direct eye contact with learners" } },
      { id: "D", text: { hi: "हमेशा lectern के पीछे स्थिर खड़े रहना", en: "Remain perpetually fixed behind the lectern" } }
    ],
    correct: "C",
    explanation: {
      hi: "सक्रिय शिक्षण में आँखों का संपर्क (Eye contact) बनाए रखना दर्शकों का विश्वास जीतता है, जुड़ाव महसूस कराता है और यह सुनिश्चित करता है कि छात्र ध्यान दे रहे हैं।",
      en: "Sustained eye contact establishes rapport, gauges learner attentiveness, communicates sincerity, and commands classroom presence."
    }
  },
  {
    id: 10,
    category: "Public Speaking & Influence",
    categoryHi: "वक्तृत्व कला व प्रभाव",
    icon: "✨",
    question: {
      hi: "“Magic Formula” में निम्न में से कौन-सा component शामिल है?",
      en: "Which of the following components is included in the 'Magic Formula' for speaking?"
    },
    options: [
      { id: "A", text: { hi: "Incident (घटना/कथा)", en: "Incident (Personal anecdote / story)" } },
      { id: "B", text: { hi: "Action (कार्य/कदम)", en: "Action (Specific action to be taken)" } },
      { id: "C", text: { hi: "Benefit (लाभ/परिणाम)", en: "Benefit (Positive outcome for the audience)" } },
      { id: "D", text: { hi: "All of the above (उपरोक्त सभी)", en: "All of the above" } }
    ],
    correct: "D",
    explanation: {
      hi: "डेल कार्नेगी (Dale Carnegie) का विख्यात 'Magic Formula' तीन घटकों से मिलकर बनता है: 1. Incident (एक प्रेरक घटना सुनाना), 2. Action (श्रोताओं से एक निश्चित कार्य का आह्वान करना), 3. Benefit (उस कार्य से होने वाले लाभ बताना)।",
      en: "Dale Carnegie's famous Magic Formula for persuasive presentations consists of three pivotal pillars: Incident (a vivid real-life illustration), Action (a clear call to action), and Benefit (the reward/value gained)."
    }
  }
];
