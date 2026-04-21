export const identity = {
  name: 'Priyansh Kumar Paswan',
  headline:
    'Software Developer focused on high-performance systems, secure engineering, and real-world product development.',
  mission:
    'I craft reliable systems that merge algorithmic rigor with tactile usability—shipping everything from complexity analyzers and encryption suites to ML tooling and marketplaces built for real users.',
  availability: 'Open to internships, collaborations, and engineering roles.',
  email: 'priyanshupaswan@gmail.com',
  links: {
    github: 'https://github.com/prxyansh',
    linkedin: 'https://www.linkedin.com/in/priyansh-kumar-paswan-a0ba49133/',
  },
};

export const heroMetrics = [
  { label: 'Years Building Systems', value: '03+' },
  { label: 'Test Suites Authored', value: '50+' },
  { label: 'User Ecosystem Reach', value: '1M+' },
];

export const highlights = [
  'Polyglot engineer moving fluidly between static analysis, cybersecurity, ML, and product strategy.',
  'CodeClarity shipped with 100% SRS coverage, 50+ tests, and a full visualization lab.',
  'CDAC (MeitY) Ethical Hacking internship: ISO 27001 router hardening and secure protocol design.',
  'Co-developing Carversal Marketplace inside a 1M+ user ecosystem.',
  'Hands-on with AES encryption systems, multiplayer networking, and DCGAN super-resolution.',
  'Fluent in Java, C, C++, Python, TypeScript, React, Next.js, Tailwind, Socket.IO, Spring Boot.',
];

export const capabilities = [
  {
    title: 'Software Engineering',
    accent: 'Systems',
    description:
      'Clean, type-safe, production-ready applications in Java, C++, Python, and TypeScript with a focus on clarity and architecture.',
  },
  {
    title: 'Web Development',
    accent: 'Product',
    description:
      'Scalable full-stack experiences using Next.js, React, Tailwind, analytics dashboards, and data-rich surface areas.',
  },
  {
    title: 'Cybersecurity & Ethical Hacking',
    accent: 'Security',
    description:
      'Hands-on penetration testing, AAA policies, secure routing, SSH/HTTPS hardening, and ISO 27001-aligned router audits.',
  },
  {
    title: 'Algorithms & Complexity',
    accent: 'Analysis',
    description:
      'Halstead metrics, cyclomatic complexity, and data-structure driven problem solving for dependable systems.',
  },
  {
    title: 'AI & Machine Learning',
    accent: 'ML',
    description:
      'DCGANs, dimensionality reduction, clustering, ANN foundations, and applied intelligence for tangible outcomes.',
  },
  {
    title: 'Real-World Product Development',
    accent: 'Strategy',
    description:
      'Leading teams, defining USPs, scoping roadmaps, and shaping marketplaces like Carversal for real communities.',
  },
];

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectMedia {
  palette: string[];
  speed?: number;
  noise?: number;
  seed?: number;
}

