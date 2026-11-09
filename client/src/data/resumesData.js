/**
 * FolioVerse 20 Selective & Elegant Resume Templates
 * Covering 10 Distinct College Course Disciplines + 10 Elite Professional Variations
 */

export const RESUME_CATEGORIES = [
  { id: 'all', name: 'All Resumes (31 Elite)', icon: '✨' },
  { id: 'agri-sciences', name: 'Agriculture & Agronomy (Agri)', icon: '🌾' },
  { id: 'cs-ai', name: 'Computer Science & AI', icon: '💻' },
  { id: 'ece-iot', name: 'ECE & Embedded IoT', icon: '📡' },
  { id: 'mech-robotics', name: 'Mechanical & Robotics', icon: '⚙️' },
  { id: 'business-mba', name: 'Business & MBA', icon: '💼' },
  { id: 'healthcare-med', name: 'Healthcare & Pre-Med', icon: '🩺' },
  { id: 'law-legal', name: 'Law & Legal Studies', icon: '⚖️' },
  { id: 'design-media', name: 'Design & Visual Arts', icon: '🎨' },
  { id: 'finance-econ', name: 'Finance & Accounting', icon: '📈' },
  { id: 'arch-civil', name: 'Architecture & Civil', icon: '🏗️' },
  { id: 'journalism-pr', name: 'Media & Journalism', icon: '📰' },
  { id: 'professional', name: 'Elite Professional & ATS', icon: '👔' }
];

