// src/data/profile.ts
// Source of truth for all content. Every fact, number, project name,
// and technology tag comes from this file. Never invent dates, employers,
// or metrics that aren't here.

export const profile = {
  meta: {
    name: 'Mohamed Aziz Jlassi',
    role: 'AI & Robotics Engineer',
    focus: 'Autonomous Systems \u00b7 Embedded AI',
    location: 'Kelibia, Tunisia',
    email: 'azizzizoujlassi@gmail.com',
    phone: '+216 29 670 427',
    github: 'https://github.com/REFLX0',
    linkedin: 'https://linkedin.com/in/aziz-jlassi111',
  },

  summary:
    'Computer Engineering graduate specializing in Autonomous Systems, Robotics, Embedded Systems, and Artificial Intelligence. Experienced in designing and implementing intelligent systems that combine hardware integration, real-time perception, and autonomous decision-making \u2014 from a physically built autonomous drone running ROS2 and PX4, to computer-vision pipelines built on YOLO and deep learning, to distributed IoT and Big Data platforms. Graduated with Highest Honors.',

  stats: [
    { label: 'Projects Shipped', value: '8' },
    { label: 'Graduated', value: 'Highest Honors' },
    { label: 'Languages Spoken', value: '4' },
  ],

  education: {
    degree: 'B.Sc. in Computer Engineering',
    school: 'Institut Sup\u00e9rieur d\u2019Informatique de Mahdia (ISI Mahdia), Tunisia',
    honor: 'Graduated with Highest Honors',
  },

  flagship: {
    title: 'Autonomous Drone \u2014 Full Physical Build & Software Stack',
    subtitle: 'Final Year Project (PFE) \u00b7 ISI Mahdia',
    points: [
      'Physically constructed a fully autonomous drone from hardware components \u2014 frame, motors, ESCs, flight controller, onboard computer',
      'Integrated ROS2 and the PX4 flight stack for autonomous mission execution and real-time flight control',
      'Developed a computer-vision pipeline using YOLO for onboard object detection and environment perception',
      'Implemented autonomous navigation, waypoint following, and mission logic without human intervention',
      'Built a ground-station interface for telemetry monitoring and mission control',
    ],
    stack: ['ROS2', 'PX4', 'Python', 'C++', 'YOLO', 'OpenCV', 'Embedded compute'],
    hotspots: [
      { part: 'flightController', label: 'Flight Controller', blurb: 'Runs PX4 \u2014 fuses sensor data and executes real-time control loops.' },
      { part: 'onboardComputer', label: 'Onboard Computer', blurb: 'Runs ROS2 nodes for perception, mission logic, and waypoint planning.' },
      { part: 'visionPayload', label: 'Vision Payload', blurb: 'Feeds a YOLO detection pipeline for real-time environment perception.' },
      { part: 'motorsEscs', label: 'Motors & ESCs', blurb: 'Physically built propulsion \u2014 four motors, four electronic speed controllers.' },
      { part: 'groundLink', label: 'Ground-Station Link', blurb: 'Streams telemetry to a custom ground-station UI for mission monitoring.' },
    ],
  },

  projects: [
    {
      title: "Alzheimer's MRI Classification System",
      category: 'Big Data \u00b7 Deep Learning \u00b7 Healthcare',
      points: [
        'Classified 6,400 brain MRI scans into 4 Alzheimer\'s stages using MobileNetV2 transfer learning, achieving >90% accuracy',
        'Built an Apache Spark ETL pipeline for distributed processing, MongoDB Atlas for cloud storage, and a Streamlit dashboard for visualization',
        'Integrated an AI chatbot (DeepSeek via OpenRouter) specialized in Alzheimer\'s Q&A',
      ],
      stack: ['TensorFlow/Keras', 'Apache Spark', 'MongoDB Atlas', 'Streamlit', 'Python'],
    },
    {
      title: 'Distributed LoRa IoT Environmental Monitoring',
      category: 'IoT \u00b7 Embedded \u00b7 Cloud',
      points: [
        'Designed a two-node LoRa32 system monitoring gas, temperature, and humidity across a 1\u20132 km range in infrastructure-free industrial zones',
        'Applied a three-level security model: physical, communication (AES-128, CRC), and cloud (Firebase rules, token authentication)',
      ],
      stack: ['LoRa32', 'Firebase', 'MQTT', 'AES-128', 'CRC'],
    },
    {
      title: 'Gym Security \u2014 AI Multi-Angle Facial Recognition',
      category: 'Computer Vision \u00b7 Full-Stack',
      points: [
        'Built a real-time biometric access-control system using DeepFace (VGG-Face) with 5-angle face training, achieving >95% recognition accuracy',
        'Implemented live webcam scanning, member-management CRUD, JWT authentication, an admin dashboard, and audit logging \u2014 scalable to 10,000+ members',
      ],
      stack: ['Python (Flask)', 'DeepFace', 'Node.js', 'Express.js', 'SQLite', 'JWT'],
    },
    {
      title: 'ArcFace Real-Time Face Recognition',
      category: 'Computer Vision \u00b7 AI',
      points: [
        'Implemented real-time face recognition using ArcFace (InsightFace) with 512-dimensional embeddings and cosine-similarity matching',
        'Built a full data-augmentation pipeline (flip, brightness, rotation, noise) for robust recognition under varied conditions',
      ],
      stack: ['Python', 'OpenCV', 'ONNX Runtime', 'InsightFace'],
    },
    {
      title: 'Al Baraka Bank Tunisia \u2014 Front Leasing Platform',
      category: 'Hackathon \u00b7 Forum Cheikh Mokhtar Sallemi',
      points: [
        'Built a full-stack web and mobile leasing-financing request platform for banking clients',
        'Integrated with the bank\'s information system via REST APIs (WSO2 API Gateway) and built a callback API for financing decisions (Accepted / Refused / Complement Requested)',
        'Built post-approval features: amortization-schedule display and installment-payment tracking',
        'Designed production-grade architecture: Angular frontend, Spring Boot backend in Docker, a 3-node PostgreSQL cluster (Patroni + HAProxy + ETCD), NGINX reverse proxy, WAF, and TLS/HTTPS',
      ],
      stack: ['Angular', 'Spring Boot', 'PostgreSQL', 'Docker', 'NGINX', 'WSO2', 'HAProxy', 'Patroni'],
    },
    {
      title: 'Mahdia Blue & Green \u2014 Sustainable Economy Platform',
      category: 'Full-Stack Web \u00b7 with OIT Mahdia',
      points: [
        'Built a full-stack platform promoting sustainable blue, green, and circular-economy initiatives in Mahdia, in partnership with the Ordre des Ing\u00e9nieurs Tunisiens (OIT Mahdia)',
        'REST API with article and event management, JWT authentication, and a contact system, paired with a React 19 frontend',
      ],
      stack: ['React 19', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    },
    {
      title: 'Cloud Infrastructure Automation Platform',
      category: 'DevOps \u00b7 Infrastructure as Code \u00b7 Private Cloud',
      points: [
        'Engineered an automated private-cloud provisioning platform using Terraform and Proxmox VE to deploy production-ready Linux VMs with minimal human intervention',
        'Built modular IaC templates supporting cloud-init, dynamic networking, SSH-key injection, storage allocation, and scalable multi-VM deployments',
        'Automated post-deployment configuration \u2014 Docker installation, Kubernetes-ready infrastructure, CI/CD integration',
        'Cut infrastructure deployment time from manual provisioning down to a few minutes, fully automated',
      ],
      stack: ['Terraform', 'Proxmox VE', 'Cloud-Init', 'Docker', 'Linux', 'Git', 'HCL'],
    },
  ],

  skills: [
    { category: 'Programming Languages', items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C', 'CUDA', 'Bash', 'SQL', 'VHDL'] },
    { category: 'Robotics & Autonomous Systems', items: ['ROS2', 'PX4', 'MAVLink', 'Mission Planner', 'ArduPilot', 'Gazebo', 'Sensor fusion', 'Drone hardware integration'] },
    { category: 'AI & Machine Learning', items: ['YOLO (Ultralytics)', 'PyTorch', 'OpenCV', 'TensorFlow', 'Keras', 'MobileNetV2', 'ArcFace', 'DeepFace', 'ONNX', 'NumPy', 'CUDA GPU programming'] },
    { category: 'Hardware & Low-Level', items: ['STM32', 'ESP32', 'Raspberry Pi', 'LoRa32', 'VHDL', 'FPGA design (Xilinx)', 'AXI4-Stream', 'SoC integration', 'MQTT', 'Modbus TCP', 'BLE'] },
    { category: 'Full-Stack Development', items: ['React (Vite)', 'Next.js', 'Angular', 'Node.js (Express)', 'FastAPI', 'Spring Boot', 'REST', 'WebSocket', 'Socket.io', 'Event-driven architecture'] },
    { category: 'Databases & Messaging', items: ['PostgreSQL (RLS, indexing, tuning)', 'MongoDB', 'Redis', 'SQLite', 'RabbitMQ', 'Firebase RTDB', 'Supabase'] },
    { category: 'Big Data & Cloud', items: ['Apache Spark', 'MongoDB Atlas', 'Firebase', 'ETL pipelines', 'Streamlit', 'Oracle Cloud', 'LXC containers'] },
    { category: 'DevOps & Monitoring', items: ['Docker', 'NGINX', 'Terraform', 'Proxmox VE', 'Git', 'GitHub Actions CI/CD', 'HAProxy', 'Prometheus', 'Grafana', 'Resilience4j', 'Node-RED'] },
    { category: 'Security', items: ['JWT', 'RBAC', 'TLS/HTTPS', 'AES-128', 'OTP', 'WAF', 'WireGuard', 'Zero-KYC systems', 'BTCPay Server', 'Stripe', 'VLAN isolation'] },
    { category: 'Technical Writing', items: ['LaTeX', 'Academic paper writing', 'Technical specification documents'] },
  ],

  internship: {
    title: 'Embedded IoT Gateway \u2014 NF E 60-182 Compliance',
    org: 'C.S.T, Tunisia',
    label: '2nd-Year Internship',
    points: [
      'Developed an embedded IoT gateway for real-time machine-performance monitoring, compliant with French industrial standard NF E 60-182 (TRS/OEE)',
      'Collected sensor data via MQTT, Modbus TCP, HTTP, and BLE; computed OEE/TRS indicators on-device and published results to a central platform',
      'Built a local real-time web dashboard for machine KPI visualization',
    ],
    stack: ['Raspberry Pi', 'ESP32', 'Python (FastAPI)', 'MQTT', 'Modbus TCP', 'Chart.js'],
  },

  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'English', level: 'C1' },
    { name: 'French', level: 'B1' },
    { name: 'German', level: 'A2' },
  ],

  attributes: [
    'Autonomous Systems Engineering',
    'Full-Stack Engineering',
    'Artificial Intelligence & Computer Vision',
    'Infrastructure Automation',
    'System Architecture',
    'Problem Solving',
    'Research Mindset',
    'Self-Directed Engineering',
  ],
};

// Waypoint definitions — numbered WP00-WP05 to mirror the real waypoint-following
// navigation system from Aziz's own autonomous drone project. This isn't a generic
// template flourish; it's drawn from the actual mechanism he built.
export const waypoints = [
  { code: 'WP00', label: 'ORIGIN' },
  { code: 'WP01', label: 'PRIMARY MISSION' },
  { code: 'WP02', label: 'PAYLOAD BAY' },
  { code: 'WP03', label: 'SYSTEMS CHECK' },
  { code: 'WP04', label: 'FLIGHT LOG' },
  { code: 'WP05', label: 'RENDEZVOUS' },
] as const;

export type WaypointIndex = 0 | 1 | 2 | 3 | 4 | 5;
