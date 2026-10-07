// Single source of truth for all portfolio content.
// Edit this file to update the site. Only information from the resume is used.

export const profile = {
  name: 'Karthikeyan P',
  monogram: 'K.',
  roles: ['Full Stack Developer', 'AI Systems Developer', 'Computer Science Engineer'],
  headline: 'Building intelligent systems that solve real problems.',
  intro:
    'Full Stack Developer with hands-on experience across MERN stack development, AI-powered applications, computer vision, and intelligent systems.',
  location: 'Madurai, Tamil Nadu, India',
  email: 'pkarthikeyan553@gmail.com',
  phone: '+91 93448 65064',
  phoneHref: 'tel:+919344865064',
  linkedin: 'https://linkedin.com/in/karthikeyan-p-656b082a1',
  // GitHub URL was not in the resume. Add it here (e.g. 'https://github.com/yourname')
  // and the GitHub buttons will appear automatically across the site.
  github: '',
  resume: '/resume/Karthikeyan-P-Resume.pdf',
}

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

export const heroNodes = ['React', 'Node.js', 'MongoDB', 'Python', 'AI', 'Computer Vision', 'FastAPI']

export const aboutText = [
  'Karthikeyan P is a Computer Science Engineering student and Full Stack Developer with hands-on experience building web applications, AI-powered systems and real-world digital platforms.',
  'Across three MERN stack internships and multiple independent and hackathon projects, he has built secure, role-based, real-time applications with REST API design and geospatial data. He is currently developing an AI-integrated hyperlocal donation platform that combines computer vision, OCR and route optimization.',
]

export const aboutTech = [
  'React',
  'React Native',
  'Node.js',
  'Express.js',
  'MongoDB',
  'FastAPI',
  'Python',
  'AI',
  'Computer Vision',
  'REST APIs',
]

export const profileCard = [
  { k: 'Role', v: 'Full Stack Developer' },
  { k: 'Focus', v: 'AI + Web Engineering' },
  { k: 'Education', v: 'B.E. Computer Science & Engineering' },
  { k: 'Graduation', v: 'May 2027' },
  { k: 'Location', v: 'Madurai, Tamil Nadu, India' },
  { k: 'CGPA', v: '8.68 / 10' },
]

export const stats = [
  { value: 3, suffix: '+', label: 'MERN / Full Stack Internships' },
  { value: 6, suffix: '+', label: 'Major Projects' },
  { value: 10, suffix: '+', label: 'Technology Areas' },
  { value: 2027, suffix: '', label: 'Expected Graduation', plain: true },
]

export const experience = [
  {
    id: 'kln',
    role: 'Web Developer',
    org: 'K.L.N. Innovation & Research Park (KLN IRP)',
    place: 'K.L.N. College of Engineering, Madurai',
    period: 'Dec 2024 – Present',
    current: true,
    featured: true,
    tagline: 'End-to-end product development',
    points: [
      'Working full-time as the web developer on an in-house research product, owning end-to-end development within the college innovation ecosystem.',
      'Collaborating closely with faculty mentors and a cross-functional team to build and refine the platform toward commercial readiness.',
      'Designing and testing end-to-end application workflows, improving execution speed, code quality, and overall product stability.',
    ],
    tags: [],
  },
  {
    id: 'vinsup',
    role: 'MERN Stack Development Intern',
    org: 'Vinsup Technology Pvt. Ltd.',
    place: 'Madurai, India',
    period: 'Dec 2024 – Jan 2025',
    points: [
      'Built backend web modules using MongoDB, Express.js, and Node.js to support scalable, REST API-driven applications.',
      'Developed responsive frontend interfaces with HTML, CSS, and JavaScript, ensuring consistent behavior across devices.',
      'Designed, tested, and debugged REST API endpoints under industry mentor supervision, improving reliability of data exchange between frontend and backend.',
    ],
    tags: ['MongoDB', 'Express.js', 'Node.js', 'REST APIs'],
  },
  {
    id: 'elysium',
    role: 'MERN Stack Development Intern',
    org: 'Elysium Technologies Private Limited',
    place: 'Madurai, India',
    period: 'Jun 2026',
    points: [
      'Completed a selective, intensive MERN Stack engineering internship, building hands-on proficiency through applied coding exercises.',
      'Developed production-style full-stack components following industry coding standards and version-controlled workflows.',
    ],
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
  },
]

