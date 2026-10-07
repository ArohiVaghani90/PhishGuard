export const trainingModules = [
  {
    id: 'tm1',
    title: 'Phishing Fundamentals',
    description: 'Learn the basics of phishing attacks, how to recognize them, and why they are effective.',
    difficulty: 'Beginner',
    duration: '20 min',
    category: 'Foundations',
    progress: 100,
    score: 92,
    completed: true,
    points: 100,
    lessons: 5,
    tags: ['phishing', 'basics', 'email'],
    lastActivity: '2024-03-10',
    quiz: [
      {
        id: 'q1',
        question: 'What is phishing?',
        options: [
          'A type of malware that encrypts your files',
          'A fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity',
          'A network scanning technique',
          'A method of physical security breach',
        ],
        correct: 1,
      },
      {
        id: 'q2',
        question: 'Which of the following is a common red flag in a phishing email?',
        options: [
          'Professional email signature',
          'Email from a colleague you know',
          'Urgent language demanding immediate action',
          'Company logo in the header',
        ],
        correct: 2,
      },
      {
        id: 'q3',
        question: 'What should you do if you receive a suspicious email asking for your password?',
        options: [
          'Reply with your password to verify it is legitimate',
          'Click the link to see if it is real',
          'Delete it and report it to your IT team',
          'Forward it to your colleagues',
        ],
        correct: 2,
      },
      {
        id: 'q4',
        question: 'Spear phishing is different from regular phishing because it is:',
        options: [
          'Sent via SMS instead of email',
          'Targeted at a specific individual or organization',
          'Easier to detect',
          'Only affects businesses not individuals',
        ],
        correct: 1,
      },
      {
        id: 'q5',
        question: 'What does "hovering over a link" help you identify?',
        options: [
          'The age of the email',
          'The sender\'s IP address',
          'The actual destination URL',
          'Whether the email has attachments',
        ],
        correct: 2,
      },
    ],
  },
  {
    id: 'tm2',
    title: 'Email Spoofing & Header Analysis',
    description: 'Understand how email spoofing works and how to analyze email headers to detect fraudulent messages.',
    difficulty: 'Intermediate',
    duration: '35 min',
    category: 'Technical',
    progress: 60,
    score: null,
    completed: false,
    points: 200,
    lessons: 7,
    tags: ['email', 'spoofing', 'headers', 'technical'],
    lastActivity: '2024-03-14',
    quiz: [
      {
        id: 'q1',
        question: 'What is email spoofing?',
        options: [
          'Deleting emails from a server',
          'Creating emails that appear to come from a different sender',
          'Encrypting email content',
          'Forwarding emails automatically',
        ],
        correct: 1,
      },
      {
        id: 'q2',
        question: 'Which email header field can be forged most easily?',
        options: ['Message-ID', 'Received', 'From', 'Date'],
        correct: 2,
      },
      {
        id: 'q3',
        question: 'SPF records help prevent email spoofing by:',
        options: [
          'Encrypting the email content',
          'Verifying which mail servers are authorized to send email on behalf of a domain',
          'Blocking all incoming emails',
          'Adding digital signatures',
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 'tm3',
    title: 'Social Engineering Tactics',
    description: 'Recognize psychological manipulation tactics used by attackers to gain trust and extract sensitive information.',
    difficulty: 'Intermediate',
    duration: '30 min',
    category: 'Psychology',
    progress: 0,
    score: null,
    completed: false,
    points: 200,
    lessons: 6,
    tags: ['social engineering', 'psychology', 'manipulation'],
    lastActivity: null,
    quiz: [
      {
        id: 'q1',
        question: 'Which psychological principle do attackers exploit when creating a sense of urgency?',
        options: ['Authority', 'Scarcity', 'Reciprocity', 'Social Proof'],
        correct: 1,
      },
      {
        id: 'q2',
        question: 'Pretexting in social engineering refers to:',
        options: [
          'Sending spam emails',
          'Creating a fabricated scenario to extract information',
          'Installing malware remotely',
          'Intercepting network traffic',
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 'tm4',
    title: 'Advanced Spear Phishing Defense',
    description: 'Protect against targeted, personalized phishing attacks that use your personal information against you.',
    difficulty: 'Advanced',
    duration: '45 min',
    category: 'Advanced Defense',
    progress: 0,
    score: null,
    completed: false,
    points: 350,
    lessons: 9,
    tags: ['spear phishing', 'targeted attacks', 'advanced'],
    lastActivity: null,
    quiz: [
      {
        id: 'q1',
        question: 'What makes spear phishing more dangerous than regular phishing?',
        options: [
          'It uses more sophisticated malware',
          'It is personalized with specific details about the target',
          'It always comes from known contacts',
          'It bypasses all antivirus software',
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 'tm5',
    title: 'Safe Browsing & Link Analysis',
    description: 'Learn how to safely analyze URLs and suspicious links before clicking on them.',
    difficulty: 'Beginner',
    duration: '25 min',
    category: 'Practical Skills',
    progress: 100,
    score: 85,
    completed: true,
    points: 150,
    lessons: 5,
    tags: ['urls', 'browsing', 'links', 'safety'],
    lastActivity: '2024-03-05',
    quiz: [],
  },
  {
    id: 'tm6',
    title: 'Reporting & Incident Response',
    description: 'Learn proper procedures for reporting phishing attempts and how to respond to security incidents.',
    difficulty: 'Beginner',
    duration: '15 min',
    category: 'Procedures',
    progress: 40,
    score: null,
    completed: false,
    points: 100,
    lessons: 3,
    tags: ['reporting', 'incident response', 'procedures'],
    lastActivity: '2024-03-15',
    quiz: [],
  },
];

export const phishingSimulations = [
  {
    id: 'sim1',
    title: 'IT Department Password Reset',
    difficulty: 'Beginner',
    description: 'A simulated IT support email requesting an urgent password reset.',
    status: 'available',
    userResult: null,
    indicators: [
      { id: 'i1', element: 'sender', label: 'Sender Address', suspicious: true, explanation: 'The email comes from "it-support@company-helpdesk.net" not the real company domain.' },
      { id: 'i2', element: 'urgency', label: 'Urgent Language', suspicious: true, explanation: '"IMMEDIATE ACTION REQUIRED" creates false urgency to bypass critical thinking.' },
      { id: 'i3', element: 'link', label: 'Reset Link URL', suspicious: true, explanation: 'The link points to "company-login.suspicious-domain.com" not the real company site.' },
      { id: 'i4', element: 'greeting', label: 'Generic Greeting', suspicious: true, explanation: '"Dear User" instead of your real name indicates a mass phishing attempt.' },
      { id: 'i5', element: 'logo', label: 'Company Logo', suspicious: false, explanation: 'The logo looks legitimate but can be easily copied.' },
      { id: 'i6', element: 'footer', label: 'Email Footer', suspicious: false, explanation: 'The footer text appears normal.' },
    ],
    email: {
      from: 'it-support@company-helpdesk.net',
      fromName: 'IT Support Team',
      subject: '⚠️ URGENT: Your account will be locked in 24 hours',
      date: 'Today, 9:14 AM',
      to: 'you@company.com',
      body: `Dear User,

We have detected unusual activity on your account. Your password must be reset IMMEDIATELY to avoid account suspension.

CLICK HERE TO RESET YOUR PASSWORD NOW
[Reset Password Button → company-login.suspicious-domain.com/reset]

Failure to reset your password within 24 hours will result in permanent account lockout.

This is an automated security notification. Do not reply to this email.

Regards,
IT Support Team
company-helpdesk.net | Security Department`,
    },
  },
  {
    id: 'sim2',
    title: 'CEO Wire Transfer Request',
    difficulty: 'Intermediate',
    description: 'A spoofed executive email requesting an urgent wire transfer.',
    status: 'available',
    userResult: { identified: 3, total: 4, score: 75, passed: true },
    indicators: [
      { id: 'i1', element: 'sender', label: 'Sender Email', suspicious: true, explanation: '"ceo@company-corp.com" instead of the real CEO\'s address.' },
      { id: 'i2', element: 'request', label: 'Unusual Request', suspicious: true, explanation: 'CEOs rarely request urgent wire transfers via email without proper channels.' },
      { id: 'i3', element: 'secrecy', label: 'Secrecy Demand', suspicious: true, explanation: '"Keep this confidential" is a major red flag in financial requests.' },
      { id: 'i4', element: 'account', label: 'Bank Account', suspicious: true, explanation: 'Legitimate business transfers use established vendor payment processes.' },
    ],
    email: {
      from: 'ceo@company-corp.com',
      fromName: 'James Wilson (CEO)',
      subject: 'Confidential - Urgent Wire Transfer',
      date: 'Yesterday, 4:45 PM',
      to: 'finance@company.com',
      body: `Hi,

I need you to process an urgent wire transfer today. This is time-sensitive for a deal we are closing.

Amount: $47,500
Account: 8827364910
Routing: 021000021
Bank: First National Bank

Please keep this confidential until the deal is announced. Do not discuss with other team members.

Process this immediately and confirm when done.

James Wilson
Chief Executive Officer`,
    },
  },
  {
    id: 'sim3',
    title: 'Package Delivery Notification',
    difficulty: 'Advanced',
    description: 'A convincing fake delivery notification with a malicious tracking link.',
    status: 'locked',
    userResult: null,
    indicators: [],
    email: {
      from: 'tracking@fedex-delivery-update.com',
      fromName: 'FedEx Delivery',
      subject: 'Action Required: Your package could not be delivered',
      date: 'Mar 14, 11:22 AM',
      to: 'you@company.com',
      body: '',
    },
  },
];

export const userProgressData = {
  overallProgress: 58,
  modulesCompleted: 2,
  modulesTotal: 6,
  totalPoints: 2450,
  simulationsPassed: 4,
  simulationsTotal: 6,
  currentStreak: 5,
  achievements: [
    { id: 'a1', name: 'First Steps', icon: '🏅', description: 'Complete your first training module', earned: true, date: '2024-01-20' },
    { id: 'a2', name: 'Phishing Detector', icon: '🎯', description: 'Score 90%+ on a phishing simulation', earned: true, date: '2024-02-10' },
    { id: 'a3', name: 'Week Warrior', icon: '🔥', description: 'Maintain a 7-day learning streak', earned: true, date: '2024-02-18' },
    { id: 'a4', name: 'Module Master', icon: '🏆', description: 'Complete 5 training modules', earned: false, date: null },
    { id: 'a5', name: 'Security Champion', icon: '🛡️', description: 'Reach 5000 points', earned: false, date: null },
    { id: 'a6', name: 'Perfect Score', icon: '⭐', description: 'Score 100% on any quiz', earned: false, date: null },
    { id: 'a7', name: 'Speed Learner', icon: '⚡', description: 'Complete 3 modules in one day', earned: false, date: null },
    { id: 'a8', name: 'Simulation Pro', icon: '🎓', description: 'Pass all simulations', earned: false, date: null },
  ],
  recentActivity: [
    { id: 'r1', type: 'module', title: 'Completed "Phishing Fundamentals"', score: 92, date: '2024-03-10', points: 100 },
    { id: 'r2', type: 'simulation', title: 'Passed Simulation: IT Password Reset', score: 88, date: '2024-03-12', points: 150 },
    { id: 'r3', type: 'module', title: 'Started "Email Spoofing & Header Analysis"', score: null, date: '2024-03-14', points: 0 },
    { id: 'r4', type: 'achievement', title: 'Earned "Week Warrior" badge', score: null, date: '2024-03-15', points: 200 },
    { id: 'r5', type: 'module', title: 'Completed "Safe Browsing & Link Analysis"', score: 85, date: '2024-03-05', points: 150 },
  ],
};

export const adminUsers = [
  { id: 'u1', firstName: 'Alex', lastName: 'Johnson', email: 'alex.j@company.com', department: 'Engineering', role: 'user', status: 'active', progress: 58, lastLogin: '2024-03-15', riskLevel: 'low' },
  { id: 'u2', firstName: 'Maria', lastName: 'Garcia', email: 'maria.g@company.com', department: 'Marketing', role: 'user', status: 'active', progress: 30, lastLogin: '2024-03-10', riskLevel: 'medium' },
  { id: 'u3', firstName: 'David', lastName: 'Chen', email: 'david.c@company.com', department: 'Finance', role: 'user', status: 'active', progress: 85, lastLogin: '2024-03-15', riskLevel: 'low' },
  { id: 'u4', firstName: 'Emma', lastName: 'Wilson', email: 'emma.w@company.com', department: 'HR', role: 'user', status: 'inactive', progress: 10, lastLogin: '2024-02-20', riskLevel: 'high' },
  { id: 'u5', firstName: 'James', lastName: 'Brown', email: 'james.b@company.com', department: 'Engineering', role: 'user', status: 'active', progress: 95, lastLogin: '2024-03-15', riskLevel: 'low' },
  { id: 'u6', firstName: 'Sophia', lastName: 'Taylor', email: 'sophia.t@company.com', department: 'Legal', role: 'user', status: 'active', progress: 45, lastLogin: '2024-03-13', riskLevel: 'medium' },
  { id: 'u7', firstName: 'Liam', lastName: 'Davis', email: 'liam.d@company.com', department: 'Sales', role: 'user', status: 'active', progress: 20, lastLogin: '2024-03-08', riskLevel: 'high' },
  { id: 'u8', firstName: 'Olivia', lastName: 'Martinez', email: 'olivia.m@company.com', department: 'Operations', role: 'user', status: 'active', progress: 70, lastLogin: '2024-03-14', riskLevel: 'low' },
  { id: 'u9', firstName: 'Noah', lastName: 'Anderson', email: 'noah.a@company.com', department: 'Marketing', role: 'user', status: 'inactive', progress: 5, lastLogin: '2024-01-30', riskLevel: 'high' },
  { id: 'u10', firstName: 'Ava', lastName: 'Thompson', email: 'ava.t@company.com', department: 'Finance', role: 'user', status: 'active', progress: 60, lastLogin: '2024-03-12', riskLevel: 'low' },
  { id: 'u11', firstName: 'Ethan', lastName: 'White', email: 'ethan.w@company.com', department: 'Engineering', role: 'user', status: 'active', progress: 78, lastLogin: '2024-03-15', riskLevel: 'low' },
  { id: 'u12', firstName: 'Isabella', lastName: 'Harris', email: 'isabella.h@company.com', department: 'HR', role: 'user', status: 'active', progress: 42, lastLogin: '2024-03-11', riskLevel: 'medium' },
];

export const reportData = {
  completionTrend: [
    { month: 'Oct', completions: 12, simulations: 8 },
    { month: 'Nov', completions: 18, simulations: 14 },
    { month: 'Dec', completions: 15, simulations: 11 },
    { month: 'Jan', completions: 25, simulations: 19 },
    { month: 'Feb', completions: 32, simulations: 24 },
    { month: 'Mar', completions: 38, simulations: 30 },
  ],
  departmentRisk: [
    { department: 'Engineering', low: 8, medium: 2, high: 1 },
    { department: 'Marketing', low: 3, medium: 4, high: 2 },
    { department: 'Finance', low: 5, medium: 2, high: 0 },
    { department: 'HR', low: 2, medium: 3, high: 2 },
    { department: 'Sales', low: 4, medium: 3, high: 3 },
    { department: 'Legal', low: 3, medium: 2, high: 1 },
  ],
  simulationOutcomes: [
    { name: 'Correctly Identified', value: 68, color: '#10b981' },
    { name: 'Fell for Simulation', value: 22, color: '#ef4444' },
    { name: 'Ignored / Unresolved', value: 10, color: '#f59e0b' },
  ],
  moduleCompletion: [
    { module: 'Phishing Fundamentals', completion: 85 },
    { module: 'Email Spoofing', completion: 60 },
    { module: 'Social Engineering', completion: 40 },
    { module: 'Spear Phishing', completion: 25 },
    { module: 'Safe Browsing', completion: 72 },
    { module: 'Incident Response', completion: 48 },
  ],
};

export const simulationCampaigns = [
  {
    id: 'sc1',
    name: 'Q1 Password Reset Campaign',
    template: 'IT Password Reset',
    targetGroup: 'All Users',
    targetCount: 247,
    status: 'completed',
    launchDate: '2024-01-15',
    endDate: '2024-01-22',
    results: { opened: 198, clicked: 54, reported: 112, total: 247 },
    difficulty: 'Beginner',
  },
  {
    id: 'sc2',
    name: 'Finance Dept Spear Phishing',
    template: 'CEO Wire Transfer',
    targetGroup: 'Finance',
    targetCount: 18,
    status: 'completed',
    launchDate: '2024-02-05',
    endDate: '2024-02-12',
    results: { opened: 16, clicked: 8, reported: 6, total: 18 },
    difficulty: 'Intermediate',
  },
  {
    id: 'sc3',
    name: 'March All-Hands Awareness',
    template: 'Package Delivery',
    targetGroup: 'All Users',
    targetCount: 247,
    status: 'active',
    launchDate: '2024-03-10',
    endDate: '2024-03-17',
    results: { opened: 145, clicked: 33, reported: 89, total: 247 },
    difficulty: 'Advanced',
  },
  {
    id: 'sc4',
    name: 'Q2 Security Awareness',
    template: 'Invoice Payment',
    targetGroup: 'Sales & Finance',
    targetCount: 65,
    status: 'scheduled',
    launchDate: '2024-04-01',
    endDate: '2024-04-08',
    results: null,
    difficulty: 'Intermediate',
  },
];