export const RESUME_TEMPLATES = [
  // 1. Agriculture & Agronomy (Smart AgriTech)
  {
    id: 'agri-sciences-agronomist',
    name: 'AgriTech & Crop Science Vanguard 🌾',
    collegeCourse: 'B.Sc / M.Sc in Agriculture & Smart Agronomy 🌾',
    category: 'agri-sciences',
    accentColor: '#16a34a',
    styleClass: 'resume-agri',
    layout: 'agri-bento',
    description: 'Engineered for agricultural scientists, agronomists, and precision farming technologists with soil health metrics, crop yield analytics, drone NDVI mapping, and ICAR credentials.',
    cornerBadge: 'ICAR ACCREDITED // SMART-AGRI 🌾',
    sealType: 'leaf-seal',
    emojis: ['🌾', '🌱', '🚜', '🧪', '🌽', '🌿'],
    sampleData: {
      fullName: 'Dr. Siddharth Patel',
      headline: 'Agronomist & Precision AgTech Researcher | Sustainable Crop Science & Telemetry 🌾',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      showPhoto: true,
      skillsHeading: 'Technical & Functional Skills',
      showSkills: true,
      email: 'siddharth.agri@icar.res.in',
      phone: '+91 94250 88991',
      location: 'Nagpur & Punjab, India',
      website: 'https://siddharth-agritech.folioview.me',
      github: 'https://github.com/siddharth-agri',
      linkedin: 'https://linkedin.com/in/siddharth-patel-agri',
      portfolioSlug: 'siddharth-agri',
      summary: 'Agricultural researcher and precision agronomist specializing in crop stress diagnostics, multispectral drone NDVI telemetry, and regenerative soil biome enhancement. Authored 4 papers on climate-resilient pulses and smart micro-drip fertigation reducing farm water consumption by 42%.',
      education: [
        {
          degree: 'B.Sc. (Hons) in Agriculture & Crop Science',
          institution: 'Punjab Agricultural University (PAU) / ICAR',
          period: '2021 - 2025',
          gpa: '9.35 / 10.0 OGPA (University Gold Medalist)',
          coursework: 'Agronomy of Major Field Crops, Soil Chemistry & Fertility, Plant Pathology, Agricultural Meteorology, Precision Farming & Drone Telemetry, Seed Technology, Organic Farming.'
        }
      ],
      experience: [
        {
          role: 'Precision Agriculture Research Fellow',
          company: 'National Agro-Telemetry Labs',
          period: 'July 2024 - Present',
          location: 'Ludhiana, India',
          bullets: [
            'Spearheaded drone-based multispectral NDVI imaging across 850 hectares, detecting early-stage nitrogen deficiency with 94.2% field accuracy.',
            'Implemented automated sensor-driven micro-drip irrigation schedules, optimizing soil moisture levels and cutting groundwater pump hours by 36%.',
            'Formulated botanical bio-fungicide extract that mitigated wheat rust incidence by 28% across 12 demonstration village clusters.'
          ]
        },
        {
          role: 'Agronomy Field Intern',
          company: 'GreenEarth BioSolutions',
          period: 'Jan 2024 - June 2024',
          location: 'Pune, India',
          bullets: [
            'Analyzed 400+ soil core samples evaluating organic carbon (SOC), cation exchange capacity, and microbial biomass diversity.',
            'Assisted smallholder farmers with regenerative tillage methods, soil pH balancing, and IPM (Integrated Pest Management) protocols.'
          ]
        }
      ],
      projects: [
        {
          title: 'AgriSens: IoT Soil Moisture & NPK Telemetry Mesh 🌾',
          techStack: ['LoRaWAN', 'Soil NPK Sensors', 'Python', 'GIS Mapping', 'Solar Nodes'],
          link: 'https://github.com/siddharth-agri/agrisens-mesh',
          bullets: [
            'Deployed low-cost mesh network across 40 agricultural test plots streaming soil salinity, NPK balance, and moisture metrics directly to farmers via SMS alert bots.'
          ]
        },
        {
          title: 'DeepCrop: AI Pest & Fungal Leaf Spot Classifier 🌿',
          techStack: ['PyTorch', 'MobileNetV3', 'FastAPI', 'Android'],
          link: 'https://github.com/siddharth-agri/deepcrop-vision',
          bullets: [
            'Trained lightweight neural network detecting 24 crop diseases on mobile devices offline with 96% validation F1 score.'
          ]
        }
      ],
      skills: {
        agronomyScience: ['Crop Phenotyping', 'Soil Chemistry Testing', 'Plant Pathology Diagnostics', 'Fertigation & Nutrient Planning', 'Hydroponics'],
        agritechTools: ['Drone Remote Sensing (NDVI)', 'QGIS & Satellite Imagery', 'Soil Moisture Telemetry', 'Micro-Drip Automation', 'Weather Station Telemetry'],
        certifications: ['ICAR National Agricultural Research Fellowship', 'Certified Drone Pilot (DGCA Agri-UAV)', 'Organic Farming Inspector (APEDA)']
      },
      certifications: [
        'DGCA Certified Agricultural Drone Remote Pilot (RPA)',
        'APEDA Certified Organic Farming & Soil Fertility Inspector',
        'ICAR All India Senior Research Fellowship (AIR 4)'
      ],
      honors: [
        'National Young Agronomist Innovation Award (Ministry of Agriculture)',
        '1st Prize – AgriTech Innovation Hackathon for Smart Irrigation System',
        'University Gold Medal in Agronomy & Crop Physiology'
      ]
    }
  },

  // 2. Computer Science & Artificial Intelligence
  {
    id: 'cs-ai-engineer',
    name: 'CS & AI Systems Specialist',
    collegeCourse: 'B.Tech / BS in Computer Science & Artificial Intelligence',
    category: 'cs-ai',
    accentColor: '#2563eb',
    styleClass: 'resume-cs-ai',
    layout: 'sidebar-left',
    description: 'Engineered for software engineers, algorithmic problem-solvers, and AI/ML developers with LeetCode rating, core CS coursework, and distributed systems projects.',
    cornerBadge: 'SYS_VERIFIED // CS-AI',
    sealType: 'tech-hash',
    sampleData: {
      fullName: 'Aarav Sharma',
      headline: 'Computer Science & AI Undergraduate | Full Stack & Neural Systems',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      showPhoto: true,
      skillsHeading: 'Technical & Functional Skills',
      showSkills: true,
      email: 'aarav.sharma@cs.edu',
      phone: '+91 98765 43210',
      location: 'Bengaluru, India',
      website: 'https://aarav-dev.folioview.me',
      github: 'https://github.com/aarav-cs',
      linkedin: 'https://linkedin.com/in/aarav-sharma-cs',
      portfolioSlug: 'aarav-portfolio',
      summary: 'Computer Science & AI senior with deep expertise in distributed systems, neural network model deployment, and high-performance Web APIs. Ranked in top 2% globally on LeetCode (2150+ rating). Published researcher in edge AI inference optimization.',
      education: [
        {
          degree: 'B.Tech in Computer Science & Artificial Intelligence',
          institution: 'National Institute of Technology (NIT)',
          period: '2022 - 2026',
          gpa: '9.42 / 10.0 CGPA (Dean’s Honor List)',
          coursework: 'Data Structures & Algorithms, Operating Systems, Distributed Systems, Deep Learning, Database Internals, Compiler Design, Cloud Architecture.'
        }
      ],
      experience: [
        {
          role: 'Software Engineering Intern',
          company: 'HyperScale Cloud Labs',
          period: 'May 2025 - Aug 2025',
          location: 'Bengaluru, India',
          bullets: [
            'Architected distributed caching proxy using Go and Redis, reducing P99 latency by 38% across 4M daily API requests.',
            'Implemented automated CI/CD pipeline with GitHub Actions, Docker, and Kubernetes for zero-downtime microservice deployments.',
            'Benchmarked GPU tensor quantization routines, slashing model memory footprint by 45% with <0.3% accuracy loss.'
          ]
        }
      ],
      projects: [
        {
          title: 'NeuroFlow: Real-time Multi-Modal Inference Engine',
          techStack: ['Python', 'PyTorch', 'Rust', 'WebSockets', 'React'],
          link: 'https://github.com/aarav-cs/neuroflow',
          bullets: [
            'Built sub-15ms latency streaming audio/vision pipeline capable of handling 50 concurrent real-time feeds.',
            'Authored custom Rust bindings for CUDA tensor operations to eliminate Python runtime overhead.'
          ]
        },
        {
          title: 'Distributed Paxos Key-Value Store',
          techStack: ['Go', 'gRPC', 'Raft Consensus'],
          link: 'https://github.com/aarav-cs/paxos-kv',
          bullets: [
            'Engineered strongly consistent replicated log system with automated leader election and snapshot compaction.'
          ]
        }
      ],
      skills: {
        languages: ['C++', 'Python', 'Go', 'TypeScript', 'SQL', 'Rust'],
        frameworks: ['PyTorch', 'React', 'Node.js', 'FastAPI', 'Docker', 'Kubernetes'],
        coreCompetencies: ['Distributed Systems', 'Data Structures & Algorithms', 'REST & gRPC APIs', 'Database Optimization']
      },
      certifications: [
        'AWS Certified Solutions Architect – Associate',
        'NVIDIA Deep Learning Institute: Fundamentals of Deep Learning'
      ],
      honors: [
        '1st Place Winner – National Smart India Hackathon (FinTech Track)',
        'ACM ICPC Regional Finalist (Rank 14)'
      ]
    }
  },

  // 2. Electronics & Communication Engineering (ECE / IoT)
  {
    id: 'ece-embedded-iot',
    name: 'ECE & Embedded Hardware Engineer',
    collegeCourse: 'B.E. / B.Tech in Electronics & Communication Engineering',
    category: 'ece-iot',
    accentColor: '#059669',
    styleClass: 'resume-ece',
    layout: 'sidebar-left',
    description: 'Designed for hardware architects, VLSI designers, and IoT firmware engineers with microcontrollers, circuit analysis, and embedded C.',
    cornerBadge: 'HW_TESTED // ECE-CERT',
    sealType: 'circuit-seal',
    sampleData: {
      fullName: 'Rohan Deshmukh',
      headline: 'Electronics & Communication Engineer | Embedded Systems & FPGA Designer',
      email: 'rohan.ece@engg.edu',
      phone: '+91 98450 11223',
      location: 'Pune, India',
      website: 'https://rohan-hardware.folioview.me',
      github: 'https://github.com/rohan-ece',
      linkedin: 'https://linkedin.com/in/rohan-deshmukh-ece',
      portfolioSlug: 'rohan-portfolio',
      summary: 'Electronics & Communication engineer specializing in real-time firmware, ARM Cortex-M microcontrollers, and Verilog HDL design. Proven experience prototyping high-reliability IoT sensor telemetry nodes with low-power sleep cycles.',
      education: [
        {
          degree: 'B.Tech in Electronics & Communication Engineering',
          institution: 'College of Engineering Pune (COEP)',
          period: '2022 - 2026',
          gpa: '8.95 / 10.0 CGPA',
          coursework: 'Digital Signal Processing, Embedded Systems, Microprocessors (ARM/8051), VLSI Circuit Design, RF & Microwave, Control Systems.'
        }
      ],
      experience: [
        {
          role: 'Embedded Firmware Intern',
          company: 'AeroSense IoT Systems',
          period: 'June 2025 - Aug 2025',
          location: 'Hyderabad, India',
          bullets: [
            'Wrote FreeRTOS firmware in Embedded C for STM32 microcontrollers communicating over SPI, I2C, and UART bus lines.',
            'Optimized power management registers to extend battery longevity from 48 hours to 180 hours under continuous LoRaWAN pinging.',
            'Designed 4-layer PCB in KiCAD with impedance-matched RF traces for 868MHz wireless transceivers.'
          ]
        }
      ],
      projects: [
        {
          title: 'FPGA Hardware Accelerated FFT Core',
          techStack: ['Verilog HDL', 'Xilinx Vivado', 'Zybo Z7-20 Board'],
          link: 'https://github.com/rohan-ece/fpga-fft',
          bullets: [
            'Synthesized 1024-point Radix-2 FFT engine running at 150MHz clock cycle with pipelined complex multipliers.'
          ]
        },
        {
          title: 'Automated Industrial Vibration Monitor (Edge IoT)',
          techStack: ['Embedded C', 'FreeRTOS', 'ESP32', 'MQTT', 'KiCAD'],
          link: 'https://github.com/rohan-ece/smart-vibe',
          bullets: [
            'Created predictive maintenance sensor node with edge FFT anomaly detection, transmitting failure telemetry via MQTT.'
          ]
        }
      ],
      skills: {
        languages: ['Embedded C', 'C++', 'Verilog HDL', 'Python', 'MATLAB'],
        tools: ['KiCAD', 'Xilinx Vivado', 'Keil uVision', 'Saleae Logic Analyzer', 'Oscilloscopes'],
        hardwareProtocols: ['I2C', 'SPI', 'UART', 'CAN Bus', 'LoRaWAN', 'BLE 5.0', 'FreeRTOS']
      },
      certifications: [
        'Arm Education: Embedded Systems Architecture',
        'Texas Instruments: Microcontroller Interface Certification'
      ],
      honors: [
        'Best Hardware Project Award – Maker Faire 2025',
        'Chair – IEEE Student Branch Hardware Chapter'
      ]
    }
  },

  // 3. Mechanical Engineering & Robotics
  {
    id: 'mech-robotics-cad',
    name: 'Mechanical & Robotics Specialist',
    collegeCourse: 'B.Tech / B.S. in Mechanical Engineering & Robotics',
    category: 'mech-robotics',
    accentColor: '#ea580c',
    styleClass: 'resume-mech',
    layout: 'classic-grid',
    description: 'Tailored for mechanical design engineers, robotics roboticists, and FEA simulation specialists with SolidWorks, ANSYS, and kinematics analysis.',
    cornerBadge: 'ISO 9001 // MECH-CAD',
    sealType: 'gear-crest',
    sampleData: {
      fullName: 'Vikramaditya Verma',
      headline: 'Mechanical & Robotics Engineer | CAD/FEA Simulation & Autonomous Mechatronics',
      email: 'vikram.mech@tech.edu',
      phone: '+91 97110 33445',
      location: 'Chennai, India',
      website: 'https://vikram-robotics.folioview.me',
      github: 'https://github.com/vikram-mech',
      linkedin: 'https://linkedin.com/in/vikram-verma-mech',
      portfolioSlug: 'vikram-portfolio',
      summary: 'Mechanical engineer with proven track record designing autonomous robotic chassis, multi-axis robotic arms, and lightweight carbon-fiber aero structures. Proficient in SolidWorks, ANSYS structural/thermal FEA, and ROS2 mechatronic integration.',
      education: [
        {
          degree: 'B.Tech in Mechanical Engineering (Robotics Specialization)',
          institution: 'Vellore Institute of Technology (VIT)',
          period: '2022 - 2026',
          gpa: '9.18 / 10.0 CGPA',
          coursework: 'Kinematics & Dynamics of Machinery, Finite Element Analysis (FEA), Fluid Mechanics, Thermodynamics, Robotic Control Systems, Geometric Dimensioning & Tolerancing (GD&T).'
        }
      ],
      experience: [
        {
          role: 'Robotics Design & Testing Intern',
          company: 'Titan Robotics & Automation',
          period: 'Dec 2024 - June 2025',
          location: 'Chennai, India',
          bullets: [
            'Led structural topology optimization of robotic end-effector, reducing component weight by 27% while maintaining safety factor of 2.8.',
            'Conducted non-linear static stress analysis in ANSYS Workbench to prevent fatigue fracture under dynamic cyclic loads.',
            'Manufactured precision aluminum parts via 3-axis CNC milling, manual lathe, and SLA additive manufacturing.'
          ]
        }
      ],
      projects: [
        {
          title: '6-DOF Autonomous Collaborative Manipulator Arm',
          techStack: ['SolidWorks', 'ROS2', 'Python', 'Kinematics', '3D Printing'],
          link: 'https://github.com/vikram-mech/6dof-arm',
          bullets: [
            'Calculated Denavit-Hartenberg (D-H) forward/inverse kinematics matrices for trajectory generation with <0.5mm positional repeatability.'
          ]
        },
        {
          title: 'Formula Student Racing Vehicle Aerodynamic Diffuser',
          techStack: ['ANSYS Fluent', 'CFD', 'Carbon Fiber Composite'],
          link: 'https://github.com/vikram-mech/fsae-diffuser',
          bullets: [
            'Simulated ground-effect aerodynamic downforce, improving high-speed cornering stability by 19% in wind tunnel testing.'
          ]
        }
      ],
      skills: {
        cadDae: ['SolidWorks (CSWP Certified)', 'Autodesk Inventor', 'Fusion 360', 'GD&T', 'Drafting'],
        simulation: ['ANSYS Mechanical', 'ANSYS Fluent (CFD)', 'MATLAB Simulink', 'Abaqus'],
        fabrication: ['CNC Machining', 'TIG/MIG Welding', 'Rapid Prototyping (FDM/SLA)', 'Lathe Turning']
      },
      certifications: [
        'Certified SOLIDWORKS Professional (CSWP)',
        'ASME Geometric Dimensioning & Tolerancing (GD&T) Specialist'
      ],
      honors: [
        'Team Captain – Formula Student Combustion Racing Team',
        'National Design Competition Finalist (AutoDesk India)'
      ]
    }
  },

  // 4. Business Administration & MBA
  {
    id: 'business-mba-exec',
    name: 'Business Strategy & MBA Consultant',
    collegeCourse: 'MBA / BBA in Business Administration & Strategic Consulting',
    category: 'business-mba',
    accentColor: '#0f766e',
    styleClass: 'resume-business',
    layout: 'executive-split',
    description: 'Structured for management consultants, venture analysts, and product marketing managers with financial modeling, market entry strategy, and KPI metrics.',
    cornerBadge: 'B-SCHOOL // STRATEGY LEAD',
    sealType: 'gold-crest',
    sampleData: {
      fullName: 'Pooja Singhania',
      headline: 'MBA Candidate | Corporate Strategy, Market Entry & P&L Growth',
      email: 'pooja.mba@bschool.edu',
      phone: '+91 99201 55667',
      location: 'Mumbai, India',
      website: 'https://pooja-strategy.folioview.me',
      linkedin: 'https://linkedin.com/in/pooja-singhania-mba',
      portfolioSlug: 'pooja-portfolio',
      summary: 'Results-driven MBA candidate with a strategic consulting background. Experienced in market sizing, DCF valuation modeling, and cross-functional operational turnaround. Delivered $1.2M in cost rationalization during boutique consulting engagements.',
      education: [
        {
          degree: 'Master of Business Administration (MBA) – Strategy & Finance',
          institution: 'Indian Institute of Management (IIM)',
          period: '2024 - 2026',
          gpa: 'Top 5% Batch Ranking (Director’s Merit Roll)',
          coursework: 'Strategic Management, Corporate Finance, Mergers & Acquisitions, Operations Management, Quantitative Market Research, Behavioral Economics.'
        },
        {
          degree: 'Bachelor of Business Administration (BBA) – Honors',
          institution: 'St. Xavier’s College',
          period: '2020 - 2023',
          gpa: '3.92 / 4.0 GPA'
        }
      ],
      experience: [
        {
          role: 'Strategy & Operations Associate Intern',
          company: 'Apex Global Advisory',
          period: 'Apr 2025 - June 2025',
          location: 'Mumbai, India',
          bullets: [
            'Formulated comprehensive D2C go-to-market strategy for a consumer electronics client, identifying $4.5M TAM across Tier-2 markets.',
            'Built dynamic financial forecast model evaluating sensitivity to supply chain delays, inflation, and customer acquisition costs (CAC).',
            'Co-authored 45-page C-suite pitch deck resulting in client greenlighting a $2M pilot expansion into Southeast Asia.'
          ]
        }
      ],
      projects: [
        {
          title: 'Omnichannel Retail Distribution Turnaround Case Study',
          techStack: ['Excel Financial Modeling', 'PowerBI', 'Tableau', 'SPSS'],
          bullets: [
            'Identified 22% inventory surplus across 18 regional warehouses, architecting just-in-time replenishment system.'
          ]
        }
      ],
      skills: {
        strategic: ['Market Sizing (TAM/SAM/SOM)', 'Financial Modeling (DCF/LBO)', 'Mergers & Acquisitions', 'Value Chain Analysis'],
        analytics: ['Advanced Excel / VBA', 'PowerBI', 'SQL Basics', 'Tableau', 'Competitive Benchmarking'],
        leadership: ['Cross-Functional Teaming', 'Executive Stakeholder Presentations', 'Agile Project Management']
      },
      certifications: [
        'CFA Institute: Investment Foundations Certificate',
        'McKinsey Forward Program Graduate'
      ],
      honors: [
        'National Winner – IIM Ahmedabad Case Competition (HUL L.I.M.E)',
        'President – Student Management Consulting Club'
      ]
    }
  },

  // 5. Healthcare, Nursing & Pre-Med
  {
    id: 'healthcare-nursing-premed',
    name: 'Healthcare & Clinical Science Practitioner',
    collegeCourse: 'MBBS / B.Sc Nursing / Pre-Med / Biotechnology',
    category: 'healthcare-med',
    accentColor: '#0284c7',
    styleClass: 'resume-med',
    layout: 'clinical-two-col',
    description: 'Designed for medical scholars, nursing specialists, and clinical researchers with patient rotations, pharmacology, and medical research citations.',
    cornerBadge: 'CLINICAL ACCREDITED // MED-BIO',
    sealType: 'caduceus-crest',
    sampleData: {
      fullName: 'Dr. Ananya Roy, MBBS',
      headline: 'Resident Physician & Clinical Researcher | Evidence-Based Medicine & Patient Care',
      email: 'dr.ananya.roy@medhealth.org',
      phone: '+91 98300 77889',
      location: 'Kolkata, India',
      website: 'https://dr-ananya.folioview.me',
      linkedin: 'https://linkedin.com/in/dr-ananya-roy-med',
      portfolioSlug: 'ananya-portfolio',
      summary: 'Compassionate medical professional with 1,200+ hours of inpatient clinical rotation experience across Internal Medicine, Emergency Care, and Pediatrics. Dedicated to patient-centric diagnostic precision, preventative health counseling, and bio-clinical trial protocols.',
      education: [
        {
          degree: 'Bachelor of Medicine & Bachelor of Surgery (MBBS)',
          institution: 'Medical College & Hospital',
          period: '2020 - 2026',
          gpa: 'First Class with Honors in Pathology & Pharmacology',
          coursework: 'Anatomy, Physiology, Pathology, Microbiology, Pharmacology, Community Medicine, Pediatrics, Surgery, Obstetrics & Gynecology.'
        }
      ],
      experience: [
        {
          role: 'Clinical Intern (Rotating House Physician)',
          company: 'City General Government Hospital',
          period: '2025 - 2026',
          location: 'Kolkata, India',
          bullets: [
            'Assisted in triaging and stabilizing 150+ acute patients weekly in high-volume trauma and emergency ICU departments.',
            'Conducted thorough patient histories, differential diagnoses, arterial blood gas (ABG) draws, and suturing procedures.',
            'Collaborated with attending specialists in monitoring post-operative telemetry and pharmaceutical titration.'
          ]
        }
      ],
      projects: [
        {
          title: 'Epidemiological Study on Early Diabetic Retinopathy Screening',
          techStack: ['Clinical Cohort Study', 'SPSS Statistics', 'Ethical Review Board Approved'],
          bullets: [
            'Analyzed data across 450 rural patient cohorts, demonstrating 34% increased early-intervention compliance with mobile fundus screening.'
          ]
        }
      ],
      skills: {
        clinicalSkills: ['Emergency Triage', 'BLS & ACLS Certified', 'IV Cannulation', 'Wound Management', 'Patient History Taking'],
        diagnosticLab: ['ECG Interpretation', 'ABG Analysis', 'Venipuncture', 'Basic Ultrasound / Point-of-Care'],
        communication: ['Informed Consent', 'Bilingual Patient Counseling', 'Multidisciplinary Case Briefing']
      },
      certifications: [
        'American Heart Association: Basic Life Support (BLS)',
        'Advanced Cardiovascular Life Support (ACLS)',
        'WHO: Infection Prevention and Control in Healthcare Settings'
      ],
      honors: [
        'Gold Medal in Pathology – University Academic Board',
        'Lead Organizer – Pulse Polio & Rural Vaccination Drive'
      ]
    }
  },

  // 6. Law & Legal Studies
  {
    id: 'law-legal-counsel',
    name: 'Law & Corporate Legal Advocate',
    collegeCourse: 'BA LL.B / BBA LL.B / Corporate & Litigation Law',
    category: 'law-legal',
    accentColor: '#78350f',
    styleClass: 'resume-law',
    layout: 'classic-editorial',
    description: 'Structured for legal advocates, moot court champions, and corporate compliance associates with contract drafting, litigation research, and statutory analysis.',
    cornerBadge: 'LEX JUSTITIA // LAW-BAR',
    sealType: 'scales-crest',
    sampleData: {
      fullName: 'Adv. Siddharth Mehra',
      headline: 'Legal Associate | Corporate Contract Drafting, Arbitration & Intellectual Property',
      email: 'siddharth.mehra@lexlaw.in',
      phone: '+91 98110 44556',
      location: 'New Delhi, India',
      website: 'https://siddharth-law.folioview.me',
      linkedin: 'https://linkedin.com/in/siddharth-mehra-law',
      portfolioSlug: 'siddharth-portfolio',
      summary: 'Articulate legal scholar with extensive experience in corporate due diligence, commercial arbitration, and regulatory compliance. Moot Court National Champion with demonstrated excellence in statutory interpretation, legal memorandum drafting, and case law jurisprudence.',
      education: [
        {
          degree: 'B.A. LL.B. (Honors) – 5-Year Integrated Law Program',
          institution: 'National Law School of India University (NLSIU)',
          period: '2021 - 2026',
          gpa: 'CGPA: 6.85 / 7.0 (Top 3 in Batch)',
          coursework: 'Constitutional Law, Corporate & Securities Law, Law of Contracts, Intellectual Property Law, International Commercial Arbitration, Civil Procedure Code (CPC), Mergers & Acquisitions.'
        }
      ],
      experience: [
        {
          role: 'Legal Intern (Corporate & M&A Practice)',
          company: 'Shardul Amarchand Mangaldas & Co.',
          period: 'May 2025 - July 2025',
          location: 'New Delhi, India',
          bullets: [
            'Drafted non-disclosure agreements (NDAs), share purchase agreements (SPAs), and vendor service contracts under partner supervision.',
            'Conducted extensive regulatory compliance due diligence for a $35M Series B funding round under FEMA and RBI guidelines.',
            'Prepared legal memos analyzing precedent judgments in Section 9 Arbitration petitions before the Delhi High Court.'
          ]
        }
      ],
      projects: [
        {
          title: 'Comparative Analysis of AI Copyright Ownership in Indian & EU Jurisdictions',
          techStack: ['Published in NLSIU Law Review (Vol. 37)', 'SCC Online', 'Manupatra'],
          bullets: [
            'Authored a 12,000-word peer-reviewed treatise addressing moral rights and copyright vesting for generative AI works.'
          ]
        }
      ],
      skills: {
        legalDrafting: ['Commercial Contracts', 'Writ Petitions', 'Legal Notices', 'Arbitration Statements of Claim'],
        researchDatabases: ['SCC Online', 'Manupatra', 'Westlaw', 'HeinOnline', 'LexisNexis'],
        practiceAreas: ['Corporate Governance', 'IPR Trademark & Patent', 'Competition Law', 'Civil Litigation']
      },
      certifications: [
        'WIPO Academy: General Course on Intellectual Property (DL-101)',
        'Bar Council of India Enrollment Qualified'
      ],
      honors: [
        'Best Oralist & Winner – 22nd Philip C. Jessup International Law Moot Court National Round',
        'Editor-in-Chief – University Law Journal'
      ]
    }
  },

  // 7. Graphic Design & Digital Media
  {
    id: 'design-digital-media',
    name: 'Visual Design & Brand Identity Artist',
    collegeCourse: 'B.Des / BFA in Graphic Design & Digital Interactive Media',
    category: 'design-media',
    accentColor: '#db2777',
    styleClass: 'resume-design',
    layout: 'asymmetric-creative',
    description: 'Vibrant, typography-first resume for UI/UX designers, brand identity creators, and motion artists with Behance showcase, typography hierarchy, and Figma systems.',
    cornerBadge: 'CREATIVE LABS // DESIGN-SYS',
    sealType: 'palette-seal',
    sampleData: {
      fullName: 'Diya Krishnan',
      headline: 'Product & Brand Identity Designer | Design Systems, Typography & Visual Craft',
      email: 'diya.designs@studio.art',
      phone: '+91 99400 88990',
      location: 'Bengaluru, India',
      website: 'https://diya-design.folioview.me',
      behance: 'https://behance.net/diyakrishnan',
      linkedin: 'https://linkedin.com/in/diya-krishnan-design',
      portfolioSlug: 'diya-portfolio',
      summary: 'Versatile visual designer with obsessive attention to typography, micro-interactions, and scalable design token architectures. Proven experience translating ambiguous brand requirements into cohesive multi-platform visual systems with 100k+ end users.',
      education: [
        {
          degree: 'Bachelor of Design (B.Des) in Communication & Graphic Design',
          institution: 'National Institute of Design (NID)',
          period: '2022 - 2026',
          gpa: '3.94 / 4.0 GPA',
          coursework: 'Typography & Editorial Layout, Color Theory, Design Systems, Motion Graphics, Interaction Design, Brand Strategy, Packaging Design.'
        }
      ],
      experience: [
        {
          role: 'UI/UX & Brand Design Intern',
          company: 'Studio Monochrome Creative',
          period: 'June 2025 - Aug 2025',
          location: 'Bengaluru, India',
          bullets: [
            'Constructed a 120-component unified Figma design system, improving frontend handoff velocity by 40%.',
            'Designed brand visual language, icon packs, and landing page wireframes that converted at 8.4% (vs 4.2% industry average).',
            'Produced 15 animated vector Lottie illustrations for onboarding flows using Adobe After Effects and Illustrator.'
          ]
        }
      ],
      projects: [
        {
          title: 'Kinetic Type: Variable Font Showcase & Editorial Brand',
          techStack: ['Figma', 'Adobe Illustrator', 'After Effects', 'Spline 3D'],
          link: 'https://behance.net/diyakrishnan/kinetic-type',
          bullets: [
            'Created complete identity, bespoke variable typography, and 3D promotional assets featured on Awwwards Site of the Day.'
          ]
        }
      ],
      skills: {
        designTools: ['Figma (Master Components/Tokens)', 'Adobe Illustrator', 'Photoshop', 'After Effects', 'Spline 3D'],
        disciplines: ['Brand Identity', 'Design Systems', 'Micro-Interactions', 'Typography', 'Responsive Web Design'],
        prototyping: ['Protopie', 'Framer', 'Principle', 'Interactive Wireframing']
      },
      certifications: [
        'Google UX Design Professional Certificate',
        'Interaction Design Foundation (IxDF): Design for the 21st Century'
      ],
      honors: [
        'Awwwards Honorable Mention 2025',
        '1st Place – Kyoorius Student Design Awards (Brand Identity Category)'
      ]
    }
  },

  // 8. Finance, Accounting & Economics
  {
    id: 'finance-accounting-cpa',
    name: 'Finance, Audit & Quantitative Economics',
    collegeCourse: 'B.Com / B.Sc in Finance, Accounting & Economics',
    category: 'finance-econ',
    accentColor: '#15803d',
    styleClass: 'resume-finance',
    layout: 'classic-grid',
    description: 'Rigorous layout for financial analysts, chartered accountants, and quantitative economists with GAAP/IFRS auditing, DCF valuations, and econometric analysis.',
    cornerBadge: 'CFA FOUNDATION // AUDIT-READY',
    sealType: 'gold-crest',
    sampleData: {
      fullName: 'Karan Singhal',
      headline: 'Financial Analyst & Economics Graduate | Equity Research, IFRS & Valuation',
      email: 'karan.finance@audit.ac.in',
      phone: '+91 98200 66778',
      location: 'Mumbai, India',
      website: 'https://karan-finance.folioview.me',
      linkedin: 'https://linkedin.com/in/karan-singhal-finance',
      portfolioSlug: 'karan-portfolio',
      summary: 'Detail-oriented financial analyst with strong foundations in financial statement analysis, discounted cash flow (DCF) valuation, and statutory audit compliance. Cleared CFA Level 1 with 90th percentile scoring.',
      education: [
        {
          degree: 'Bachelor of Commerce (B.Com) – Accounting & Finance Honors',
          institution: 'Shri Ram College of Commerce (SRCC), Delhi University',
          period: '2023 - 2026',
          gpa: '9.65 / 10.0 CGPA (College Rank 2)',
          coursework: 'Corporate Accounting, Financial Management, Direct & Indirect Taxation (GST), Auditing Standards, Macroeconomics, Econometrics, Securities Markets.'
        }
      ],
      experience: [
        {
          role: 'Equity Research & Valuation Intern',
          company: 'Motilal Oswal Financial Services',
          period: 'June 2025 - Aug 2025',
          location: 'Mumbai, India',
          bullets: [
            'Built 3-statement financial models and 10-year DCF projections for 12 mid-cap manufacturing companies.',
            'Conducted sensitivity analysis on WACC, terminal growth rates, and EBITDA margins for institutional client briefs.',
            'Automated weekly equity performance trackers in Excel using Bloomberg Terminal API and Python pandas.'
          ]
        }
      ],
      projects: [
        {
          title: 'Macroeconomic Impact of Inflation on Consumer Discretionary Stocks',
          techStack: ['R', 'Python', 'Econometrics', 'STATA', 'Time Series Regression'],
          bullets: [
            'Conducted multivariate regression analysis across 10 years of NIFTY data, identifying strong predictive correlations with interest rate shifts.'
          ]
        }
      ],
      skills: {
        financialModeling: ['3-Statement Models', 'DCF Valuation', 'Comparable Company Analysis (Comps)', 'LBO Basics'],
        tools: ['Bloomberg Terminal', 'Advanced Excel / Macros', 'PowerBI', 'Python (pandas/numpy)', 'Tally Prime'],
        standards: ['IFRS', 'Indian Accounting Standards (Ind AS)', 'GST Filings', 'Statutory Audit']
      },
      certifications: [
        'CFA Institute: Passed CFA Level 1 (90th Percentile)',
        'Financial Modeling & Valuation Analyst (FMVA®) – CFI'
      ],
      honors: [
        '1st Place – National Finance Olympiad (SRCC)',
        'Treasurer – Commerce Society, Delhi University'
      ]
    }
  },

  // 9. Architecture & Civil Planning
  {
    id: 'arch-civil-bim',
    name: 'Architect & Sustainable Urban Planner',
    collegeCourse: 'B.Arch / B.Tech in Architecture & Civil Engineering',
    category: 'arch-civil',
    accentColor: '#475569',
    styleClass: 'resume-arch',
    layout: 'sidebar-left',
    description: 'Clean architectural blueprint resume for architects, BIM modelers, and structural planners with AutoCAD, Revit, and sustainable building design.',
    cornerBadge: 'COA ACCREDITED // BIM-LEVEL 2',
    sealType: 'compass-crest',
    sampleData: {
      fullName: 'Tanvi Kulkarni',
      headline: 'Architect & Sustainable Urban Designer | BIM, Revit & Biomimetic Facades',
      email: 'tanvi.arch@designbuild.org',
      phone: '+91 97654 33221',
      location: 'Ahmedabad, India',
      website: 'https://tanvi-arch.folioview.me',
      linkedin: 'https://linkedin.com/in/tanvi-kulkarni-arch',
      portfolioSlug: 'tanvi-portfolio',
      summary: 'Passionate architectural designer with expertise in parametric facade modeling, Building Information Modeling (BIM Level 2), and energy-positive sustainable construction. Experienced coordinating multi-disciplinary MEP and structural engineering drawings.',
      education: [
        {
          degree: 'Bachelor of Architecture (B.Arch) – 5-Year Professional Degree',
          institution: 'CEPT University, Ahmedabad',
          period: '2021 - 2026',
          gpa: '3.88 / 4.0 GPA',
          coursework: 'Architectural Design Studios, Building Materials & Construction, Structural Mechanics, Sustainable Architecture, Urban Planning, History of Architecture, Climatology.'
        }
      ],
      experience: [
        {
          role: 'Architectural Intern',
          company: 'Morphogenesis Studio',
          period: 'Jan 2025 - June 2025',
          location: 'New Delhi, India',
          bullets: [
            'Developed detailed architectural working drawings, door/window schedules, and interior joinery details for a 50,000 sq.ft commercial campus.',
            'Simulated passive solar shading and daylight lux levels in Rhino Grasshopper and Ladybug, reducing anticipated cooling load by 22%.',
            'Attended weekly on-site structural inspections, verifying steel rebar placements against civil engineering specifications.'
          ]
        }
      ],
      projects: [
        {
          title: 'Regenerative Eco-Hub: Zero-Carbon Urban Transit Terminal',
          techStack: ['Autodesk Revit', 'Rhino 3D', 'Grasshopper', 'Enscape', 'Lumion'],
          bullets: [
            'Designed modular mass-timber transit station incorporating rainwater harvesting, integrated photovoltaic canopies, and natural wind-tunnel ventilation.'
          ]
        }
      ],
      skills: {
        modelingSoftware: ['Autodesk Revit (BIM)', 'AutoCAD', 'Rhino 3D', 'Grasshopper (Parametric)', 'SketchUp'],
        renderingAnalysis: ['Enscape', 'Lumion', 'V-Ray', 'Ladybug Tools (Daylight Simulation)', 'Photoshop'],
        constructionKnowledge: ['Working Drawings', 'Joinery Details', 'Cost Estimation (BOQ)', 'NBC Code Compliance']
      },
      certifications: [
        'Autodesk Certified Professional: Revit for Architectural Design',
        'IGBC (Indian Green Building Council) Accredited Faculty Student'
      ],
      honors: [
        'Winner – National NASA Design Competition (Louis I. Kahn Trophy)',
        'Selected Exhibitor – Ahmedabad Architecture Biennial 2025'
      ]
    }
  },

  // 10. Media, Journalism & Communications
  {
    id: 'media-journalism-comms',
    name: 'Investigative Journalist & Media Strategist',
    collegeCourse: 'BA / MA in Journalism, Mass Communication & Public Relations',
    category: 'journalism-pr',
    accentColor: '#b91c1c',
    styleClass: 'resume-media',
    layout: 'classic-editorial',
    description: 'Editorial newspaper-style resume for investigative journalists, broadcast producers, and PR communications leads with publications, podcasting, and press releases.',
    cornerBadge: 'PRESS CORPS // EDITORIAL LEAD',
    sealType: 'quill-crest',
    sampleData: {
      fullName: 'Kabir Sengupta',
      headline: 'Multimedia Journalist & Investigative Reporter | Digital Storytelling & Public Affairs',
      email: 'kabir.press@chronicle.media',
      phone: '+91 98199 22334',
      location: 'New Delhi, India',
      website: 'https://kabir-media.folioview.me',
      linkedin: 'https://linkedin.com/in/kabir-sengupta-media',
      portfolioSlug: 'kabir-portfolio',
      summary: 'Inquisitive multimedia journalist with published bylines in national publications including The Hindu, Scroll.in, and The Wire. Skilled in investigative field reporting, data visualization, broadcast news scriptwriting, and digital community audience engagement.',
      education: [
        {
          degree: 'B.A. in Journalism & Mass Communication',
          institution: 'Asian College of Journalism (ACJ) / Delhi University',
          period: '2023 - 2026',
          gpa: '8.82 / 10.0 CGPA',
          coursework: 'Investigative Journalism, Media Law & Ethics, Broadcast Production, Data Journalism, Digital Content Strategy, Public Relations, Political Science.'
        }
      ],
      experience: [
        {
          role: 'Reporting Intern (National Desk)',
          company: 'The Indian Express',
          period: 'May 2025 - July 2025',
          location: 'New Delhi, India',
          bullets: [
            'Broke 8 front-page investigative stories on urban municipal water allocation discrepancies across the NCR region.',
            'Conducted on-ground interviews with policy makers, civil rights activists, and impacted citizen groups.',
            'Produced high-engagement video explainers and social carousels that garnered 2.4M combined views.'
          ]
        }
      ],
      projects: [
        {
          title: 'The Air We Breathe: Data Journalism Investigation into Industrial Emissions',
          techStack: ['Python', 'QGIS Mapping', 'D3.js Data Visualizations', 'Audio Podcasting'],
          bullets: [
            'Analyzed 3 years of continuous ambient air quality monitoring (CAAQM) sensor logs to uncover nighttime emission spikes.'
          ]
        }
      ],
      skills: {
        reporting: ['Field Investigation', 'Deep Background Interviewing', 'Fact Checking', 'RTI (Right to Information) Filings'],
        production: ['Adobe Premiere Pro', 'Audacity / Sound Editing', 'DSLR Video Production', 'Broadcast Teleprompter'],
        digitalWriting: ['SEO Headline Optimization', 'Newsletter Curation (Substack)', 'Longform Essays']
      },
      certifications: [
        'Reuters Training: Digital Journalism Foundations',
        'Google News Initiative: Verification and Fact-Checking'
      ],
      honors: [
        'Best Student Journalist of the Year Award – Press Club of India (Youth)',
        'Lead Anchor – Campus News Daily Bulletin'
      ]
    }
  },

  // 11-20: Elite Modern & Professional Variations
  {
    id: 'modern-tech-lead',
    name: 'Modern Tech Lead & Principal Architect',
    collegeCourse: 'Senior Engineering & Architecture Leadership',
    category: 'professional',
    accentColor: '#4f46e5',
    styleClass: 'resume-tech-lead',
    layout: 'sidebar-left',
    description: 'Two-column dark-mode-ready sidebar resume highlighting high-scale technical leadership, architectural paradigms, and business revenue impact.',
    cornerBadge: 'ARCH_LEAD // TIER-1',
    sealType: 'tech-hash',
    sampleData: {
      fullName: 'Meera Nambiar',
      headline: 'Principal Software Architect | Cloud Native, Kubernetes & Distributed Event Streams',
      email: 'meera.nambiar@cloudarch.io',
      phone: '+91 99887 11223',
      location: 'Hyderabad, India',
      website: 'https://meera-architect.folioview.me',
      github: 'https://github.com/meera-architect',
      linkedin: 'https://linkedin.com/in/meera-nambiar',
      portfolioSlug: 'meera-portfolio',
      summary: 'Seasoned systems architect with 7+ years of experience building mission-critical fault-tolerant platforms. Directed modernization of payment gateway processing $45M in monthly transaction volume with 99.999% uptime SLA.',
      education: [
        {
          degree: 'M.Tech in Computer Science & Distributed Systems',
          institution: 'IIT Madras',
          period: '2019 - 2021',
          gpa: '9.8 / 10.0 CGPA'
        }
      ],
      experience: [
        {
          role: 'Staff Infrastructure Architect',
          company: 'FinVelocity Global',
          period: '2023 - Present',
          location: 'Hyderabad, India',
          bullets: [
            'Spearheaded migration of legacy monolithic banking core to 40+ containerized Go microservices on AWS EKS.',
            'Mentored 18 senior developers across 3 agile squads in domain-driven design and event-sourcing best practices.'
          ]
        }
      ],
      projects: [
        {
          title: 'High-Throughput Zero-Loss Event Bridge',
          techStack: ['Apache Kafka', 'Go', 'gRPC', 'RocksDB'],
          bullets: ['Engineered pipeline processing 250k events/sec with sub-second disaster recovery failover.']
        }
      ],
      skills: {
        systems: ['Kubernetes', 'AWS', 'Terraform', 'Kafka', 'Go', 'Distributed Transactions'],
        leadership: ['Technical Vision', 'RFC Specification', 'C-Suite Tech Alignment', 'Staff Mentorship']
      },
      certifications: ['AWS Certified Solutions Architect – Professional', 'Certified Kubernetes Administrator (CKA)'],
      honors: ['Speaker – KubeCon India 2024', 'Author of "Scaling Microservices with Kafka"']
    }
  },

  {
    id: 'minimalist-ats-clean',
    name: 'Minimalist ATS-Clean Standard',
    collegeCourse: 'Universally Compatible with all ATS Parsers (99% Score)',
    category: 'professional',
    accentColor: '#1e293b',
    styleClass: 'resume-ats-clean',
    layout: 'classic-grid',
    description: 'Black and white, single-column, strictly standardized format engineered to pass Taleo, Workday, and Greenhouse ATS scanners with zero parsing errors.',
    cornerBadge: 'ATS VERIFIED // 100% PARSE',
    sealType: 'clean-border',
    sampleData: {
      fullName: 'Rahul Venkat',
      headline: 'Full Stack Software Engineer | React, Node.js & Cloud Services',
      email: 'rahul.venkat@work.com',
      phone: '+91 98765 00112',
      location: 'Bengaluru, Karnataka, India',
      website: 'https://rahul-venkat.folioview.me',
      linkedin: 'https://linkedin.com/in/rahul-venkat',
      portfolioSlug: 'rahul-portfolio',
      summary: 'Results-driven Full Stack Engineer with 3+ years of experience developing responsive web applications and RESTful APIs. Proficient in JavaScript, TypeScript, React, Node.js, and SQL databases. Strong track record of improving web performance and application reliability.',
      education: [
        {
          degree: 'Bachelor of Engineering in Information Technology',
          institution: 'Visvesvaraya Technological University (VTU)',
          period: '2020 - 2024',
          gpa: '8.7 / 10.0 CGPA',
          coursework: 'Data Structures, Software Engineering, Database Systems, Web Technologies.'
        }
      ],
      experience: [
        {
          role: 'Full Stack Engineer',
          company: 'Accenture Solutions',
          period: 'July 2024 - Present',
          location: 'Bengaluru, India',
          bullets: [
            'Developed modular React components, improving page load speed by 35% across high-traffic customer portals.',
            'Built RESTful API microservices in Express.js supporting 500,000 monthly active users.',
            'Collaborated with QA automation team to implement unit and integration tests with Jest, achieving 88% test coverage.'
          ]
        }
      ],
      projects: [
        {
          title: 'E-Commerce Inventory Analytics Dashboard',
          techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
          bullets: [
            'Created real-time inventory management tool used by 12 retail merchants to automate low-stock alerts.'
          ]
        }
      ],
      skills: {
        frontend: ['JavaScript (ES6+)', 'TypeScript', 'React.js', 'HTML5', 'CSS3', 'Redux Toolkit'],
        backend: ['Node.js', 'Express.js', 'REST APIs', 'PostgreSQL', 'MongoDB'],
        tools: ['Git', 'GitHub', 'Docker', 'Postman', 'Jira', 'Jest']
      },
      certifications: ['Meta Certified Front-End Developer', 'Oracle Certified Associate: Java SE 8 Programmer'],
      honors: ['Spot Award for Outstanding Contribution – Accenture Q4 2024']
    }
  },

  {
    id: 'harvard-academic-ivy',
    name: 'Harvard / Ivy League Academic',
    collegeCourse: 'Academic Fellowship, Master’s & Ph.D. Applications',
    category: 'professional',
    accentColor: '#881337',
    styleClass: 'resume-harvard',
    layout: 'classic-editorial',
    description: 'Prestigious, traditional serif format favored by Ivy League universities, Rhodes scholarships, Fulbright fellowships, and scientific institutions.',
    cornerBadge: 'ACADEMIA // MERIT SCHOLAR',
    sealType: 'laurel-crest',
    sampleData: {
      fullName: 'Aanya Bhattacharya',
      headline: 'Pre-Doctoral Fellow in Computational Economics & Game Theory',
      email: 'aanya.bhatt@harvard.edu',
      phone: '+1 (617) 495-1000',
      location: 'Cambridge, MA / New Delhi, India',
      website: 'https://aanya-academic.folioview.me',
      portfolioSlug: 'aanya-portfolio',
      summary: 'Economics and computational mathematics scholar with publications in equilibrium dynamics, algorithmic mechanism design, and behavioral game theory. Recipient of the National Science Foundation Graduate Research Fellowship Honorable Mention.',
      education: [
        {
          degree: 'Master of Science in Computational Economics',
          institution: 'Harvard University – Graduate School of Arts and Sciences',
          period: '2024 - 2026',
          gpa: '3.98 / 4.0 GPA',
          coursework: 'Microeconomic Theory, Advanced Game Theory, Machine Learning for Econometrics, Stochastic Processes.'
        },
        {
          degree: 'Bachelor of Arts (Honors) in Economics & Mathematics',
          institution: 'St. Stephen’s College, Delhi',
          period: '2020 - 2023',
          gpa: 'Summa Cum Laude'
        }
      ],
      experience: [
        {
          role: 'Graduate Research Assistant',
          company: 'Harvard Institute for Quantitative Social Science (IQSS)',
          period: '2024 - Present',
          bullets: [
            'Conducted Monte Carlo simulations analyzing auction pricing anomalies under imperfect information.',
            'Co-authored working paper presented at the 2025 NBER Summer Institute on Algorithmic Economics.'
          ]
        }
      ],
      projects: [
        {
          title: 'Dynamic Resource Allocation in Healthcare Rationing',
          techStack: ['Python', 'Julia', 'Mathematical Optimization'],
          bullets: ['Formulated multi-agent Pareto-optimal matching algorithm implemented in 3 hospital triage simulations.']
        }
      ],
      skills: {
        quantitative: ['Game Theory', 'Econometrics', 'Stochastic Calculus', 'Optimization'],
        computational: ['Python', 'Julia', 'R', 'MATLAB', 'LaTeX (Typesetting)']
      },
      certifications: ['Harvard Bok Center Teaching Certificate in Higher Education'],
      honors: ['Rhodes Scholarship National Finalist', 'President’s Gold Medal for Academic Distinction']
    }
  },

  {
    id: 'creative-portfolio-chic',
    name: 'Creative Visual Director & Stylist',
    collegeCourse: 'Creative Arts, Art Direction & Fashion Media',
    category: 'professional',
    accentColor: '#d97706',
    styleClass: 'resume-chic',
    layout: 'asymmetric-creative',
    description: 'Chic, bold visual aesthetic with warm golden tones, editorial serif headers, and expressive project spotlight blocks for art directors.',
    cornerBadge: 'HAUTE ATELIER // ART DIR',
    sealType: 'gold-crest',
    sampleData: {
      fullName: 'Tara Mukherjee',
      headline: 'Creative Director & Fashion Media Stylist | Brand Storytelling & Editorial Campaigns',
      email: 'tara@atelier-creative.com',
      phone: '+91 99001 22334',
      location: 'Mumbai, India',
      website: 'https://tara-creative.folioview.me',
      portfolioSlug: 'tara-portfolio',
      summary: 'Dynamic creative director with 6+ years spearheading visual narratives for luxury apparel, beauty brands, and editorial magazines. Directed visual campaigns generating 40M+ social impressions.',
      education: [
        {
          degree: 'Master of Arts in Fashion Communication & Styling',
          institution: 'London College of Fashion',
          period: '2021 - 2023',
          gpa: 'Distinction'
        }
      ],
      experience: [
        {
          role: 'Senior Visual Art Director',
          company: 'Condé Nast International',
          period: '2023 - Present',
          bullets: [
            'Conceptualized 14 cover story editorial photo shoots from mood-boarding to post-production color grading.',
            'Managed creative crew of 25 including photographers, set designers, stylists, and digital retouchers.'
          ]
        }
      ],
      skills: {
        creative: ['Art Direction', 'Set Design', 'Editorial Casting', 'Color Grading', 'Visual Merchandising'],
        tools: ['Adobe Creative Suite', 'Capture One Pro', 'Figma', 'Cinema 4D']
      },
      certifications: ['British Fashion Council: Creative Direction Excellence'],
      honors: ['Featured in Vogue India "30 Under 30 Creative Visionaries"']
    }
  },

  {
    id: 'executive-c-suite',
    name: 'Executive C-Suite & Board Director',
    collegeCourse: 'Executive Leadership, Managing Director & VP Roles',
    category: 'professional',
    accentColor: '#1e3a8a',
    styleClass: 'resume-executive',
    layout: 'executive-split',
    description: 'Deep navy and gold accents, structured for Chief Technology Officers, CEOs, Managing Directors, and venture partners with multi-million dollar P&L ownership.',
    cornerBadge: 'C-LEVEL VERIFIED // P&L EXEC',
    sealType: 'gold-crest',
    sampleData: {
      fullName: 'Rajeshwar Singhal',
      headline: 'Chief Technology Officer | Digital Transformation, $50M+ P&L, Global Engineering Teams',
      email: 'rajeshwar@singhal-holdings.com',
      phone: '+91 98200 11009',
      location: 'Bengaluru / Singapore',
      website: 'https://rajeshwar-exec.folioview.me',
      portfolioSlug: 'rajeshwar-portfolio',
      summary: 'Transformational technology executive with 15+ years scaling enterprise SaaS platforms from seed stage to IPO. Managed global organization of 350+ engineers, data scientists, and product leaders with total P&L oversight exceeding $55M.',
      education: [
        {
          degree: 'Executive MBA (Global Leadership)',
          institution: 'INSEAD',
          period: '2016 - 2017'
        },
        {
          degree: 'B.Tech in Computer Science',
          institution: 'IIT Delhi',
          period: '2005 - 2009'
        }
      ],
      experience: [
        {
          role: 'Chief Technology Officer (CTO)',
          company: 'CloudSphere Enterprise Systems',
          period: '2021 - Present',
          bullets: [
            'Drove ARR from $18M to $62M over 3 years while reducing infrastructure unit cost by 32%.',
            'Architected AI-powered enterprise orchestration platform deployed across 45 Fortune 500 financial clients.'
          ]
        }
      ],
      skills: {
        executive: ['P&L Management', 'M&A Due Diligence', 'Board Advisory', 'Enterprise IT Governance', 'Strategic Hiring'],
        techLeadership: ['Cloud Native Platforms', 'Enterprise Cybersecurity', 'GenAI Strategy']
      },
      honors: ['Forbes Technology Council Member', 'CTO of the Year – Enterprise Tech Summit 2024']
    }
  },

  {
    id: 'research-scientist-phd',
    name: 'Research Scientist & Ph.D. Fellow',
    collegeCourse: 'Ph.D. / Postdoc in Applied Sciences, Physics & AI',
    category: 'professional',
    accentColor: '#7c3aed',
    styleClass: 'resume-research',
    layout: 'classic-editorial',
    description: 'Comprehensive research CV with publication citations, h-index metrics, patent grants, and conference proceedings.',
    cornerBadge: 'PEER REVIEWED // PH.D.',
    sealType: 'laurel-crest',
    sampleData: {
      fullName: 'Dr. Devika Ramachandran, Ph.D.',
      headline: 'Senior Research Scientist | Quantum Computing & Topological Insulators',
      email: 'devika.ram@quantum-lab.org',
      phone: '+91 98401 55667',
      location: 'Bengaluru, India',
      website: 'https://dr-devika.folioview.me',
      portfolioSlug: 'devika-portfolio',
      summary: 'Quantum physicist and computational scientist with 18 peer-reviewed publications (h-index: 12, 850+ citations) in Physical Review Letters and Nature Quantum Information. Inventor of 2 granted patents in superconducting qubit coherence.',
      education: [
        {
          degree: 'Ph.D. in Condensed Matter Physics & Quantum Information',
          institution: 'Indian Institute of Science (IISc)',
          period: '2019 - 2024',
          gpa: 'President’s Medal for Best Doctoral Thesis'
        }
      ],
      experience: [
        {
          role: 'Postdoctoral Research Scientist',
          company: 'National Quantum Simulation Center',
          period: '2024 - Present',
          bullets: [
            'Designed 16-qubit cryogenic microwave pulse sequences, extending coherence T2 times by 28%.',
            'Awarded $400,000 national scientific research grant for fault-tolerant error mitigation.'
          ]
        }
      ],
      skills: {
        physicsLab: ['Cryogenics (Dilution Refrigerators)', 'Microwave Electronics', 'Quantum Circuit Modeling'],
        computation: ['Qiskit', 'Python', 'QuTiP', 'High Performance Computing (MPI/OpenMP)']
      },
      honors: ['DST-Inspire Faculty Fellow', 'Young Scientist Award – Indian Academy of Sciences']
    }
  },

  {
    id: 'fullstack-dev-showcase',
    name: 'Full-Stack Web Architect',
    collegeCourse: 'Full Stack Engineering, Cloud Services & Web Systems',
    category: 'professional',
    accentColor: '#0ea5e9',
    styleClass: 'resume-fullstack',
    layout: 'sidebar-left',
    description: 'Modern developer layout showcasing stack icons, live project links, microservices architecture, and GitHub metrics.',
    cornerBadge: 'FULLSTACK // GIT-ACTIVE',
    sealType: 'tech-hash',
    sampleData: {
      fullName: 'Nikhil Kashyap',
      headline: 'Full Stack Web Developer | Next.js, Node.js, GraphQL & Postgres',
      email: 'nikhil@devworks.io',
      phone: '+91 98112 33445',
      location: 'Gurugram, India',
      website: 'https://nikhil-web.folioview.me',
      github: 'https://github.com/nikhil-web',
      portfolioSlug: 'nikhil-portfolio',
      summary: 'Full Stack Engineer passionate about 60fps web apps, serverless architectures, and real-time collaborative interfaces. Built open-source libraries with 15k+ monthly npm downloads.',
      education: [
        {
          degree: 'B.Tech in Computer Science & Engineering',
          institution: 'Delhi Technological University (DTU)',
          period: '2021 - 2025',
          gpa: '8.8 / 10.0 CGPA'
        }
      ],
      experience: [
        {
          role: 'Full Stack Developer',
          company: 'SaaSify Platforms',
          period: '2024 - Present',
          bullets: [
            'Built real-time collaborative canvas using WebSockets and CRDTs, supporting 100 simultaneous concurrent editors.',
            'Migrated REST backend to GraphQL federation, cutting frontend bundle size and payload transfers by 50%.'
          ]
        }
      ],
      skills: {
        frontend: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Zustand', 'WebSockets'],
        backend: ['Node.js', 'Go', 'GraphQL', 'PostgreSQL', 'Redis', 'Docker']
      },
      honors: ['Winner – HackIndia 2024', 'GitHub Arctic Code Vault Contributor']
    }
  },

  {
    id: 'product-manager-growth',
    name: 'Product Manager & Growth Lead',
    collegeCourse: 'Product Management, Agile Strategy & User Experience',
    category: 'professional',
    accentColor: '#8b5cf6',
    styleClass: 'resume-pm',
    layout: 'classic-grid',
    description: 'KPI and outcome-focused resume for Product Managers emphasizing PRDs, sprint delivery, retention funnels, and MRR expansion.',
    cornerBadge: 'PRODUCT LEAD // 10X GROWTH',
    sealType: 'gold-crest',
    sampleData: {
      fullName: 'Sanya Kapoor',
      headline: 'Product Manager | B2B SaaS, User Growth Funnels & Agile Delivery',
      email: 'sanya.pm@productgrowth.co',
      phone: '+91 99110 99887',
      location: 'Bengaluru, India',
      website: 'https://sanya-pm.folioview.me',
      portfolioSlug: 'sanya-portfolio',
      summary: 'Product leader who bridges customer empathy, engineering constraints, and business ROI. Scaled self-serve B2B SaaS product from $800k to $3.2M ARR with a 42% lift in trial-to-paid conversions.',
      education: [
        {
          degree: 'B.Tech in Computer Science + Minor in Economics',
          institution: 'BITS Pilani',
          period: '2020 - 2024',
          gpa: '9.1 / 10.0 CGPA'
        }
      ],
      experience: [
        {
          role: 'Product Manager – Growth & Activation',
          company: 'FlowSync SaaS',
          period: '2024 - Present',
          bullets: [
            'Led cross-functional team of 8 engineers and 2 product designers to revamp user onboarding journey.',
            'Conducted 45 customer discovery interviews and ran 20+ A/B tests yielding 18% improvement in Week-4 cohort retention.'
          ]
        }
      ],
      skills: {
        pmMethodologies: ['PRD Writing', 'A/B Experimentation', 'Customer Journey Mapping', 'Sprint Planning (Scrum)'],
        tools: ['Amplitude', 'Mixpanel', 'Jira', 'Figma', 'SQL', 'PostHog']
      },
      certifications: ['Reforge: Product Strategy & Growth Series', 'Scrum Alliance: Certified Scrum Product Owner (CSPO)'],
      honors: ['Speaker – ProductCamp South Asia 2025']
    }
  },

  {
    id: 'data-scientist-ml',
    name: 'Data Scientist & Applied ML Engineer',
    collegeCourse: 'Data Science, Big Data Analytics & Machine Learning',
    category: 'professional',
    accentColor: '#10b981',
    styleClass: 'resume-ds',
    layout: 'sidebar-left',
    description: 'Quantitative layout tailored for data scientists featuring Kaggle rankings, predictive accuracy metrics, and data pipeline architectures.',
    cornerBadge: 'DATA CERTIFIED // ML-OPS',
    sealType: 'tech-hash',
    sampleData: {
      fullName: 'Arjun Namboodiri',
      headline: 'Data Scientist & Machine Learning Engineer | LLM Fine-Tuning & MLOps',
      email: 'arjun.ds@datalab.ai',
      phone: '+91 98860 33441',
      location: 'Bengaluru, India',
      website: 'https://arjun-ds.folioview.me',
      github: 'https://github.com/arjun-ds',
      portfolioSlug: 'arjun-portfolio',
      summary: 'Applied Machine Learning practitioner with deep expertise in PyTorch, transformers, and production MLOps. Ranked in top 1% (Kaggle Competitions Master) with 3 gold medals in predictive modeling.',
      education: [
        {
          degree: 'B.Tech & M.Tech Dual Degree in Data Science',
          institution: 'IIT Kharagpur',
          period: '2020 - 2025',
          gpa: '9.3 / 10.0 CGPA'
        }
      ],
      experience: [
        {
          role: 'Data Science Intern',
          company: 'Predictive Insights AI',
          period: '2024 - 2025',
          bullets: [
            'Built customer churn predictive model in XGBoost reducing subscriber attrition by 14% ($1.1M annualized savings).',
            'Fine-tuned open-source Llama-3 8B model on proprietary domain corpus using LoRA and vLLM inference server.'
          ]
        }
      ],
      skills: {
        mlStack: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'vLLM', 'HuggingFace', 'LangChain'],
        dataEngineering: ['Python', 'SQL', 'Apache Spark', 'Snowflake', 'Docker', 'MLflow']
      },
      certifications: ['Databricks Certified Machine Learning Professional', 'DeepLearning.AI: MLOps Specialization'],
      honors: ['Kaggle Competitions Master (Global Rank #240)', '1st Place – Inter-IIT Tech Meet Data Science Challenge']
    }
  },

  {
    id: 'global-consultant-bcg',
    name: 'Global Management Consultant (MBB Style)',
    collegeCourse: 'Strategic Advisory & Operations Excellence',
    category: 'professional',
    accentColor: '#334155',
    styleClass: 'resume-consultant',
    layout: 'classic-grid',
    description: 'Precision structured McKinsey/BCG/Bain bullet points with metric-first syntax, structured synthesis, and corporate turnaround highlights.',
    cornerBadge: 'MANAGEMENT ADVISORY // MBB',
    sealType: 'gold-crest',
    sampleData: {
      fullName: 'Aditya Khemka',
      headline: 'Management Consultant | Operational Transformation & Commercial Strategy',
      email: 'aditya.khemka@advisory.global',
      phone: '+91 98100 88776',
      location: 'New Delhi / Dubai',
      website: 'https://aditya-consultant.folioview.me',
      portfolioSlug: 'aditya-portfolio',
      summary: 'Top-tier management consultant specializing in commercial turnaround, supply chain network redesign, and organizational restructuring. Led strategic engagement streams across manufacturing, aviation, and financial services.',
      education: [
        {
          degree: 'Bachelor of Economics (Honors)',
          institution: 'London School of Economics (LSE) / SRCC',
          period: '2021 - 2024',
          gpa: 'First Class Honors (Dean’s List)'
        }
      ],
      experience: [
        {
          role: 'Junior Associate Consultant',
          company: 'Strategic Horizons Partners',
          period: '2024 - Present',
          bullets: [
            'Delivered $14M in procurement savings for a tier-1 auto manufacturer through vendor renegotiation and clean-sheet cost analysis.',
            'Diagnosed organizational bottlenecks across 3 business units, structuring revised RACI matrix and KPIs for 1,200 employees.'
          ]
        }
      ],
      skills: {
        advisory: ['Issue-Tree Problem Solving', 'Hypothesis-Driven Synthesis', 'Executive Alignment', 'Zero-Based Budgeting'],
        analytics: ['Advanced Financial Modeling', 'Alteryx', 'Tableau', 'PowerPoint Mastery']
      },
      honors: ['Consultant of the Quarter (2025)', 'Winner – Global Case Competition at Warwick']
    }
  },

  // 22. Cybersecurity & SOC Threat Hunter 🛡️
  {
    id: 'cybersecurity-threat-intel',
    name: 'Cybersecurity & SOC Threat Hunter 🛡️',
    collegeCourse: 'B.Tech / M.S. in Cybersecurity & Information Assurance',
    category: 'cs-ai',
    accentColor: '#10b981',
    styleClass: 'resume-cybersec',
    layout: 'sidebar-left',
    description: 'Engineered for SOC analysts, penetration testers, and threat hunters with SIEM telemetry, zero-day CVE audits, MITRE ATT&CK framework mapping, and defensive security ops.',
    cornerBadge: 'SOC_VERIFIED // CVE-SEC 🛡️',
    sealType: 'tech-hash',
    sampleData: {
      fullName: 'Vikramaditya Rao',
      headline: 'Cybersecurity Operations Analyst | Blue Team & Threat Intelligence Specialist 🛡️',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      showPhoto: true,
      skillsHeading: 'Technical & Functional Skills',
      showSkills: true,
      email: 'vikram.sec@cert-in.org',
      phone: '+91 97110 33442',
      location: 'Hyderabad, India',
      website: 'https://vikram-cybersec.folioview.me',
      github: 'https://github.com/vikram-soc',
      linkedin: 'https://linkedin.com/in/vikram-rao-sec',
      portfolioSlug: 'vikram-security',
      summary: 'Cybersecurity analyst with comprehensive experience in Splunk SIEM orchestration, MITRE ATT&CK hunting, incident forensics, and cloud infrastructure hardening. Mitigated 140+ high-severity attack vectors and authored 3 internal CVE containment advisories.',
      education: [
        {
          degree: 'B.Tech in Computer Science (Cybersecurity & Forensics)',
          institution: 'IIIT Hyderabad / Center for Cyber Security',
          period: '2021 - 2025',
          gpa: '9.2 / 10.0 OGPA',
          coursework: 'Network Penetration Testing, Malware Analysis, Reverse Engineering, Cryptographic Protocols, Digital Forensics, SIEM Orchestration, Cloud Security.'
        }
      ],
      experience: [
        {
          role: 'SOC Incident Response Analyst',
          company: 'DefendX Cyber Defense Center',
          period: '2024 - Present',
          location: 'Hyderabad',
          bullets: [
            'Monitored enterprise SIEM triaging 12,000+ daily telemetry events across AWS and hybrid infrastructure with <12 min MTTD.',
            'Conducted red-team evasion simulation identifying vulnerable Active Directory Kerberoasting paths, remediating credential exposure across 4,500 domain endpoints.',
            'Engineered automated SOAR playbooks in Python reducing phishing investigation triage time by 65%.'
          ]
        }
      ],
      projects: [
        {
          title: 'AegisTrap: Distributed Honeynet & Threat Telemetry Mesh 🛡️',
          techStack: ['Python', 'Docker', 'Elasticsearch', 'Suricata IDS', 'FastAPI'],
          link: 'https://github.com/vikram-soc/aegistrap-honeynet',
          bullets: [
            'Deployed multi-region honeynet collecting 80,000+ automated brute-force payloads; categorized attackers using ML signature clustering.'
          ]
        }
      ],
      skills: {
        securityOps: ['Splunk SIEM', 'Suricata / Snort IDS', 'Wireshark', 'Burp Suite Pro', 'Metasploit', 'Nessus'],
        defenseFrameworks: ['MITRE ATT&CK', 'NIST CSF', 'ISO 27001', 'Active Directory Hardening', 'Zero Trust Architecture'],
        certifications: ['CompTIA Security+', 'CEH (Certified Ethical Hacker)', 'Blue Team Level 1 (BTL1)']
      },
      certifications: [
        'Certified Information Systems Security Professional (Associate)',
        'CompTIA Security+ Certified (SY0-701)',
        'Blue Team Level 1 (BTL1) Defensive Security'
      ],
      honors: [
        '1st Place – National Cyber Defense CTF (Indian CERT)',
        'Hall of Fame – Responsible Bug Bounty Disclosure (Government Portal)'
      ]
    }
  },

  // 23. Cloud Solutions & Site Reliability SRE ☁️
  {
    id: 'cloud-devops-sre',
    name: 'Cloud Solutions & Site Reliability SRE ☁️',
    collegeCourse: 'B.Tech / B.S. in Cloud Computing & DevOps Engineering',
    category: 'cs-ai',
    accentColor: '#0284c7',
    styleClass: 'resume-cloud-sre',
    layout: 'sidebar-right',
    description: 'Engineered for cloud architects, Kubernetes operators, and DevOps engineers with Terraform IaC pipelines, 99.99% uptime SLA metrics, and GitOps workflows.',
    cornerBadge: 'AWS & K8S CERTIFIED // SRE ☁️',
    sealType: 'gold-crest',
    sampleData: {
      fullName: 'Ananya Deshmukh',
      headline: 'Cloud Infrastructure & SRE Engineer | Kubernetes & GitOps Platform Architect ☁️',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      showPhoto: true,
      skillsHeading: 'Technical & Functional Skills',
      showSkills: true,
      email: 'ananya.cloud@infra.io',
      phone: '+91 99201 55667',
      location: 'Pune & Bengaluru, India',
      website: 'https://ananya-sre.folioview.me',
      github: 'https://github.com/ananya-cloudops',
      linkedin: 'https://linkedin.com/in/ananya-deshmukh-cloud',
      portfolioSlug: 'ananya-cloud',
      summary: 'Site Reliability Engineer with deep specialization in multi-region Kubernetes clusters, Terraform infrastructure-as-code, and canary deployment pipelines maintaining 99.99% availability for enterprise SaaS.',
      education: [
        {
          degree: 'B.Tech in Computer Engineering & Cloud Systems',
          institution: 'College of Engineering Pune (COEP)',
          period: '2021 - 2025',
          gpa: '9.42 / 10.0',
          coursework: 'Distributed Systems, Cloud Native Architecture, Container Orchestration, Linux Kernel Tuning, Site Reliability Engineering, Computer Networks.'
        }
      ],
      experience: [
        {
          role: 'DevOps & SRE Engineering Intern',
          company: 'ScaleCloud Global Infrastructure',
          period: '2024 - Present',
          bullets: [
            'Architected automated Terraform modules provisioning multi-AZ EKS clusters supporting 45 microservices and 1.8M daily API calls.',
            'Implemented Prometheus & Grafana alerting slashes with Prometheus AlertManager, cutting mean time to recovery (MTTR) by 48%.',
            'Migrated CI/CD pipelines to ArgoCD GitOps, standardizing zero-downtime rolling canary deployments across staging and production.'
          ]
        }
      ],
      projects: [
        {
          title: 'KubeSentinel: Autonomous Kubernetes Cluster Auto-Healer ☁️',
          techStack: ['Go', 'Kubernetes Client-go', 'Prometheus', 'Helm', 'Docker'],
          link: 'https://github.com/ananya-cloudops/kubesentinel',
          bullets: [
            'Developed Go daemon tracking CrashLoopBackOff pods, automating memory leak profiling and rolling pod restarts with zero service degradation.'
          ]
        }
      ],
      skills: {
        cloudInfra: ['AWS (EKS, VPC, IAM, RDS)', 'GCP Cloud Run', 'Terraform', 'Terragrunt', 'Ansible'],
        containersGitOps: ['Kubernetes', 'Docker', 'ArgoCD', 'Helm', 'GitHub Actions', 'GitLab CI'],
        observability: ['Prometheus', 'Grafana', 'OpenTelemetry', 'Datadog', 'ELK Stack']
      },
      certifications: [
        'Certified Kubernetes Administrator (CKA)',
        'AWS Certified Solutions Architect – Associate',
        'HashiCorp Certified: Terraform Associate'
      ],
      honors: [
        'KubeCon Cloud Native Hackathon – Top 5 Finalist',
        'Dean’s Commendation for Distributed Systems Capstone'
      ]
    }
  },

  // 24. Biotechnology & Genomic Data Scientist 🧬
  {
    id: 'biotech-genomics-research',
    name: 'Biotechnology & Genomic Data Scientist 🧬',
    collegeCourse: 'B.Tech / M.Sc. in Biotechnology & Computational Biology',
    category: 'healthcare-med',
    accentColor: '#8b5cf6',
    styleClass: 'resume-biotech',
    layout: 'two-column-split',
    description: 'Engineered for computational biologists, geneticists, and bio-informatics researchers with CRISPR pipeline logs, Next-Gen Sequencing (NGS) data, and lab protocols.',
    cornerBadge: 'GENOMICS // NIH-ALIGNED 🧬',
    sealType: 'leaf-seal',
    sampleData: {
      fullName: 'Dr. Meera Nambiar',
      headline: 'Biotechnology Researcher & Computational Genomics Lead | CRISPR & NGS Analytics 🧬',
      photoUrl: 'https://images.unsplash.com/photo-1594824813589-91a674404b90?auto=format&fit=crop&w=400&q=80',
      showPhoto: true,
      skillsHeading: 'Technical & Functional Skills',
      showSkills: true,
      email: 'meera.genomics@bio.res.in',
      phone: '+91 98401 22334',
      location: 'Bengaluru, India',
      website: 'https://meera-biotech.folioview.me',
      portfolioSlug: 'meera-genomics',
      summary: 'Computational biologist with 4+ years of academic research in cancer transcriptomics, RNA-seq variant calling, and molecular dynamics simulation. Published first-author paper in Journal of Molecular Biology.',
      education: [
        {
          degree: 'Integrated M.Sc & B.Tech in Biotechnology & Bioinformatics',
          institution: 'Indian Institute of Science (IISc), Bengaluru',
          period: '2020 - 2025',
          gpa: '9.65 / 10.0 (Institute Gold Medalist)',
          coursework: 'Computational Genomics, Molecular Cell Biology, Structural Biology, Genetic Engineering, NGS Algorithms, Biostatistics in R, Python for Bioinformatics.'
        }
      ],
      experience: [
        {
          role: 'Bioinformatics Research Fellow',
          company: 'Center for Cellular & Molecular Platforms (C-CAMP)',
          period: '2024 - Present',
          bullets: [
            'Analyzed whole-exome sequencing (WES) cohorts of 320 lung adenocarcinoma patients, isolating 14 novel driver mutations in non-coding regions.',
            'Optimized Nextflow variant-calling workflows decreasing CPU runtime on HPC cluster by 34%.'
          ]
        }
      ],
      projects: [
        {
          title: 'GeneTrack: Fast Scalable RNA-Seq Differential Expression Engine 🧬',
          techStack: ['Python', 'Biopython', 'DESeq2', 'R', 'Snakemake'],
          link: 'https://github.com/meera-biotech/genetrack-rna',
          bullets: [
            'Built automated pipeline processing raw FASTQ reads into annotated volcano plots and enriched pathway visualizers within 18 minutes.'
          ]
        }
      ],
      skills: {
        computationalBio: ['RNA-Seq / WES Analysis', 'Nextflow / Snakemake', 'GATK Best Practices', 'Biopython', 'R / Bioconductor'],
        wetLabProtocols: ['PCR / RT-qPCR', 'Gel Electrophoresis', 'Mammalian Cell Culture', 'CRISPR-Cas9 Transfection', 'ELISA Assays'],
        databases: ['NCBI BLAST', 'Ensembl', 'TCGA', 'UniProt', 'PDB']
      },
      certifications: [
        'NIH Certified Human Research Bioinformatics Fellow',
        'Illumina Certified NGS Data Analysis Specialist'
      ],
      honors: [
        'DBT-JRF Fellowship (All India Rank 3)',
        'Best Young Scientist Oral Presentation – International Congress of Genetics'
      ]
    }
  },

  // 25. Marine Oceanography & Naval Architecture 🌊
  {
    id: 'marine-naval-systems',
    name: 'Marine Oceanography & Naval Architecture 🌊',
    collegeCourse: 'B.Tech in Naval Architecture & Ocean Engineering',
    category: 'arch-civil',
    accentColor: '#0891b2',
    styleClass: 'resume-marine',
    layout: 'agri-bento',
    description: 'Engineered for marine technologists, naval architects, and hydrographic survey engineers with hull design aerodynamics, CFD wake analysis, and maritime safety compliance.',
    cornerBadge: 'RINA ACCREDITED // OCEANIC 🌊',
    sealType: 'gold-crest',
    sampleData: {
      fullName: 'Karthik Subramanian',
      headline: 'Naval Architect & Ocean Systems Engineer | Hull Hydrodynamics & Marine CFD 🌊',
      photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      showPhoto: true,
      skillsHeading: 'Technical & Functional Skills',
      showSkills: true,
      email: 'karthik.marine@naval.org',
      phone: '+91 94440 12890',
      location: 'Kochi & Chennai, India',
      website: 'https://karthik-marine.folioview.me',
      portfolioSlug: 'karthik-marine',
      summary: 'Naval architect specializing in green propulsion hull form optimization, non-linear seakeeping analysis, and computational fluid dynamics (CFD) for offshore catamarans and autonomous surface vessels.',
      education: [
        {
          degree: 'B.Tech in Naval Architecture & Ocean Engineering',
          institution: 'Indian Institute of Technology (IIT) Madras',
          period: '2021 - 2025',
          gpa: '9.1 / 10.0',
          coursework: 'Hydrostatics & Stability, Marine Hydrodynamics, Resistance & Propulsion, Ship Structures FEM, Offshore Platform Dynamics, Maritime Safety (IMO / SOLAS).'
        }
      ],
      experience: [
        {
          role: 'Naval Architecture Intern',
          company: 'Cochin Shipyard Design Bureau',
          period: '2024 - Present',
          bullets: [
            'Modeled parametric bulbous bow designs using Maxsurf & Rhino, reducing estimated wave-making resistance by 7.8% for 45m patrol craft.',
            'Executed ANSYS Fluent CFD simulations verifying hull skin-friction and boundary layer separation across varying Sea State conditions.'
          ]
        }
      ],
      projects: [
        {
          title: 'HydroGlider: Solar-Powered Autonomous Oceanographic Glider 🌊',
          techStack: ['Maxsurf', 'ANSYS Fluent', 'SolidWorks', 'MATLAB Marine Toolbox'],
          bullets: [
            'Designed variable-buoyancy marine vessel capable of 14-day persistent offshore bathymetric mapping in coastal shelf waters.'
          ]
        }
      ],
      skills: {
        navalCAD: ['Maxsurf Enterprise', 'Rhino 3D Marine', 'AutoCAD Marine', 'SolidWorks'],
        marineSimulation: ['ANSYS Fluent (CFD)', 'SESAM GeniE', 'MATLAB Seakeeping', 'Hull Resistance Analytics'],
        standards: ['IMO / SOLAS Codes', 'RINA Rules', 'DNV GL Offshore Standards']
      },
      certifications: [
        'RINA Certified Naval Architect Trainee',
        'Certified Marine CFD Specialist (ANSYS)'
      ],
      honors: [
        '1st Prize – National Student Naval Architecture Design Contest (INEC)',
        'IIT Madras Institute Merit Award for Marine Capstone'
      ]
    }
  },

  // 26. Interactive Game Systems & Unreal/Unity Engine 🎮
  {
    id: 'game-dev-graphics',
    name: 'Interactive Game Systems & Unreal/Unity 🎮',
    collegeCourse: 'B.Des / B.Tech in Game Design & Interactive Graphics',
    category: 'design-media',
    accentColor: '#ec4899',
    styleClass: 'resume-gamedev',
    layout: 'bento-grid',
    description: 'Engineered for gameplay engineers, graphics programmers, and level designers with HLSL shader code, real-time physics, multiplayer replication, and Steam titles.',
    cornerBadge: 'UNREAL AUTHOR // GAME-DEV 🎮',
    sealType: 'tech-hash',
    sampleData: {
      fullName: 'Rohan Varma',
      headline: 'Gameplay Systems & Real-time Graphics Engineer | Unreal Engine 5 & C++ 🎮',
      photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      showPhoto: true,
      skillsHeading: 'Technical & Functional Skills',
      showSkills: true,
      email: 'rohan.games@gamedev.net',
      phone: '+91 98200 44556',
      location: 'Bengaluru, India',
      website: 'https://rohan-gamedev.folioview.me',
      github: 'https://github.com/rohan-gamedev',
      portfolioSlug: 'rohan-games',
      summary: 'Game developer with 5+ years of personal and studio indie game development. Proficient in Unreal Engine 5 C++ architecture, custom HLSL compute shaders, and low-latency network synchronization for 60fps multiplayer games.',
      education: [
        {
          degree: 'B.Tech in Computer Science (Game Technology & VR)',
          institution: 'SRM Institute of Science & Technology / Rubika Partner Program',
          period: '2021 - 2025',
          gpa: '9.3 / 10.0',
          coursework: 'Real-time Computer Graphics, C++ Game Architecture, 3D Mathematics, Physics Engines, Shader Programming, Multiplayer Network Replication, Game AI.'
        }
      ],
      experience: [
        {
          role: 'Junior Gameplay Programmer',
          company: 'HyperPixel Games Studio',
          period: '2024 - Present',
          bullets: [
            'Authored character locomotion state machines in UE5 C++ utilizing motion matching and IK foot placement at constant 60 FPS.',
            'Optimized draw call batching and Niagara particle effects, lifting baseline rendering performance by 22% on mid-tier consoles.'
          ]
        }
      ],
      projects: [
        {
          title: 'NeonDrift: Sci-Fi Anti-Gravity Racing Game (Steam Demo) 🎮',
          techStack: ['Unreal Engine 5', 'C++', 'HLSL Shaders', 'Niagara VFX', 'Blender'],
          link: 'https://github.com/rohan-gamedev/neondrift-engine',
          bullets: [
            'Created complete physics vehicle controller with custom raycast suspension and dynamic volumetric slipstream lighting.'
          ]
        }
      ],
      skills: {
        gameEngines: ['Unreal Engine 5 (C++ & Blueprints)', 'Unity (C#)', 'Godot Engine'],
        graphicsShaders: ['HLSL / GLSL', 'PBR Materials', 'Niagara VFX', 'DirectX 12 / Vulkan Basics', 'RenderDoc Profiling'],
        coreMath: ['Linear Algebra & Quaternions', 'Spatial Partitioning (BVH, Octrees)', 'Network Replication']
      },
      certifications: [
        'Epic Games Unreal Engine 5 Certified Developer',
        'Unity Certified Professional Programmer'
      ],
      honors: [
        'Winner – India Game Developer Conference (IGDC) Student Game of the Year',
        'Global Game Jam Best Technical Achievement Award'
      ]
    }
  },

  // 27. Quantitative Finance & Algorithmic Trading 📊
  {
    id: 'fintech-quant-trader',
    name: 'Quantitative Finance & Algorithmic Trading 📊',
    collegeCourse: 'M.S. / B.S. in Financial Engineering & Stochastic Calculus',
    category: 'finance-econ',
    accentColor: '#f59e0b',
    styleClass: 'resume-quant',
    layout: 'metrics-compact',
    description: 'Engineered for algorithmic traders, quantitative analysts, and financial engineers with backtested Sharpe ratios, risk parity models, and low-latency order execution.',
    cornerBadge: 'QUANT ENGINEER // LOW-LATENCY 📊',
    sealType: 'gold-crest',
    sampleData: {
      fullName: 'Aayush Bansal',
      headline: 'Quantitative Strategist & Algorithmic Trader | High-Frequency Alpha & Risk Modeling 📊',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      showPhoto: true,
      skillsHeading: 'Technical & Functional Skills',
      showSkills: true,
      email: 'aayush.quant@alpharesearch.finance',
      phone: '+91 98711 66778',
      location: 'Mumbai, India',
      website: 'https://aayush-quant.folioview.me',
      portfolioSlug: 'aayush-quant',
      summary: 'Quantitative analyst specializing in statistical arbitrage, cointegration mean-reversion, and options volatility surface modeling. Built backtesting frameworks processing 100M+ tick data points with 2.15 backtested annualized Sharpe Ratio.',
      education: [
        {
          degree: 'B.Tech in Mathematics & Computing (Minor in Finance)',
          institution: 'Indian Institute of Technology (IIT) Delhi',
          period: '2021 - 2025',
          gpa: '9.45 / 10.0 (Dean’s Merit List)',
          coursework: 'Stochastic Calculus, Time Series Econometrics, Monte Carlo Simulation, Derivatives Pricing, Numerical Linear Algebra, Machine Learning for Alpha.'
        }
      ],
      experience: [
        {
          role: 'Quantitative Trading Intern',
          company: 'AlphaVolt Quantitative Fund',
          period: '2024 - Present',
          bullets: [
            'Formulated intraday cross-exchange equity pairs trading strategy generating 18.4% annualized return with max drawdown under 4.2%.',
            'Implemented low-latency order router in modern C++20 with ring-buffer IPC achieving sub-15 microsecond internal gateway latency.'
          ]
        }
      ],
      projects: [
        {
          title: 'QuantStream: Real-time Order Book & Volatility Surface Simulator 📊',
          techStack: ['C++20', 'Python', 'NumPy', 'ZeroMQ', 'QuantLib'],
          bullets: [
            'Constructed Level 2 limit order book simulator tracking bid-ask depth and pricing European barrier options using Black-Scholes-Merton.'
          ]
        }
      ],
      skills: {
        quantMath: ['Stochastic Calculus', 'Black-Scholes / Heston Models', 'Cointegration & Pairs Trading', 'GARCH Volatility', 'Monte Carlo'],
        programming: ['C++20 (Low-Latency)', 'Python (Pandas, Polars, NumPy)', 'SQL', 'R', 'Linux Kernel Bypass'],
        frameworks: ['QuantLib', 'Backtrader', 'ZeroMQ', 'Bloomberg Terminal API']
      },
      certifications: [
        'CFA Level 1 Passed (90th Percentile)',
        'CQF (Certificate in Quantitative Finance) Affiliate'
      ],
      honors: [
        'National Mathematical Olympiad (INMO) Gold Medalist',
        '1st Place – WorldQuant Global Alpha Ideation Challenge'
      ]
    }
  },

  // 28. Aerospace & Autonomous Avionics Systems 🚀
  {
    id: 'aerospace-autonomous-flight',
    name: 'Aerospace & Autonomous Avionics Systems 🚀',
    collegeCourse: 'B.Tech in Aerospace & Aeronautical Systems',
    category: 'mech-robotics',
    accentColor: '#6366f1',
    styleClass: 'resume-aerospace',
    layout: 'timeline-editorial',
    description: 'Engineered for rocket propulsion engineers, UAV avionics architects, and flight control specialists with CFD aerodynamic polar curves and telemetry logs.',
    cornerBadge: 'AIAA CERTIFIED // AVIONICS 🚀',
    sealType: 'gold-crest',
    sampleData: {
      fullName: 'Tara Krishnan',
      headline: 'Aerospace Propulsion & Autonomous Flight Control Systems Engineer 🚀',
      photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      showPhoto: true,
      skillsHeading: 'Technical & Functional Skills',
      showSkills: true,
      email: 'tara.aero@space-tech.org',
      phone: '+91 97410 88990',
      location: 'Bengaluru / Thiruvananthapuram, India',
      website: 'https://tara-aerospace.folioview.me',
      portfolioSlug: 'tara-aero',
      summary: 'Aerospace engineer with flight test experience in autonomous fixed-wing drones, hybrid rocket motor propellant formulation, and Kalman-filtered IMU telemetry for suborbital guidance systems.',
      education: [
        {
          degree: 'B.Tech in Aerospace Engineering',
          institution: 'Indian Institute of Space Science and Technology (IIST) / ISRO Hub',
          period: '2021 - 2025',
          gpa: '9.38 / 10.0',
          coursework: 'Aerodynamics of Compressible Flow, Rocket Propulsion, Spacecraft Attitude Dynamics & Control, Computational Fluid Dynamics (CFD), Structural Mechanics in Flight.'
        }
      ],
      experience: [
        {
          role: 'Flight Control & Propulsion Fellow',
          company: 'AeroSky Autonomous Laboratories',
          period: '2024 - Present',
          bullets: [
            'Conducted Mach 2.2 supersonic nozzle simulations in OpenFOAM, boosting thrust coefficient by 5.4% while minimizing thermal choke.',
            'Implemented Extended Kalman Filter (EKF) state estimation for 6-DoF UAV drone handling 40 knot gusts with 99.4% stability margin.'
          ]
        }
      ],
      projects: [
        {
          title: 'VanguardRocket: 3km Solid Propellant Telemetry Sounding Rocket 🚀',
          techStack: ['OpenRocket', 'MATLAB Simulink', 'ANSYS CFX', 'C++', 'STM32'],
          bullets: [
            'Led 8-member avionics crew designing dual-deploy parachute recovery and live telemetry transmission down to mobile ground station.'
          ]
        }
      ],
      skills: {
        aerospaceSoftware: ['MATLAB & Simulink', 'ANSYS Fluent / CFX', 'OpenFOAM', 'OpenRocket', 'CATIA V5'],
        avionicsHardware: ['STM32 Embedded C++', 'Pixhawk Autopilot', 'CAN-bus Telemetry', 'IMU Kalman Filtering', 'Radio Telemetry (915MHz)'],
        propulsionStandards: ['Rocket Motor Grain Geometry', 'Cryogenic Tank Calculations', 'AIAA Flight Standards']
      },
      certifications: [
        'AIAA Student Aerospace Design Certification',
        'FAA Part 107 Commercial Drone Pilot Equivalency'
      ],
      honors: [
        '1st Place – All India Rocketry Challenge (ISRO Mentored)',
        'National Space Science Fellowship by ISRO'
      ]
    }
  },

  // 29. Cognitive Neuroscience & Behavioral Psychology 🧠
  {
    id: 'psychology-cognitive-neuro',
    name: 'Cognitive Neuroscience & Behavioral Psychology 🧠',
    collegeCourse: 'B.Sc / M.Sc in Cognitive Psychology & Human Factors',
    category: 'healthcare-med',
    accentColor: '#d97706',
    styleClass: 'resume-psychology',
    layout: 'editorial-warm',
    description: 'Engineered for neuropsychologists, behavioral researchers, and human-factors specialists with fMRI imaging statistics, psychometrics, and clinical trials.',
    cornerBadge: 'APA ACCREDITED // COGNITIVE 🧠',
    sealType: 'leaf-seal',
    sampleData: {
      fullName: 'Dr. Shruti Sen',
      headline: 'Cognitive Neuroscientist & Behavioral Researcher | Psychometrics & Human Decision Making 🧠',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      showPhoto: true,
      skillsHeading: 'Technical & Functional Skills',
      showSkills: true,
      email: 'shruti.neuro@cognitive.edu.in',
      phone: '+91 98311 77889',
      location: 'Kolkata & Delhi, India',
      website: 'https://shruti-neuro.folioview.me',
      portfolioSlug: 'shruti-psych',
      summary: 'Cognitive neuroscientist researching neuroplasticity, memory consolidation during sleep, and quantitative psychometrics. Conducted 450+ EEG/fMRI participant trials with published findings in Cognitive Brain Research.',
      education: [
        {
          degree: 'B.Sc (Hons) in Psychology & Cognitive Neuroscience',
          institution: 'Lady Shri Ram College (LSR) / University of Delhi',
          period: '2021 - 2024',
          gpa: '9.5 / 10.0 OGPA',
          coursework: 'Neuropsychology, Behavioral Statistics, Cognitive Processes, Clinical Psychopathology, Experimental Methodology, Psychometrics, Human Factors Design.'
        }
      ],
      experience: [
        {
          role: 'Behavioral Science Research Associate',
          company: 'Center for Mind & Brain Dynamics',
          period: '2024 - Present',
          bullets: [
            'Analyzed event-related potential (ERP) waveforms across 120 subjects studying auditory cognitive fatigue in high-stress professions.',
            'Authored standardized psychometric assessment battery adopting item response theory (IRT), verified with 0.88 test-retest reliability.'
          ]
        }
      ],
      projects: [
        {
          title: 'NeuroMetric: Open-Source EEG Alpha Band Telemetry Classifier 🧠',
          techStack: ['Python', 'MNE-Python', 'R', 'EEGLAB', 'Psychopy'],
          bullets: [
            'Constructed machine-learning workflow distinguishing focus vs fatigue stages using 14-channel dry-sensor EEG telemetry.'
          ]
        }
      ],
      skills: {
        neuroDiagnostics: ['EEG / ERP Data Analysis', 'fMRI Preprocessing (SPM12)', 'PsychoPy Experiment Design', 'Eye-Tracking Metrics'],
        psychometrics: ['SPSS & R Statistics', 'Item Response Theory (IRT)', 'ANOVA / Factor Analysis', 'Qualtrics Behavioral Surveys'],
        clinicalMethods: ['Cognitive Behavioral Interventions', 'Neuropsychological Battery Scoring', 'APA Ethical Guidelines']
      },
      certifications: [
        'APA (American Psychological Association) Student Affiliate',
        'Certified EEG Data Specialist (MNE-Python)'
      ],
      honors: [
        'National Young Psychologist Research Award',
        'University Gold Medal in Experimental Psychology'
      ]
    }
  },

  // 30. Haute Couture & Luxury Art Direction 👗
  {
    id: 'luxury-fashion-creative',
    name: 'Haute Couture & Luxury Art Direction 👗',
    collegeCourse: 'B.Des in Fashion Design & Brand Aesthetics',
    category: 'design-media',
    accentColor: '#be185d',
    styleClass: 'resume-fashion',
    layout: 'minimal-centered',
    description: 'Engineered for haute couture stylists, luxury brand art directors, and apparel designers with runway lookbooks, textile drape specs, and editorial branding.',
    cornerBadge: 'PARIS EDITORIAL // LUXE 👗',
    sealType: 'gold-crest',
    sampleData: {
      fullName: 'Aria Montgomery',
      headline: 'Haute Couture Designer & Luxury Brand Art Director | Sustainable Textiles & Curation 👗',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      showPhoto: true,
      skillsHeading: 'Technical & Functional Skills',
      showSkills: true,
      email: 'aria.fashion@couture-atelier.fr',
      phone: '+33 6 12 34 56 78',
      location: 'Paris, France & Mumbai',
      website: 'https://aria-couture.folioview.me',
      portfolioSlug: 'aria-fashion',
      summary: 'Fashion designer and visual art director merging artisanal hand-embroidery with zero-waste architectural tailoring. Featured at Lakmé Fashion Week and published in Vogue Atelier.',
      education: [
        {
          degree: 'Bachelor of Design (Fashion & Luxury Brand Management)',
          institution: 'National Institute of Fashion Technology (NIFT) / Institut Français de la Mode (IFM)',
          period: '2021 - 2025',
          gpa: '9.4 / 10.0 (Best Graduation Collection Award)',
          coursework: 'Haute Couture Draping, Sustainable Textile Chemistry, Fashion Forecasting, Digital Patternmaking (CLO 3D), Luxury Brand Marketing, Costume History.'
        }
      ],
      experience: [
        {
          role: 'Assistant Creative Director',
          company: 'Maison de l’Ombre Luxury Studio',
          period: '2024 - Present',
          bullets: [
            'Direct visual campaigns and collection styling for Fall/Winter 2025 runway collection showcasing 32 looks in Paris Fashion Week.',
            'Digitized pattern drafting workflows with CLO 3D, eliminating 60% of physical sampling fabric waste.'
          ]
        }
      ],
      projects: [
        {
          title: 'SilkenArch: Zero-Waste Biodegradable Eveningwear Collection 👗',
          techStack: ['CLO 3D', 'Adobe Illustrator', 'Hand Draping', 'Organic Peace Silk'],
          bullets: [
            'Created 8 couture looks fabricated entirely from circular organic materials; showcased at London Sustainable Fashion Forum.'
          ]
        }
      ],
      skills: {
        designCraft: ['Haute Couture Draping', 'CLO 3D Virtual Fitting', 'Hand Embroidery Techniques', 'Textile Sourcing', 'Garment Tech Packs'],
        creativeDirection: ['Editorial Photoshoot Styling', 'Lookbook Art Direction', 'Trend Forecasting (WGSN)', 'Adobe Creative Suite'],
        sustainability: ['Zero-Waste Patternmaking', 'Natural Dye Chemistry', 'Circular Apparel Lifecycle']
      },
      certifications: [
        'CLO 3D Certified Fashion Virtualizer',
        'Sustainable Luxury Fashion Council Accredited'
      ],
      honors: [
        'NIFT Best Graduation Collection Trophy (2025)',
        'Vogue India Young Designer of the Year Nominee'
      ]
    }
  },

  // 31. Enterprise BI Architect & Big Data Strategist 📈
  {
    id: 'data-analytics-bi-lead',
    name: 'Enterprise BI Architect & Big Data Strategist 📈',
    collegeCourse: 'M.S. / B.Tech in Business Analytics & Enterprise Intelligence',
    category: 'business-mba',
    accentColor: '#0d9488',
    styleClass: 'resume-bi-lead',
    layout: 'sidebar-right',
    description: 'Engineered for business intelligence architects, analytics leads, and data warehouse strategists with Snowflake dimensional modeling, dbt pipelines, and C-suite KPI dashboards.',
    cornerBadge: 'ENTERPRISE BI // STRATEGY 📈',
    sealType: 'gold-crest',
    sampleData: {
      fullName: 'Rajesh Narayanan',
      headline: 'Enterprise BI Architect & Analytics Lead | Snowflake, dbt & Executive Dashboards 📈',
      photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
      showPhoto: true,
      skillsHeading: 'Technical & Functional Skills',
      showSkills: true,
      email: 'rajesh.bi@enterprise-data.com',
      phone: '+91 99800 11223',
      location: 'Bengaluru, India',
      website: 'https://rajesh-bi.folioview.me',
      portfolioSlug: 'rajesh-bi',
      summary: 'Data analytics architect with 6+ years designing enterprise data warehouses and executive KPI cockpits. Transformed legacy reporting into real-time dbt/Snowflake pipelines serving 1,400 daily enterprise users across 8 business verticals.',
      education: [
        {
          degree: 'B.Tech in Information Technology (Minor in Business Analytics)',
          institution: 'PSG College of Technology, Coimbatore',
          period: '2020 - 2024',
          gpa: '9.25 / 10.0',
          coursework: 'Data Warehousing & Dimensional Modeling, Advanced SQL Analytics, Business Intelligence & Visualization, Predictive Statistics, Cloud Data Lakes.'
        }
      ],
      experience: [
        {
          role: 'Lead Business Intelligence Engineer',
          company: 'OmniData Global Analytics',
          period: '2024 - Present',
          bullets: [
            'Architected Snowflake star-schema dimensional warehouse processing 45M daily transactions with sub-4 second dashboard query latency.',
            'Constructed 30+ executive Tableau and Power BI command centers directly empowering C-suite pricing and churn mitigation decisions.'
          ]
        }
      ],
      projects: [
        {
          title: 'PulseAnalytics: Real-Time Revenue & Churn Intelligence Engine 📈',
          techStack: ['Snowflake', 'dbt Core', 'Power BI', 'Python', 'Airflow'],
          bullets: [
            'Automated end-to-end data transformation pipeline delivering daily customer cohort retention and CLV predictions to marketing leaders.'
          ]
        }
      ],
      skills: {
        biWarehousing: ['Snowflake Architecture', 'dbt (Data Build Tool)', 'Dimensional Modeling (Kimball)', 'BigQuery', 'PostgreSQL'],
        biVisualization: ['Power BI (DAX / Power Query)', 'Tableau Desktop & Server', 'Metabase', 'Looker Studio'],
        dataPipelines: ['Python Data Stack (Pandas, Polars)', 'Apache Airflow', 'Kafka Telemetry', 'Git DataOps']
      },
      certifications: [
        'Snowflake SnowPro Core Certified',
        'Microsoft Certified: Power BI Data Analyst Associate (PL-300)',
        'dbt Certified Developer'
      ],
      honors: [
        'Enterprise Analytics Innovation of the Year Award',
        'Top Speaker – National Business Intelligence Summit 2025'
      ]
    }
  }
];

export const getResumeById = (id) => {
  return RESUME_TEMPLATES.find(t => t.id === id) || RESUME_TEMPLATES[0];
};