export const projects = [
  {
    id: 'hsde',
    num: '01',
    name: 'HSDE',
    full: 'Hyperlocal Smart Donation Engine',
    category: 'AI • Full Stack • IEEE Final-Year Project',
    status: 'In Progress — 45%',
    progress: 45,
    hero: true,
    description:
      'An AI-powered hyperlocal donation platform connecting NGOs, donors and volunteers through intelligent donation matching, verification and optimized routing.',
    highlights: [
      'Dynamic Donation Distribution Engine',
      '15 km hyperlocal matching',
      'Urgency-based prioritization',
      'Category-aware AI verification',
    ],
    tech: ['React Native', 'FastAPI', 'MongoDB Atlas', 'YOLO', 'OCR', 'OSRM'],
    flow: ['Donor', 'AI Verification', 'Matching Engine', 'NGO', 'Volunteer', 'Optimized Route'],
    arch: ['React Native', 'FastAPI', 'AI Verification', 'MongoDB Atlas', 'Matching Engine', 'OSRM'],
    case: {
      problem:
        'Donations across food, medicines, medical equipment, blood and more are hard to match with NGO needs quickly, nearby and with trust that the item is what it claims to be.',
      solution:
        'A mobile-centric platform that connects NGOs, donors and volunteers across 10 donation categories, matching requests to donors within a 15 km radius and prioritising by urgency, category and location.',
      features: [
        'Custom Dynamic Donation Distribution Engine (DDSE) matching NGO requests with donors within 15 km',
        'Prioritisation by urgency, category and location',
        'YOLO + OCR for category-aware AI verification',
        'OSRM for optimized volunteer routing',
        '10 donation categories including food, medicines, medical equipment and blood',
      ],
      contribution:
        'Full Stack & AI Systems Developer (Independent / IEEE Final-Year Project): architecting the matching engine and building the React Native client, FastAPI services and MongoDB Atlas data layer.',
    },
    github: '',
    link: '',
  },
  {
    id: 'embook',
    num: '02',
    name: 'E-MBook',
    full: 'Digital Measurement Book System',
    category: 'MERN • Government Workflow • Hackathon',
    status: 'Built for Nimirndhu Nil Hackathon ’26',
    description:
      'A full-stack digital platform designed to replace the traditional paper-based Measurement Book workflow.',
    highlights: [
      'Project Management',
      'Measurement Entry',
      'Tender Allocation',
      'Automated Reporting',
      'Real-time Monitoring',
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    flow: ['JE', 'AE', 'AEE', 'EE', 'SE', 'CE'],
    flowLabel: '6-Tier Approval Workflow',
    arch: ['React', 'Express', 'MongoDB', 'Approval Workflow', 'Dashboard'],
    case: {
      problem:
        'The Rural Development & Panchayat Raj Department relied on a manual, paper-based Measurement Book process.',
      solution:
        'A digital system that moves the full process online, with role-based access and a hierarchical approval chain.',
      features: [
        'Role-based authentication',
        '6-tier approval workflow: JE → AE → AEE → EE → SE → CE',
        'Project management, measurement entry and tender allocation modules',
        'Automated reporting',
        'MongoDB connected to Express.js REST APIs for real-time monitoring dashboards',
      ],
      contribution:
        'Full Stack Developer (MERN) at Nimirndhu Nil Hackathon ’26, covering the full-stack implementation.',
    },
    github: '',
    link: '',
  },
  {
    id: 'resume',
    num: '03',
    name: 'AI Resume PDF Generator',
    full: 'Automated resume creation',
    category: 'Python • Generative AI • Independent',
    status: 'Completed — Aug 2025',
    description:
      'An automated AI-powered resume generation platform that transforms unstructured user input into structured, role-specific resume content.',
    highlights: ['Gradio web interface', 'Gemini-powered parsing', 'Background PDF rendering', 'Instant downloads'],
    tech: ['Python', 'Gradio', 'Google Gemini API', 'ReportLab'],
    flow: ['Input', 'Gemini AI', 'Structured Resume', 'PDF'],
    arch: ['User Input', 'Gemini API', 'Resume Structuring', 'ReportLab', 'PDF'],
    case: {
      problem: 'Turning raw, unstructured information about a person into a tailored, well-formatted resume is slow and manual.',
      solution:
        'An end-to-end tool with a Gradio interface that converts unstructured input into structured resume content, then renders a PDF on demand.',
      features: [
        'Gradio-based web interface',
        'Google Gemini API to parse and restructure raw input into role-specific text',
        'Background PDF rendering pipeline using ReportLab',
        'Instant, on-demand resume downloads',
      ],
      contribution: 'Independent Lead Developer — designed and built the whole pipeline end to end.',
    },
    github: '',
    link: '',
  },
  {
    id: 'hospireo',
    num: '04',
    name: 'Hospireo',
    full: 'Healthcare Discovery Platform',
    category: 'MERN • Healthcare',
    status: 'Testing Phase',
    description:
      'A hospital and doctor discovery platform supporting department-wise doctor discovery, availability mapping and patient booking.',
    highlights: ['Department-wise doctor profiles', 'Real-time availability mapping', 'Real-time patient booking', 'Secure backend APIs'],
    tech: ['Node.js', 'Express.js', 'MongoDB', 'React'],
    flow: ['User', 'React', 'Express API', 'MongoDB', 'Hospital / Doctor Data'],
    arch: ['User', 'React', 'Express API', 'MongoDB', 'Hospital / Doctor Data'],
    case: {
      problem: 'Finding the right doctor in the right department, and knowing whether they are available, is fragmented for patients.',
      solution:
        'A discovery platform with secure Node.js/Express.js APIs that supports real-time patient booking and department-wise doctor discovery.',
      features: [
        'Secure Node.js/Express.js backend APIs',
        'MongoDB query logic for department-wise doctor profiles',
        'Real-time availability mapping',
        'Real-time patient booking',
      ],
      contribution:
        'Full Stack Engineer. Currently in testing phase, with deployment planned for the near term.',
    },
    github: '',
    link: '',
  },
]

export const skills = [
  { cat: 'Languages', items: ['Python', 'Java', 'C', 'JavaScript (ES6+)'] },
  { cat: 'Frontend', items: ['React.js', 'React Native', 'HTML5', 'CSS3', 'Responsive Web Design'] },
  { cat: 'Backend', items: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'JWT'] },
  { cat: 'Database', items: ['MongoDB', 'MongoDB Atlas', 'MySQL'] },
  {
    cat: 'AI / Computer Vision',
    items: ['YOLOv8', 'YOLOv11', 'OpenCV', 'SAHI', 'OCR', 'Google Gemini API', 'MongoDB Vector Search', 'RAG'],
  },
  { cat: 'Cloud', items: ['Microsoft Azure', 'AWS'] },
  { cat: 'Tools', items: ['Git', 'GitHub', 'Gradio', 'ReportLab', 'OSRM'] },
]

