const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const DEFAULT_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Ensure data folder and messages.json exist
const dataDir = path.join(__dirname, 'data');
const messagesFile = path.join(dataDir, 'messages.json');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(messagesFile)) {
  fs.writeFileSync(messagesFile, JSON.stringify([], null, 2), 'utf-8');
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

// Profile Data
const profileData = {
  name: "Md. Robiul Islam",
  title: "Full-Stack Developer & AI Automation Specialist",
  tagline: "Engineering scalable web systems, intelligent AI automation workflows, and high-performance full-stack architectures from database to UI.",
  university: "Northern University Bangladesh",
  degree: "B.Sc. in Computer Science & Engineering",
  email: "robiulislam31122002@gmail.com",
  location: "Dhaka, Bangladesh",
  status: "Available for Full-time Roles & High-Impact Projects",
  socials: {
    github: "https://github.com/developerBYrlm/robiul",
    linkedin: "https://linkedin.com/",
    email: "mailto:robiulislam31122002@gmail.com"
  },
  stats: {
    projectsCompleted: "4+",
    technologiesMastered: "20+",
    frameworks: "8+",
    clientSatisfaction: "100%"
  }
};

// Projects Catalog
const projectsData = [
  {
    id: "aegis-ai",
    title: "Aegis AI - Autonomous Agentic Orchestrator",
    category: "ai",
    categoryLabel: "AI & Automation",
    badge: "Featured / Production",
    shortDesc: "Agentic automation and generative AI platform for individual companies, orchestrating multiple specialized AI agents to operate connected business systems and automate end-to-end workflows.",
    longDesc: "Aegis AI helps individual companies deploy agentic automation and generative AI workflows. Multiple specialized AI agents collaborate through a shared orchestration layer to monitor business operations, navigate the web, extract and transform data, make decisions, and execute end-to-end tasks with minimal human intervention.",
    tech: ["Python", "FastAPI", "React", "LangChain", "WebSockets", "Supabase", "Docker"],
    metrics: ["98.4% Accuracy", "10x Faster Automation", "Sub-200ms Telemetry"],
    github: "https://github.com/developerBYrlm/robiul",
    demo: "#",
    architecture: "Client (React + Zustand) <-> WebSockets Gateway (FastAPI) <-> Agent Orchestration Engine (LangChain/LLMs) <-> Vector Memory & Supabase"
  },
  {
    id: "ai-customer-service",
    title: "AI Customer Service & Call Center Automation",
    category: "ai",
    categoryLabel: "AI & Automation",
    badge: "24/7 Omnichannel",
    shortDesc: "AI-powered customer service platform that handles chat, email, and phone support, resolves requests, and books appointments around the clock.",
    longDesc: "AI Customer Service is an autonomous contact-center platform for 24/7 support across web chat, email, and voice calls. Generative AI agents understand customer intent, answer questions from a company knowledge base, collect details, create support tickets, send follow-up emails, speak naturally over the phone, and schedule appointments through connected calendar and CRM systems—with human escalation available only for exceptional cases.",
    tech: ["Generative AI", "LLM Agents", "Voice AI", "Email Automation", "CRM", "Calendar API"],
    metrics: ["24/7 Availability", "Text, Email & Voice", "Automated Appointments"],
    github: "https://github.com/developerBYrlm/robiul",
    demo: "#",
    architecture: "Customer Channels (Chat + Email + Phone) <-> AI Conversation Orchestrator <-> Knowledge Base + CRM <-> Voice, Email & Calendar Integrations"
  },
  {
    id: "nexus-mart",
    title: "NexusMart - Scalable E-Commerce & Inventory Platform",
    category: "fullstack",
    categoryLabel: "Full-Stack & MERN",
    badge: "High Traffic",
    shortDesc: "Complete enterprise e-commerce platform with real-time stock sync, role-based admin dashboard, Stripe checkout, and automated invoices.",
    longDesc: "NexusMart is a production-grade full-stack commerce engine built on the MERN stack. Features multi-vendor inventory management, JWT-based role authentication, automated PDF receipt generation, Redis-cached catalog queries, and comprehensive sales analytics visualizations.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Redis", "Stripe API", "Tailwind CSS"],
    metrics: ["Sub-50ms API Latency", "Role-Based ACL", "Secure Payment Gateway"],
    github: "https://github.com/developerBYrlm/robiul",
    demo: "#",
    architecture: "React SPA <-> Express REST API <-> Redis Cache Layer <-> MongoDB Cluster <-> Stripe Webhook Listeners"
  },
  {
    id: "omnivision-ml",
    title: "OmniVision - Data Intelligence & ML Analytics Suite",
    category: "python",
    categoryLabel: "Python & ML",
    badge: "Data Science",
    shortDesc: "Python-powered data analytics pipeline offering predictive modeling, anomaly detection, and interactive visual dashboards.",
    longDesc: "OmniVision delivers end-to-end data processing and machine learning capabilities. Built with Pandas, NumPy, and scikit-learn, it processes complex CSV/SQL datasets, trains predictive models, and serves inferences via a high-performance FastAPI backend to an interactive UI.",
    tech: ["Python", "Pandas", "NumPy", "scikit-learn", "FastAPI", "Chart.js", "PostgreSQL"],
    metrics: ["500K+ Records Handled", "94% Model Precision", "Automated ETL"],
    github: "https://github.com/developerBYrlm/robiul",
    demo: "#",
    architecture: "FastAPI ML Server <-> Pandas/NumPy Pipeline <-> Trained scikit-learn Models <-> PostgreSQL Store <-> Visual Dashboard"
  },
  {
    id: "devpulse-gateway",
    title: "DevPulse - Microservices API Gateway & Auth Suite",
    category: "fullstack",
    categoryLabel: "Backend & DevOps",
    badge: "System Architecture",
    shortDesc: "High-throughput API gateway and secure authentication microservice with JWT access/refresh tokens, Redis sessions, RBAC-ready authorization, audit logging, rate limiting, and GraphQL support.",
    longDesc: "DevPulse provides unified routing, secure identity verification, authorization, and request validation for distributed backend services. It features JWT access and refresh token rotation, Redis-backed session management, RBAC-ready permissions, audit logging, IP-based rate limiting, security-focused request tracing, and unified GraphQL and REST proxying.",
    tech: ["Node.js", "Express", "GraphQL", "PostgreSQL", "Redis", "Docker", "Postman"],
    metrics: ["10K+ Req/Sec Capacity", "Zero-Downtime Reload", "Granular Rate Limiting"],
    github: "https://github.com/developerBYrlm/robiul",
    demo: "#",
    architecture: "Reverse Proxy <-> Auth Microservice (JWT + Redis) <-> Rate Limiter Middleware <-> PostgreSQL Database"
  },
  {
    id: "taskflow-pro",
    title: "TaskFlow Pro - Intelligent Workspace & Automation Bot",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    badge: "Productivity",
    shortDesc: "Real-time collaborative Kanban workspace with automated notification workers, Telegram/Discord webhooks, and team analytics.",
    longDesc: "TaskFlow Pro reimagines project management by integrating intelligent background workers with responsive drag-and-drop Kanban boards. Tasks automatically trigger webhooks, assignees receive instant notifications, and milestone progress is tracked with real-time burndown charts.",
    tech: ["React", "Node.js", "Socket.io", "Express", "MongoDB", "Webhooks"],
    metrics: ["Real-time Sync", "Drag & Drop UI", "Automated Webhooks"],
    github: "https://github.com/developerBYrlm/robiul",
    demo: "#",
    architecture: "React Kanban UI <-> Socket.io Real-time Bus <-> Express Server <-> MongoDB <-> Webhook Dispatcher"
  },
  {
    id: "healthsync-portal",
    title: "HealthSync - Medical Portal & Appointment System",
    category: "fullstack",
    categoryLabel: "Healthcare Solution",
    badge: "Security & RBAC",
    shortDesc: "Secure AI-assisted healthcare portal with encrypted records, role-based access, intelligent triage support, and AI-powered appointment scheduling.",
    longDesc: "HealthSync provides a secure, reliable portal for managing clinical consultations, patient histories, and appointments. Its AI assistant supports structured symptom intake, non-diagnostic triage guidance, appointment coordination, and automated reminders while clinicians retain control over medical decisions. The platform uses strict data privacy protocols, audit logging, encrypted records, and role-based access.",
    tech: ["React", "Node.js", "Express", "MongoDB", "CryptoJS", "AI Assistant", "Bootstrap CSS"],
    metrics: ["Role-Based Access", "Encrypted Data at Rest", "AI Triage Support"],
    github: "https://github.com/developerBYrlm/robiul",
    demo: "#",
    architecture: "React Interface <-> Encrypted Express API <-> MongoDB Medical Records <-> Notification Worker"
  }
];