export interface Project {
  slug: string;
  name: string;
  role: string;
  stack: string;
  summary: string;
  impact: string[];
  challenge: string;
  approach: string;
  result: string;
  metrics?: ProjectMetric[];
  media: ProjectMedia;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    slug: 'codeclarity',
    name: 'CodeClarity — Complexity Intelligence Suite',
    role: 'Project Lead & Full-Stack Developer',
    stack: 'Next.js · React · TypeScript · Tailwind · Node.js · Recharts',
    summary:
      'Web-based analyzer computing Halstead metrics, cyclomatic complexity, LOC insights, and CFG exports with interactive charts.',
    impact: [
      '100% SRS requirement coverage and 50+ automated tests.',
      'Processes 500+ LOC in under one second with granular tokenization.',
      'Full visualization suite: radar, area, gauge, coupling graphs, DOT exports.',
    ],
    challenge:
      'Teams struggled to see how code quality degraded across repos; spreadsheets and static reports made the signal too slow.',
    approach:
      'Designed a lexical analysis pipeline with custom tokenizers, AST walkers, and view models that keep metrics readable for non-engineers.',
    result:
      'Unlocked real-time release gating where PMs can spot risky files and engineers can refactor with evidence.',
    metrics: [
      { label: 'Latency', value: '< 1s for 500 LOC' },
      { label: 'Coverage', value: '100% SRS scope' },
      { label: 'Tests', value: '50+ automated' },
    ],
    media: {
      palette: ['#040506', '#0b0f12', '#0f1316'],
      speed: 0.8,
      noise: 0.15,
      seed: 12,
    },
    liveUrl: 'https://code-clarity-hazel.vercel.app/',
  },
  {
    slug: 'carversal',
    name: 'Carversal Marketplace',
    role: 'Project Coordinator & Core Developer',
    stack: 'Next.js · TypeScript · Tailwind · MySQL · AI Services',
    summary:
      'AI-assisted used car marketplace shaped by a million-user community with trust filters, variant metadata, and forums.',
    impact: [
      'Coordinating a four-person team aligning product scope to demand.',
      'AI pricing recommendations and traffic-ready listing modules.',
      'Forum and metadata modeling for RC, insurance, service history fidelity.',
    ],
    challenge:
      'Used car buyers inside the community lacked trustworthy metadata and pricing guidance even though inventory was abundant.',
    approach:
      'Mapped vehicle taxonomy, stitched AI pricing rails, and enforced trust filters so every listing ships with transparent provenance.',
    result:
      'Listings now surface richer variant details, building confidence for the million-user ecosystem and enabling monetization pilots.',
    metrics: [
      { label: 'Community', value: '1M+ owners' },
      { label: 'Team', value: '4 core builders' },
      { label: 'Listings', value: '3x metadata depth' },
    ],
    media: {
      palette: ['#060504', '#120f0b', '#161310'],
      speed: 0.6,
      noise: 0.12,
      seed: 28,
    },
  },
  {
    slug: 'aesencryption',
    name: 'AES Encryption Suite',
    role: 'Java Developer',
    stack: 'Java · Swing · AES · Cryptography',
    summary:
      'Desktop application delivering AES-based encryption/decryption with plans for attribute-based encryption extensions.',
    impact: [
      'Confidentiality + integrity for multiple file types via intuitive GUI.',
      'Strong applied cryptography foundations and roadmap to ABE.',
    ],
    challenge:
      'Non-technical teammates were passing sensitive docs over email without encryption, risking compliance violations.',
    approach:
      'Built a Swing-based desktop tool that exposes AES-256 primitives with guardrails, plus hooks for future attribute-based encryption.',
    result:
      'Now teammates can seal any file locally with deterministic performance and no CLI learning curve.',
    metrics: [
      { label: 'Key Size', value: '256-bit AES' },
      { label: 'Modes', value: 'CBC · CFB · OFB' },
      { label: 'Roadmap', value: 'ABE module next' },
    ],
    media: {
      palette: ['#040506', '#0a0e12', '#0e1318'],
      speed: 0.5,
      noise: 0.18,
      seed: 44,
    },
  },
  {
    slug: 'stickman-fury',
    name: 'Stickman Fury — Multiplayer Combat',
    role: 'Realtime Systems Developer',
    stack: 'JavaScript · Socket.IO · Node.js',
    summary:
      'Real-time fighting game with synchronized combat mechanics, animation layers, and scoring engines over WebSockets.',
    impact: [
      'Low-latency state sync and smooth multiplayer experience.',
      'Custom scoring/animation engine tuned for expressive motion.',
    ],
    challenge:
      'Needed a playable proof that my networking layer could keep pace with frenetic combat without rubber-banding.',
    approach:
      'Authored a lockstep-inspired state loop with drift correction, animation layers, and predictive scoring over Socket.IO.',
    result:
      'Players feel immediate feedback even during spikes, validating the realtime primitives for future action games.',
    metrics: [
      { label: 'Tick Rate', value: '60Hz loop' },
      { label: 'Latency Budget', value: '<80ms target' },
      { label: 'Players', value: '4 concurrent' },
    ],
    media: {
      palette: ['#050406', '#0c0f12', '#101316'],
      speed: 1.1,
      noise: 0.1,
      seed: 65,
    },
  },
  {
    slug: 'dcgan-clarity',
    name: 'DCGAN Image Enhancement',
    role: 'ML Engineer',
    stack: 'Python · TensorFlow/Keras · NumPy',
    summary:
      'DCGAN model enhancing low-resolution imagery with adversarial learning to restore contrast and detail.',
    impact: [
      'Learns multi-scale visual hierarchies for sharper reconstructions.',
      'Pipeline covering data prep, training, evaluation, and inference UI.',
    ],
    challenge:
      'College research projects were stuck with blurry satellite imagery and no budget for commercial enhancement APIs.',
    approach:
      'Implemented a disciplined DCGAN training loop with staged discriminators, aggressive augmentation, and TensorBoard diagnostics.',
    result:
      'Researchers now upscale key tiles in-house, preserving edges enough for segmentation work without vendor lock-in.',
    metrics: [
      { label: 'PSNR Gain', value: '+5.2 dB' },
      { label: 'Epochs', value: '120 tuned passes' },
      { label: 'Batch Size', value: '64 images' },
    ],
    media: {
      palette: ['#040506', '#0b0f12', '#111518'],
      speed: 0.7,
      noise: 0.14,
      seed: 5,
    },
  },
];