export const approach = [
  { n: '01', t: 'Understand', d: 'Start with the actual problem, users and constraints.' },
  { n: '02', t: 'Architect', d: 'Design scalable data flow and system boundaries.' },
  { n: '03', t: 'Build', d: 'Turn architecture into clean, maintainable software.' },
  { n: '04', t: 'Test', d: 'Validate functionality, performance and reliability.' },
  { n: '05', t: 'Iterate', d: 'Improve based on real-world feedback.' },
]

export const certifications = [
  { cat: 'Cloud', icon: 'Cloud', items: ['Azure Fundamentals — CloudThat | Microsoft | NASSCOM'] },
  {
    cat: 'AI / Data',
    icon: 'Brain',
    items: [
      'AI & Innovation: Resilient AI Strategy',
      'Vector Search Fundamentals (Building AI-Powered Search)',
      'Retrieval-Augmented Generation (RAG) with MongoDB',
      'Building AI Agents with MongoDB',
    ],
    issuer: 'MongoDB',
  },
  {
    cat: 'Security / Cloud',
    icon: 'ShieldCheck',
    items: ['AWS Security – Encryption Fundamentals', 'Choosing Serverless Containers for .NET'],
    issuer: 'Infosys Springboard | AWS',
  },
  {
    cat: 'Database',
    icon: 'Database',
    items: ['RDBMS PostgreSQL', 'PHP and MySQL'],
    issuer: 'Spoken Tutorial, IIT Bombay',
  },
  {
    cat: 'Academic',
    icon: 'GraduationCap',
    items: ['Privacy & Security in Online Social Media', 'Cloud Computing', 'Ethical Hacking'],
    issuer: 'NPTEL, IIT',
  },
  {
    cat: 'Bootcamps',
    icon: 'Rocket',
    items: [
      'MERN Stack Certification (Vinsup Technology)',
      'Front-End Development (AWLRI, Red Rivers Labs)',
      'Generative AI Bootcamp (Raam Techlink | NoviTech R&D)',
    ],
  },
]

export const achievements = [
  { t: 'Level 2 Ideation Camp Selection', s: "Nimirndhu Nil Hackathon '26 (EDII TN)", tag: 'Selected' },
  { t: 'Smart India Hackathon', s: 'Certified College-Level Participant', tag: 'Participant' },
  { t: "Presenter — KLNICST '26", s: 'International Conference', tag: 'Presenter' },
  { t: 'Pudhu Madurai Green MFG X Conference', s: 'CII – Madurai Zone', tag: 'Participant' },
  { t: 'Technical Lead', s: 'Technozare Symposium', tag: 'Leadership' },
  { t: 'Technical Core Team', s: 'GDSC (Google Developer Student Clubs)', tag: 'Core Team' },
  { t: 'Technical Team Support', s: "Techgenio '26", tag: 'Team' },
  { t: 'Outreach Team Lead', s: "CSE Symposium Zeigen '26", tag: 'Leadership' },
]

export const education = [
  {
    title: 'B.E., Computer Science and Engineering',
    org: 'K.L.N. College of Engineering',
    meta: 'Expected May 2027',
    score: 'CGPA 8.68 / 10 (through 6th Semester)',
  },
  {
    title: 'Higher Secondary Course (HSC)',
    org: 'A.P.T. Dorairaj Higher Secondary School',
    meta: '2023',
    score: '80.83%',
  },
]

export const building = {
  name: 'HSDE',
  progress: 45,
  modules: ['AI Verification', 'Donation Matching', 'Geospatial Search', 'Volunteer Routing', 'Mobile Experience'],
}

export const commands = [
  { cmd: '/about', label: 'About', id: 'about' },
  { cmd: '/projects', label: 'Projects', id: 'projects' },
  { cmd: '/skills', label: 'Skills', id: 'skills' },
  { cmd: '/contact', label: 'Contact', id: 'contact' },
  { cmd: '/resume', label: 'Open resume (PDF)', href: '/resume/Karthikeyan-P-Resume.pdf' },
]