// Skills Catalog
const skillsData = {
  languages: [
    { name: "JavaScript (ES6+)", level: "92%", icon: "fab fa-js-square" },
    { name: "Python", level: "90%", icon: "fab fa-python" },
    { name: "C++", level: "80%", icon: "fas fa-code" },
    { name: "C", level: "82%", icon: "fas fa-terminal" }
  ],
  frontend: [
    { name: "React.js", level: "90%", icon: "fab fa-react" },
    { name: "HTML5 & Semantic Web", level: "96%", icon: "fab fa-html5" },
    { name: "CSS3 / Modern CSS", level: "94%", icon: "fab fa-css3-alt" },
    { name: "Responsive & Accessible UI", level: "92%", icon: "fas fa-mobile-alt" },
    { name: "React Native", level: "84%", icon: "devicon-react-original" }
  ],
  backend: [
    { name: "Node.js", level: "90%", icon: "fab fa-node-js" },
    { name: "Express.js", level: "92%", icon: "fas fa-server" },
    { name: "RESTful API Design", level: "94%", icon: "fas fa-network-wired" },
    { name: "GraphQL", level: "80%", icon: "fas fa-project-diagram" },
    { name: "FastAPI / Flask / Django", level: "85%", icon: "fab fa-python" }
  ],
  databases: [
    { name: "MongoDB & Mongoose", level: "90%", icon: "fas fa-leaf" },
    { name: "PostgreSQL & MySQL", level: "86%", icon: "fas fa-database" },
    { name: "Supabase & Firebase", level: "88%", icon: "fas fa-fire" },
    { name: "SQL", level: "84%", icon: "devicon-mysql-plain" }
  ],
  aiAndData: [
    { name: "AI Automation & Agents", level: "92%", icon: "fas fa-robot" },
    { name: "Agentic AI & Tool Calling", level: "88%", icon: "fas fa-brain" },
    { name: "Generative AI & LLM APIs", level: "90%", icon: "fas fa-magic" },
    { name: "NumPy & Pandas", level: "86%", icon: "fas fa-chart-line" },
    { name: "scikit-learn & ML", level: "82%", icon: "fas fa-brain" }
  ],
  devTools: [
    { name: "Git & GitHub", level: "92%", icon: "fab fa-git-alt" },
    { name: "Postman & API Testing", level: "90%", icon: "fas fa-paper-plane" },
    { name: "VS Code & Debugging", level: "95%", icon: "fas fa-laptop-code" },
    { name: "npm & Package Ecosystem", level: "90%", icon: "fab fa-npm" },
    { name: "Android Studio", level: "82%", icon: "devicon-androidstudio-plain" }
  ]
};