export const timelineMilestones = [
  {
    year: '2023',
    title: 'First ML Project (DCGAN)',
    detail: 'Built a super-resolution pipeline leveraging GANs to enhance imagery and explore computational perception.',
  },
  {
    year: '2023',
    title: 'Smart India Hackathon Recognition',
    detail: 'Earned certificate for exceptional design contribution during the internal round.',
  },
  {
    year: '2024',
    title: 'CDAC Ethical Hacking Internship',
    detail: 'Implemented ISO 27001-aligned router hardening, secure protocols, and penetration testing workflows.',
  },
  {
    year: '2024',
    title: 'Systems & Intelligence Deep-Dive',
    detail: 'Sharpened system design, Java, DSA, CI, and ML techniques with applied projects.',
  },
  {
    year: '2025',
    title: 'Security & Realtime Builds',
    detail: 'Delivered AES encryption desktop app plus real-time multiplayer game experiences.',
  },
  {
    year: '2025',
    title: 'CodeClarity Launch',
    detail: 'Released the complexity analyzer with full coverage, documentation, and visual suite.',
  },
  {
    year: '2025',
    title: 'Carversal Coordination',
    detail: 'Guiding marketplace engineering inside a million-user ecosystem.',
  },
];

export const storyChapters = [
  {
    label: 'Chapter 01',
    title: 'Understanding Systems Deeply',
    description: 'Every engagement starts with algorithms, metrics, and security fundamentals.',
  },
  {
    label: 'Chapter 02',
    title: 'Building Tools, Not Apps',
    description: 'CodeClarity proved how precision engineering unlocks insight for teams.',
  },
  {
    label: 'Chapter 03',
    title: 'Security by Design',
    description: 'From AES suites to ISO 27001 router hardening—every layer matters.',
  },
  {
    label: 'Chapter 04',
    title: 'Real-World Product Impact',
    description: 'Carversal shows the power of aligning engineering with genuine demand.',
  },
  {
    label: 'Chapter 05',
    title: 'Learning in Public',
    description: 'Test, document, validate, refine—shipping informed iterations.',
  },
  {
    label: 'Chapter 06',
    title: 'Engineering the Future',
    description: 'Merging ML, secure software, and scalable systems to design what’s next.',
  },
];

export const education = [
  { program: 'MCA ’27', institution: 'NIT Trichy' },
  { program: 'BCA ’24', institution: 'Maharaja Surajmal Institute' },
];

export const certifications = [
  'Ethical Hacking & Penetration Testing — CDAC (MeitY)',
  'AWS Cloud Computing Foundation',
  'Deloitte Australia — Cyber Security Virtual Job Simulation',
  'Deloitte Australia — Data Analytics Virtual Job Simulation',
  'Deloitte Australia — Technology Job Simulation',
  'JPMorgan Chase & Co. — Software Engineering Virtual Experience',
  'Exceptional Contribution — Smart India Hackathon Internal Round',
  'Cybersecurity essentials, router hardening, secure protocols',
  'Cloud fundamentals and DevOps basics',
];

export const insights = [
  {
    slug: 'engineering-clarity',
    title: 'Engineering Clarity: The Process Behind Building CodeClarity',
    summary: 'How precision metrics, tokenization, and visualization pipelines came together for the analyzer.',
  },
  {
    slug: 'iso-27001-router-hardening',
    title: 'Lessons from ISO 27001 Router Hardening at CDAC',
    summary: 'Translating security standards into hands-on networking safeguards.',
  },
  {
    slug: 'user-focused-systems',
    title: 'Building User-Focused Systems for Carversal Marketplace',
    summary: 'Shaping metadata, trust signals, and AI pricing for a million-user community.',
  },
  {
    slug: 'complexity-metrics',
    title: 'Why Understanding Complexity Metrics Makes You a Better Engineer',
    summary: 'Marrying Halstead and cyclomatic analysis with architectural decision-making.',
  },
];