// API Endpoints
app.get('/api/profile', (req, res) => {
  res.json({ success: true, data: profileData });
});

app.get('/api/projects', (req, res) => {
  res.json({ success: true, count: projectsData.length, data: projectsData });
});

app.get('/api/skills', (req, res) => {
  res.json({ success: true, data: skillsData });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    user: profileData.name
  });
});

// Contact Form Submission
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide your name.' });
    }
    if (!email || !email.trim() || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }
    if (!phone || !phone.trim() || phone.trim().replace(/\D/g, '').length < 7) {
      return res.status(400).json({ success: false, message: 'Please provide a valid WhatsApp number.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Please write a message.' });
    }

    const newMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject: (subject || 'General Inquiry').trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      ip: req.ip || req.connection.remoteAddress
    };

    // Read current messages
    let messages = [];
    try {
      const fileData = fs.readFileSync(messagesFile, 'utf-8');
      messages = JSON.parse(fileData);
    } catch (e) {
      messages = [];
    }

    messages.push(newMessage);
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2), 'utf-8');

    console.log(`\x1b[32m[CONTACT]\x1b[0m New message from \x1b[36m${newMessage.name}\x1b[0m (${newMessage.email}): "${newMessage.subject}"`);

    return res.status(200).json({
      success: true,
      message: `Thank you, ${newMessage.name}! Your message has been received. I will get back to you soon.`
    });
  } catch (error) {
    console.error('Contact endpoint error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error while processing your message.' });
  }
});

// SPA Fallback - Serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Resilient Server Startup with Automatic Port Fallback
function startServer(portToTry) {
  const server = app.listen(portToTry, () => {
    console.log('\x1b[36m');
    console.log('  ╔══════════════════════════════════════════════════════════╗');
    console.log('  ║   🚀 MD. ROBIUL ISLAM - PORTFOLIO SERVER RUNNING!        ║');
    console.log(`  ║   📍 Localhost: http://localhost:${portToTry}                     ║`);
    console.log('  ║   🎓 Northern University Bangladesh                      ║');
    console.log('  ║   💻 Full-Stack Developer & AI Automation Specialist     ║');
    console.log('  ║   ✨ Ready to impress! Press Ctrl+C to stop.             ║');
    console.log('  ╚══════════════════════════════════════════════════════════╝');
    console.log('\x1b[0m');
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`\x1b[33m⚠️ Port ${portToTry} is already in use. Trying port ${portToTry + 1}...\x1b[0m`);
      startServer(portToTry + 1);
    } else {
      console.error('\x1b[31m❌ Server failed to start:\x1b[0m', err);
    }
  });
}

startServer(DEFAULT_PORT);
