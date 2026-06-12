export type ResourceType = "video" | "article" | "course" | "practice"
export type Difficulty = "Beginner" | "Intermediate" | "Advanced"
export type TopicStatus = "completed" | "in-progress" | "available" | "locked"

export interface Resource {
  title: string
  type: ResourceType
  duration: string
}

export interface RoadmapStep {
  id: number
  title: string
  description: string
  difficulty: Difficulty
  estimatedTime: string
  resources: Resource[]
  skills: string[]
}

// ── Sectioned roadmap types (richer, used by NLP and future detailed roadmaps) ──

export interface RoadmapTopic {
  id: string
  title: string
  description: string
  difficulty: Difficulty
  estimatedHours: number
  prerequisites: string[]   // ids of prerequisite topics
  skills: string[]
  resources: Resource[]
}

export interface RoadmapSection {
  id: string
  title: string
  color: string            // oklch color for section accent
  bgColor: string
  topics: RoadmapTopic[]
}

export interface SectionedRoadmap {
  title: string
  subtitle: string
  totalMonths: number
  totalHours: number
  sections: RoadmapSection[]
}

export interface GeneratedRoadmap {
  topic: string
  overview: string
  totalTime: string
  steps: RoadmapStep[]
}

export const SUGGESTED_TOPICS = [
  {
    title: "Natural Language Processing",
    subject: "AI / ML",
    description: "Text analysis, transformers, and language models",
    color: "oklch(0.55 0.20 255)",
    bgColor: "oklch(0.95 0.05 255)",
    steps: 6,
    time: "10–12 weeks",
  },
  {
    title: "Machine Learning",
    subject: "Data Science",
    description: "Supervised learning, neural networks, and model evaluation",
    color: "oklch(0.52 0.18 47)",
    bgColor: "oklch(0.95 0.08 47)",
    steps: 7,
    time: "12–14 weeks",
  },
  {
    title: "Robotics",
    subject: "Engineering",
    description: "Kinematics, control systems, and robot programming",
    color: "oklch(0.48 0.16 145)",
    bgColor: "oklch(0.93 0.07 145)",
    steps: 5,
    time: "8–10 weeks",
  },
  {
    title: "Quantum Computing",
    subject: "Physics / CS",
    description: "Qubits, quantum gates, and quantum algorithms",
    color: "oklch(0.50 0.17 320)",
    bgColor: "oklch(0.95 0.05 320)",
    steps: 6,
    time: "10–14 weeks",
  },
  {
    title: "Cybersecurity",
    subject: "Computer Science",
    description: "Cryptography, network security, and ethical hacking",
    color: "oklch(0.48 0.15 85)",
    bgColor: "oklch(0.94 0.06 85)",
    steps: 7,
    time: "10–12 weeks",
  },
  {
    title: "Computer Vision",
    subject: "AI / ML",
    description: "Image recognition, CNNs, and object detection",
    color: "oklch(0.55 0.20 255)",
    bgColor: "oklch(0.95 0.05 255)",
    steps: 6,
    time: "9–11 weeks",
  },
]

const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  video: "Video",
  article: "Article",
  course: "Course",
  practice: "Practice",
}

// Pre-baked roadmaps for each suggested topic (and a generic fallback)
const ROADMAP_DB: Record<string, GeneratedRoadmap> = {
  "natural language processing": {
    topic: "Natural Language Processing",
    overview:
      "Master the full NLP pipeline from raw text to production-ready language models. You'll move from classical text processing through modern transformer architectures used in GPT, BERT, and beyond.",
    totalTime: "10–12 weeks",
    steps: [
      {
        id: 1,
        title: "Text Preprocessing Fundamentals",
        description:
          "Learn tokenization, stemming, lemmatization, stop-word removal, and regular expressions. These are the building blocks every NLP pipeline relies on.",
        difficulty: "Beginner",
        estimatedTime: "1 week",
        skills: ["Tokenization", "Regex", "NLTK", "spaCy"],
        resources: [
          { title: "Text Preprocessing with spaCy", type: "video", duration: "45 min" },
          { title: "NLTK Book — Chapter 3", type: "article", duration: "2 hrs" },
          { title: "Regex for NLP Practitioners", type: "practice", duration: "30 min" },
        ],
      },
      {
        id: 2,
        title: "Statistical Language Models",
        description:
          "Understand n-grams, TF-IDF, Bag-of-Words, and naive Bayes text classification. Build intuition for how frequency-based models represent meaning.",
        difficulty: "Beginner",
        estimatedTime: "1.5 weeks",
        skills: ["TF-IDF", "n-grams", "Naive Bayes", "Scikit-learn"],
        resources: [
          { title: "TF-IDF Explained Visually", type: "video", duration: "30 min" },
          { title: "Text Classification with Scikit-learn", type: "course", duration: "3 hrs" },
          { title: "Spam Detection Project", type: "practice", duration: "2 hrs" },
        ],
      },
      {
        id: 3,
        title: "Word Embeddings & Semantic Representations",
        description:
          "Dive into Word2Vec, GloVe, and FastText. Understand how distributional semantics turns words into dense vectors that encode meaning.",
        difficulty: "Intermediate",
        estimatedTime: "1.5 weeks",
        skills: ["Word2Vec", "GloVe", "FastText", "Cosine similarity"],
        resources: [
          { title: "The Illustrated Word2Vec", type: "article", duration: "1.5 hrs" },
          { title: "Word Embeddings Deep Dive", type: "video", duration: "1 hr" },
          { title: "Semantic Similarity Exercises", type: "practice", duration: "1 hr" },
        ],
      },
      {
        id: 4,
        title: "Sequence Models: RNNs & LSTMs",
        description:
          "Build recurrent neural networks and LSTMs for sequence labeling, sentiment analysis, and text generation before the transformer revolution.",
        difficulty: "Intermediate",
        estimatedTime: "2 weeks",
        skills: ["RNN", "LSTM", "GRU", "PyTorch", "Backprop through time"],
        resources: [
          { title: "Understanding LSTMs — Colah's Blog", type: "article", duration: "2 hrs" },
          { title: "Sequence Modeling with PyTorch", type: "course", duration: "5 hrs" },
          { title: "Name Entity Recognition Lab", type: "practice", duration: "3 hrs" },
        ],
      },
      {
        id: 5,
        title: "Attention Mechanism & Transformers",
        description:
          "Master the self-attention operation, multi-head attention, positional encodings, and the full encoder-decoder transformer architecture underpinning modern LLMs.",
        difficulty: "Advanced",
        estimatedTime: "2 weeks",
        skills: ["Self-attention", "Multi-head attention", "Transformers", "HuggingFace"],
        resources: [
          { title: "The Illustrated Transformer", type: "article", duration: "2.5 hrs" },
          { title: "Attention Is All You Need — Paper Walkthrough", type: "video", duration: "1.5 hrs" },
          { title: "HuggingFace Transformers Course", type: "course", duration: "6 hrs" },
        ],
      },
      {
        id: 6,
        title: "Fine-Tuning & Production NLP",
        description:
          "Fine-tune BERT/GPT on custom datasets, handle prompt engineering, build pipelines with LangChain, and deploy models via REST APIs.",
        difficulty: "Advanced",
        estimatedTime: "2 weeks",
        skills: ["BERT", "GPT", "Fine-tuning", "LangChain", "FastAPI"],
        resources: [
          { title: "Fine-Tuning BERT for Text Classification", type: "course", duration: "4 hrs" },
          { title: "LangChain Crash Course", type: "video", duration: "2 hrs" },
          { title: "NLP Chatbot Capstone", type: "practice", duration: "5 hrs" },
        ],
      },
    ],
  },

  "machine learning": {
    topic: "Machine Learning",
    overview:
      "Go from first principles to deploying real models. You'll cover the mathematical foundations, classical algorithms, deep learning, and model evaluation best practices.",
    totalTime: "12–14 weeks",
    steps: [
      {
        id: 1,
        title: "Math Foundations for ML",
        description: "Linear algebra, calculus (gradients & chain rule), probability, and statistics that underpin every ML algorithm.",
        difficulty: "Beginner",
        estimatedTime: "1.5 weeks",
        skills: ["Linear algebra", "Calculus", "Probability", "Statistics"],
        resources: [
          { title: "3Blue1Brown — Essence of Linear Algebra", type: "video", duration: "3 hrs" },
          { title: "Khan Academy Calculus Refresher", type: "course", duration: "4 hrs" },
          { title: "Probability for ML Cheatsheet", type: "article", duration: "1 hr" },
        ],
      },
      {
        id: 2,
        title: "Supervised Learning Algorithms",
        description: "Linear & logistic regression, decision trees, SVMs, and k-NN. Implement each from scratch, then with scikit-learn.",
        difficulty: "Beginner",
        estimatedTime: "2 weeks",
        skills: ["Linear regression", "Logistic regression", "SVM", "Decision trees", "Scikit-learn"],
        resources: [
          { title: "Scikit-learn Supervised Learning Docs", type: "article", duration: "2 hrs" },
          { title: "ML From Scratch — Python", type: "course", duration: "6 hrs" },
          { title: "Titanic Survival Prediction", type: "practice", duration: "3 hrs" },
        ],
      },
      {
        id: 3,
        title: "Unsupervised Learning & Feature Engineering",
        description: "K-means, DBSCAN, PCA, feature scaling, encoding, and selection. Turn raw data into meaningful representations.",
        difficulty: "Intermediate",
        estimatedTime: "1.5 weeks",
        skills: ["K-means", "PCA", "Feature scaling", "Dimensionality reduction"],
        resources: [
          { title: "Unsupervised Learning in Python", type: "course", duration: "4 hrs" },
          { title: "Feature Engineering for ML", type: "article", duration: "1.5 hrs" },
          { title: "Customer Segmentation Project", type: "practice", duration: "2 hrs" },
        ],
      },
      {
        id: 4,
        title: "Model Evaluation & Validation",
        description: "Cross-validation, bias-variance trade-off, precision/recall, ROC-AUC, and hyperparameter tuning with Grid/Random search.",
        difficulty: "Intermediate",
        estimatedTime: "1 week",
        skills: ["Cross-validation", "Hyperparameter tuning", "ROC-AUC", "GridSearchCV"],
        resources: [
          { title: "A Visual Intro to Cross-Validation", type: "article", duration: "1 hr" },
          { title: "Hyperparameter Tuning Strategies", type: "video", duration: "45 min" },
          { title: "Model Comparison Lab", type: "practice", duration: "2 hrs" },
        ],
      },
      {
        id: 5,
        title: "Neural Networks & Deep Learning",
        description: "Backpropagation, activation functions, CNNs for vision, and training dynamics with PyTorch or TensorFlow.",
        difficulty: "Intermediate",
        estimatedTime: "2.5 weeks",
        skills: ["Backpropagation", "CNNs", "PyTorch", "TensorFlow", "Activation functions"],
        resources: [
          { title: "Neural Networks from Scratch", type: "course", duration: "8 hrs" },
          { title: "Deep Learning Specialization — Coursera", type: "course", duration: "10 hrs" },
          { title: "MNIST Digit Recognizer", type: "practice", duration: "3 hrs" },
        ],
      },
      {
        id: 6,
        title: "Ensemble Methods & Boosting",
        description: "Random Forests, Gradient Boosting, XGBoost, and LightGBM — the workhorses of Kaggle competitions and industry.",
        difficulty: "Intermediate",
        estimatedTime: "1 week",
        skills: ["Random forests", "XGBoost", "LightGBM", "Gradient boosting"],
        resources: [
          { title: "Ensemble Learning Explained", type: "video", duration: "1 hr" },
          { title: "XGBoost Documentation", type: "article", duration: "2 hrs" },
          { title: "House Prices Kaggle Competition", type: "practice", duration: "4 hrs" },
        ],
      },
      {
        id: 7,
        title: "ML Systems & Deployment",
        description: "Build end-to-end ML pipelines, track experiments with MLflow, and deploy models as REST APIs using FastAPI or Flask.",
        difficulty: "Advanced",
        estimatedTime: "2 weeks",
        skills: ["MLflow", "FastAPI", "Docker", "CI/CD for ML"],
        resources: [
          { title: "Building Production ML Systems", type: "course", duration: "5 hrs" },
          { title: "MLflow Getting Started Guide", type: "article", duration: "1.5 hrs" },
          { title: "End-to-End ML Project", type: "practice", duration: "6 hrs" },
        ],
      },
    ],
  },

  "quantum computing": {
    topic: "Quantum Computing",
    overview:
      "Start from linear algebra and quantum mechanics principles, progress through quantum gates and circuits, and implement real algorithms on IBM Quantum or Qiskit.",
    totalTime: "10–14 weeks",
    steps: [
      {
        id: 1,
        title: "Linear Algebra & Complex Numbers",
        description: "Vectors, matrices, inner products, tensor products, and complex numbers — the core math of quantum state manipulation.",
        difficulty: "Beginner",
        estimatedTime: "1 week",
        skills: ["Linear algebra", "Complex numbers", "Tensor products", "Dirac notation"],
        resources: [
          { title: "Quantum Computing Math Prerequisites", type: "article", duration: "2 hrs" },
          { title: "3Blue1Brown — Linear Algebra Series", type: "video", duration: "3 hrs" },
          { title: "Bra-Ket Notation Exercises", type: "practice", duration: "1 hr" },
        ],
      },
      {
        id: 2,
        title: "Quantum Bits & Superposition",
        description: "The qubit model, Bloch sphere representation, measurement postulate, and the difference between quantum and classical bits.",
        difficulty: "Beginner",
        estimatedTime: "1.5 weeks",
        skills: ["Qubits", "Superposition", "Measurement", "Bloch sphere"],
        resources: [
          { title: "IBM Qiskit Textbook — Chapter 1", type: "article", duration: "3 hrs" },
          { title: "Quantum Mechanics for Programmers", type: "video", duration: "2 hrs" },
          { title: "Qubit State Simulation", type: "practice", duration: "1.5 hrs" },
        ],
      },
      {
        id: 3,
        title: "Quantum Gates & Circuits",
        description: "Single-qubit gates (X, Y, Z, H, T), multi-qubit gates (CNOT, Toffoli), and building circuits with Qiskit.",
        difficulty: "Intermediate",
        estimatedTime: "2 weeks",
        skills: ["Quantum gates", "Hadamard", "CNOT", "Qiskit", "Circuit design"],
        resources: [
          { title: "Qiskit Circuits Tutorial", type: "course", duration: "4 hrs" },
          { title: "Quantum Gate Visualizer", type: "practice", duration: "2 hrs" },
          { title: "Circuit Equivalence Exercises", type: "practice", duration: "1.5 hrs" },
        ],
      },
      {
        id: 4,
        title: "Entanglement & Quantum Protocols",
        description: "Bell states, EPR paradox, quantum teleportation, superdense coding, and the power of entanglement.",
        difficulty: "Intermediate",
        estimatedTime: "1.5 weeks",
        skills: ["Entanglement", "Bell states", "Teleportation", "Superdense coding"],
        resources: [
          { title: "Entanglement Explained", type: "video", duration: "1.5 hrs" },
          { title: "Quantum Teleportation Lab", type: "practice", duration: "2 hrs" },
          { title: "Quantum Protocols Overview", type: "article", duration: "1 hr" },
        ],
      },
      {
        id: 5,
        title: "Quantum Algorithms",
        description: "Deutsch-Jozsa, Grover's search, and Shor's factoring algorithm — the landmark results that prove quantum advantage.",
        difficulty: "Advanced",
        estimatedTime: "2.5 weeks",
        skills: ["Grover's algorithm", "Shor's algorithm", "Quantum Fourier Transform", "Phase estimation"],
        resources: [
          { title: "Grover's Algorithm Walkthrough", type: "video", duration: "2 hrs" },
          { title: "Shor's Algorithm Deep Dive", type: "article", duration: "3 hrs" },
          { title: "Implement Grover in Qiskit", type: "practice", duration: "3 hrs" },
        ],
      },
      {
        id: 6,
        title: "Quantum Hardware & NISQ Era",
        description: "Real quantum noise, error mitigation, variational quantum eigensolvers (VQE), QAOA, and running on IBM Quantum hardware.",
        difficulty: "Advanced",
        estimatedTime: "2 weeks",
        skills: ["NISQ", "VQE", "QAOA", "Error mitigation", "IBM Quantum"],
        resources: [
          { title: "NISQ Algorithms Survey", type: "article", duration: "2 hrs" },
          { title: "VQE on Real Hardware", type: "course", duration: "4 hrs" },
          { title: "IBM Quantum Experience Project", type: "practice", duration: "4 hrs" },
        ],
      },
    ],
  },

  "cybersecurity": {
    topic: "Cybersecurity",
    overview:
      "Build a complete offensive and defensive security skill set — from networking fundamentals through cryptography, penetration testing, and building secure systems.",
    totalTime: "10–12 weeks",
    steps: [
      {
        id: 1,
        title: "Networking & System Fundamentals",
        description: "TCP/IP stack, DNS, HTTP/S, OSI model, Linux command line, and file system permissions that all security work builds on.",
        difficulty: "Beginner",
        estimatedTime: "1.5 weeks",
        skills: ["TCP/IP", "OSI model", "Linux CLI", "DNS", "HTTP/S"],
        resources: [
          { title: "CompTIA Network+ Fundamentals", type: "course", duration: "4 hrs" },
          { title: "Linux Basics for Hackers", type: "article", duration: "2 hrs" },
          { title: "Packet Analysis with Wireshark", type: "practice", duration: "2 hrs" },
        ],
      },
      {
        id: 2,
        title: "Cryptography Essentials",
        description: "Symmetric vs asymmetric encryption, hashing, PKI, TLS, and real-world cryptographic attacks and mitigations.",
        difficulty: "Beginner",
        estimatedTime: "1.5 weeks",
        skills: ["AES", "RSA", "SHA", "TLS", "PKI", "Digital signatures"],
        resources: [
          { title: "Cryptography I — Stanford Coursera", type: "course", duration: "8 hrs" },
          { title: "How TLS Works", type: "article", duration: "1.5 hrs" },
          { title: "Crypto Challenge Set", type: "practice", duration: "3 hrs" },
        ],
      },
      {
        id: 3,
        title: "Web Application Security",
        description: "OWASP Top 10, SQL injection, XSS, CSRF, authentication flaws, and how to find and exploit them ethically.",
        difficulty: "Intermediate",
        estimatedTime: "2 weeks",
        skills: ["OWASP Top 10", "SQL injection", "XSS", "CSRF", "Burp Suite"],
        resources: [
          { title: "OWASP Top 10 Deep Dive", type: "video", duration: "3 hrs" },
          { title: "PortSwigger Web Security Academy", type: "course", duration: "10 hrs" },
          { title: "DVWA Exploitation Lab", type: "practice", duration: "4 hrs" },
        ],
      },
      {
        id: 4,
        title: "Network Penetration Testing",
        description: "Reconnaissance, scanning, enumeration, exploitation, and post-exploitation using Kali Linux and Metasploit.",
        difficulty: "Intermediate",
        estimatedTime: "2 weeks",
        skills: ["Nmap", "Metasploit", "Kali Linux", "Nessus", "Privilege escalation"],
        resources: [
          { title: "Penetration Testing with Kali Linux", type: "course", duration: "6 hrs" },
          { title: "TryHackMe Beginner Path", type: "practice", duration: "8 hrs" },
          { title: "Network Scanning Techniques", type: "article", duration: "1 hr" },
        ],
      },
      {
        id: 5,
        title: "Reverse Engineering & Malware Analysis",
        description: "Disassembly, static vs dynamic analysis, reading assembly, and analyzing real malware samples safely.",
        difficulty: "Advanced",
        estimatedTime: "2 weeks",
        skills: ["Assembly", "Ghidra", "x64dbg", "IDA Pro", "Malware analysis"],
        resources: [
          { title: "Malware Analysis Fundamentals", type: "course", duration: "5 hrs" },
          { title: "Ghidra Tutorial for Beginners", type: "video", duration: "2 hrs" },
          { title: "Reverse Engineering Lab", type: "practice", duration: "4 hrs" },
        ],
      },
      {
        id: 6,
        title: "Defensive Security & Incident Response",
        description: "SIEM systems, log analysis, threat hunting, incident response playbooks, and building a hardened infrastructure.",
        difficulty: "Advanced",
        estimatedTime: "1.5 weeks",
        skills: ["SIEM", "Splunk", "Threat hunting", "Incident response", "SOC"],
        resources: [
          { title: "Blue Team Fundamentals", type: "course", duration: "4 hrs" },
          { title: "Splunk Fundamentals 1", type: "course", duration: "3 hrs" },
          { title: "IR Simulation Exercise", type: "practice", duration: "3 hrs" },
        ],
      },
      {
        id: 7,
        title: "Security Certifications & Career Path",
        description: "Overview of CEH, OSCP, CompTIA Security+, bug bounty programmes, and building a professional security portfolio.",
        difficulty: "Intermediate",
        estimatedTime: "1 week",
        skills: ["CEH", "OSCP", "Security+", "Bug bounty", "CTF"],
        resources: [
          { title: "Security Certification Roadmap", type: "article", duration: "1 hr" },
          { title: "How to Get into Bug Bounty", type: "video", duration: "1 hr" },
          { title: "HackTheBox Starting Point", type: "practice", duration: "3 hrs" },
        ],
      },
    ],
  },

  "robotics": {
    topic: "Robotics",
    overview:
      "From kinematics and motor control through sensor fusion, path planning, and ROS 2 — build a complete foundation for designing and programming autonomous robots.",
    totalTime: "8–10 weeks",
    steps: [
      {
        id: 1,
        title: "Robotics Math & Coordinate Systems",
        description: "Homogeneous transforms, rotation matrices, Euler angles, quaternions, and forward/inverse kinematics for robot arms.",
        difficulty: "Beginner",
        estimatedTime: "1.5 weeks",
        skills: ["Homogeneous transforms", "Quaternions", "Kinematics", "Jacobian"],
        resources: [
          { title: "Modern Robotics — Northwestern Coursera", type: "course", duration: "6 hrs" },
          { title: "Rotation Representations Explained", type: "article", duration: "1.5 hrs" },
          { title: "Forward Kinematics Exercises", type: "practice", duration: "2 hrs" },
        ],
      },
      {
        id: 2,
        title: "Actuators, Sensors & Embedded Systems",
        description: "DC motors, servos, encoders, IMUs, LIDAR, cameras, and interfacing them with microcontrollers and single-board computers.",
        difficulty: "Beginner",
        estimatedTime: "1.5 weeks",
        skills: ["Arduino", "Raspberry Pi", "PWM", "I2C/SPI", "Sensors"],
        resources: [
          { title: "Robotics with Arduino", type: "course", duration: "4 hrs" },
          { title: "Sensor Fusion Basics", type: "article", duration: "1 hr" },
          { title: "Build a Line-Following Robot", type: "practice", duration: "3 hrs" },
        ],
      },
      {
        id: 3,
        title: "Control Systems & PID",
        description: "Open-loop vs closed-loop control, PID tuning, state-space representation, and real-time control on embedded systems.",
        difficulty: "Intermediate",
        estimatedTime: "1.5 weeks",
        skills: ["PID", "State-space", "Control theory", "MATLAB/Simulink"],
        resources: [
          { title: "PID Controller Intuition", type: "video", duration: "1.5 hrs" },
          { title: "Control Bootcamp — Brian Douglas", type: "video", duration: "3 hrs" },
          { title: "Balance Bot PID Tuning Lab", type: "practice", duration: "3 hrs" },
        ],
      },
      {
        id: 4,
        title: "Robot Operating System (ROS 2)",
        description: "ROS 2 architecture, nodes, topics, services, actions, launch files, and integrating hardware with the ROS ecosystem.",
        difficulty: "Intermediate",
        estimatedTime: "2 weeks",
        skills: ["ROS 2", "Nodes", "Topics", "URDF", "Gazebo"],
        resources: [
          { title: "ROS 2 Humble Tutorial Series", type: "course", duration: "6 hrs" },
          { title: "Simulating Robots in Gazebo", type: "video", duration: "2 hrs" },
          { title: "TurtleBot Navigation Lab", type: "practice", duration: "4 hrs" },
        ],
      },
      {
        id: 5,
        title: "Perception, Path Planning & Autonomy",
        description: "SLAM, occupancy grids, A* & RRT path planning, computer vision for robots, and building a complete autonomous navigation stack.",
        difficulty: "Advanced",
        estimatedTime: "2 weeks",
        skills: ["SLAM", "A*", "RRT", "OpenCV", "Nav2"],
        resources: [
          { title: "Probabilistic Robotics — Thrun", type: "article", duration: "3 hrs" },
          { title: "Nav2 Complete Setup Guide", type: "course", duration: "5 hrs" },
          { title: "Autonomous Navigation Capstone", type: "practice", duration: "6 hrs" },
        ],
      },
    ],
  },

  "computer vision": {
    topic: "Computer Vision",
    overview:
      "Learn how machines see — from image filtering through convolutional networks, object detection, and deploying real-time vision systems.",
    totalTime: "9–11 weeks",
    steps: [
      {
        id: 1,
        title: "Image Processing Fundamentals",
        description: "Pixels, color spaces, filters, edge detection (Sobel, Canny), and morphological operations with OpenCV.",
        difficulty: "Beginner",
        estimatedTime: "1.5 weeks",
        skills: ["OpenCV", "Color spaces", "Filters", "Canny edge detection"],
        resources: [
          { title: "OpenCV Python Tutorial", type: "course", duration: "4 hrs" },
          { title: "Image Processing with NumPy", type: "article", duration: "1.5 hrs" },
          { title: "Edge Detection Lab", type: "practice", duration: "2 hrs" },
        ],
      },
      {
        id: 2,
        title: "Classical Feature Extraction",
        description: "Keypoint detection with SIFT/ORB, HOG features, optical flow, and traditional classification pipelines.",
        difficulty: "Beginner",
        estimatedTime: "1 week",
        skills: ["SIFT", "ORB", "HOG", "Optical flow"],
        resources: [
          { title: "Feature Detection with OpenCV", type: "video", duration: "2 hrs" },
          { title: "Image Feature Extraction Guide", type: "article", duration: "1 hr" },
          { title: "Image Stitching with SIFT", type: "practice", duration: "2 hrs" },
        ],
      },
      {
        id: 3,
        title: "Convolutional Neural Networks",
        description: "Convolutions, pooling, batch norm, and landmark architectures: LeNet, VGG, ResNet, and EfficientNet.",
        difficulty: "Intermediate",
        estimatedTime: "2 weeks",
        skills: ["CNNs", "ResNet", "PyTorch", "Transfer learning", "Batch norm"],
        resources: [
          { title: "CS231n — Stanford CNN Course", type: "course", duration: "10 hrs" },
          { title: "Building CNNs from Scratch", type: "video", duration: "2 hrs" },
          { title: "Image Classification Competition", type: "practice", duration: "4 hrs" },
        ],
      },
      {
        id: 4,
        title: "Object Detection & Segmentation",
        description: "Sliding windows, R-CNN family, YOLO, anchor boxes, and semantic vs instance segmentation with Mask R-CNN.",
        difficulty: "Intermediate",
        estimatedTime: "2 weeks",
        skills: ["YOLO", "R-CNN", "Anchor boxes", "Mask R-CNN", "mAP"],
        resources: [
          { title: "Object Detection Survey Paper", type: "article", duration: "2 hrs" },
          { title: "YOLOv8 Tutorial", type: "course", duration: "3 hrs" },
          { title: "Custom Object Detector Project", type: "practice", duration: "5 hrs" },
        ],
      },
      {
        id: 5,
        title: "Vision Transformers & Modern Architectures",
        description: "ViT, CLIP, DINO, SAM — understand how transformers revolutionized vision and how foundation models work.",
        difficulty: "Advanced",
        estimatedTime: "1.5 weeks",
        skills: ["ViT", "CLIP", "SAM", "Foundation models", "HuggingFace"],
        resources: [
          { title: "An Image Is Worth 16×16 Words", type: "article", duration: "2 hrs" },
          { title: "CLIP Zero-Shot Classification", type: "video", duration: "1.5 hrs" },
          { title: "Segment Anything Lab", type: "practice", duration: "3 hrs" },
        ],
      },
      {
        id: 6,
        title: "Deploying Vision Systems",
        description: "ONNX export, TensorRT optimization, real-time inference on edge devices (Jetson), and building REST APIs for CV models.",
        difficulty: "Advanced",
        estimatedTime: "1.5 weeks",
        skills: ["ONNX", "TensorRT", "FastAPI", "Edge inference", "Jetson Nano"],
        resources: [
          { title: "Deploying CV Models in Production", type: "course", duration: "4 hrs" },
          { title: "TensorRT Optimization Guide", type: "article", duration: "1.5 hrs" },
          { title: "Real-Time Detection App", type: "practice", duration: "4 hrs" },
        ],
      },
    ],
  },
}

// Generic fallback for any user-typed topic
function generateGenericRoadmap(topic: string): GeneratedRoadmap {
  return {
    topic,
    overview: `A structured, AI-generated learning pathway for ${topic}. You'll move from foundational concepts through intermediate theory to advanced, practical applications — building real projects at every stage.`,
    totalTime: "8–12 weeks",
    steps: [
      {
        id: 1,
        title: `${topic} Foundations`,
        description: `Core principles, key terminology, and the historical context of ${topic}. Build the mental model you need before diving deeper.`,
        difficulty: "Beginner",
        estimatedTime: "1.5 weeks",
        skills: ["Fundamentals", "Core concepts", "Terminology", "Mental models"],
        resources: [
          { title: `Introduction to ${topic}`, type: "video", duration: "2 hrs" },
          { title: `${topic} Beginner's Guide`, type: "article", duration: "1.5 hrs" },
          { title: "Foundation Exercises", type: "practice", duration: "1 hr" },
        ],
      },
      {
        id: 2,
        title: "Mathematical & Theoretical Basis",
        description: `The underlying mathematics and formal theory that power ${topic}. Understanding these will unlock deeper intuition throughout the rest of the roadmap.`,
        difficulty: "Beginner",
        estimatedTime: "2 weeks",
        skills: ["Applied math", "Theoretical concepts", "Problem framing"],
        resources: [
          { title: "Core Theory Deep Dive", type: "course", duration: "5 hrs" },
          { title: "Math Prerequisites Review", type: "article", duration: "2 hrs" },
          { title: "Theory Problem Sets", type: "practice", duration: "2 hrs" },
        ],
      },
      {
        id: 3,
        title: "Tools & Development Environment",
        description: `Set up the standard toolchain for ${topic}. Learn the key libraries, frameworks, and workflow used by professionals in the field.`,
        difficulty: "Beginner",
        estimatedTime: "1 week",
        skills: ["Tooling", "Libraries", "Environment setup", "Workflow"],
        resources: [
          { title: "Official Tooling Documentation", type: "article", duration: "2 hrs" },
          { title: "Environment Setup Tutorial", type: "video", duration: "1 hr" },
          { title: "First Project Setup", type: "practice", duration: "1.5 hrs" },
        ],
      },
      {
        id: 4,
        title: "Core Algorithms & Techniques",
        description: `The primary algorithms, methods, and techniques that define ${topic}. Implement each one and understand the tradeoffs involved.`,
        difficulty: "Intermediate",
        estimatedTime: "2.5 weeks",
        skills: ["Core algorithms", "Implementation", "Tradeoff analysis"],
        resources: [
          { title: "Algorithm Deep Dive Series", type: "course", duration: "8 hrs" },
          { title: "Implementation from Scratch", type: "video", duration: "3 hrs" },
          { title: "Algorithm Benchmark Project", type: "practice", duration: "3 hrs" },
        ],
      },
      {
        id: 5,
        title: "Real-World Project",
        description: `Apply everything learned in a complete end-to-end project. Tackle a real problem domain using ${topic} and document your process.`,
        difficulty: "Intermediate",
        estimatedTime: "2 weeks",
        skills: ["Project design", "Integration", "Documentation", "Problem solving"],
        resources: [
          { title: "Project-Based Learning Guide", type: "article", duration: "1 hr" },
          { title: "Capstone Project Examples", type: "video", duration: "2 hrs" },
          { title: "Build Your Showcase Project", type: "practice", duration: "8 hrs" },
        ],
      },
      {
        id: 6,
        title: "Advanced Topics & Research Frontiers",
        description: `Current state-of-the-art in ${topic}, recent breakthroughs, open research questions, and how to stay current as the field evolves.`,
        difficulty: "Advanced",
        estimatedTime: "1.5 weeks",
        skills: ["Research literacy", "Advanced techniques", "Paper reading"],
        resources: [
          { title: "Recent Advances Survey Paper", type: "article", duration: "2 hrs" },
          { title: "Research Frontiers Talk", type: "video", duration: "1.5 hrs" },
          { title: "Reproduce a Research Result", type: "practice", duration: "4 hrs" },
        ],
      },
    ],
  }
}

export function getRoadmap(topic: string): GeneratedRoadmap {
  const key = topic.trim().toLowerCase()
  return ROADMAP_DB[key] ?? generateGenericRoadmap(topic)
}

// ── NLP Sectioned Roadmap ────────────────────────────────────────────────────

export const NLP_ROADMAP: SectionedRoadmap = {
  title: "Natural Language Processing",
  subtitle: "From mathematical foundations to production-ready language models",
  totalMonths: 8,
  totalHours: 320,
  sections: [
    {
      id: "math",
      title: "Mathematics Foundations",
      color: "oklch(0.50 0.17 255)",
      bgColor: "oklch(0.94 0.04 255)",
      topics: [
        {
          id: "algebra",
          title: "Algebra",
          description: "Variables, equations, functions, and algebraic manipulation — the baseline for all quantitative reasoning.",
          difficulty: "Beginner",
          estimatedHours: 10,
          prerequisites: [],
          skills: ["Equations", "Polynomials", "Factoring", "Inequalities"],
          resources: [
            { title: "Khan Academy Algebra 1 & 2", type: "course", duration: "8 hrs" },
            { title: "Algebra Basics for ML", type: "article", duration: "1 hr" },
            { title: "Practice Problem Sets", type: "practice", duration: "2 hrs" },
          ],
        },
        {
          id: "functions",
          title: "Functions",
          description: "Domain, range, composition, inverse functions, logarithms, and exponentials used throughout ML loss functions.",
          difficulty: "Beginner",
          estimatedHours: 8,
          prerequisites: ["algebra"],
          skills: ["Exponentials", "Logarithms", "Composition", "Inverse functions"],
          resources: [
            { title: "Functions & Their Graphs", type: "video", duration: "3 hrs" },
            { title: "Logarithms in Machine Learning", type: "article", duration: "1 hr" },
            { title: "Function Sketching Practice", type: "practice", duration: "2 hrs" },
          ],
        },
        {
          id: "calculus",
          title: "Calculus",
          description: "Derivatives, chain rule, integrals, and gradients — the engine behind backpropagation and model training.",
          difficulty: "Intermediate",
          estimatedHours: 20,
          prerequisites: ["functions"],
          skills: ["Derivatives", "Chain rule", "Gradients", "Optimization"],
          resources: [
            { title: "3Blue1Brown — Essence of Calculus", type: "video", duration: "4 hrs" },
            { title: "Calculus for ML Practitioners", type: "course", duration: "6 hrs" },
            { title: "Gradient Descent from Scratch", type: "practice", duration: "3 hrs" },
          ],
        },
        {
          id: "linear-algebra",
          title: "Linear Algebra",
          description: "Vectors, matrices, dot products, eigenvalues, and SVD — the language of neural networks and embeddings.",
          difficulty: "Intermediate",
          estimatedHours: 20,
          prerequisites: ["functions"],
          skills: ["Matrices", "Dot product", "Eigenvectors", "SVD", "Transformations"],
          resources: [
            { title: "3Blue1Brown — Essence of Linear Algebra", type: "video", duration: "3.5 hrs" },
            { title: "Linear Algebra for ML — Gilbert Strang", type: "course", duration: "8 hrs" },
            { title: "NumPy Matrix Operations Lab", type: "practice", duration: "3 hrs" },
          ],
        },
        {
          id: "probability",
          title: "Probability",
          description: "Random variables, distributions, Bayes theorem, and conditional probability — core to language model scoring.",
          difficulty: "Intermediate",
          estimatedHours: 15,
          prerequisites: ["calculus"],
          skills: ["Distributions", "Bayes theorem", "Expectation", "Entropy"],
          resources: [
            { title: "Probability for Data Science", type: "course", duration: "5 hrs" },
            { title: "Bayes Theorem Visualized", type: "video", duration: "1.5 hrs" },
            { title: "Probability Problem Sets", type: "practice", duration: "2 hrs" },
          ],
        },
        {
          id: "statistics",
          title: "Statistics",
          description: "Hypothesis testing, confidence intervals, regression, and MLE — essential for evaluating and training NLP models.",
          difficulty: "Intermediate",
          estimatedHours: 15,
          prerequisites: ["probability"],
          skills: ["MLE", "Hypothesis testing", "Regression", "Confidence intervals"],
          resources: [
            { title: "Statistics for ML — fast.ai", type: "course", duration: "4 hrs" },
            { title: "MLE vs MAP Estimation", type: "article", duration: "1 hr" },
            { title: "Statistical Analysis Lab", type: "practice", duration: "2 hrs" },
          ],
        },
        {
          id: "information-theory",
          title: "Information Theory",
          description: "Entropy, cross-entropy, KL divergence, and mutual information — the measures used in every NLP loss function.",
          difficulty: "Advanced",
          estimatedHours: 10,
          prerequisites: ["probability", "statistics"],
          skills: ["Entropy", "Cross-entropy", "KL divergence", "Mutual information"],
          resources: [
            { title: "Visual Information Theory — Colah", type: "article", duration: "2 hrs" },
            { title: "Information Theory for ML", type: "video", duration: "1.5 hrs" },
            { title: "Entropy Calculations Practice", type: "practice", duration: "1 hr" },
          ],
        },
      ],
    },
    {
      id: "programming",
      title: "Programming Foundations",
      color: "oklch(0.48 0.18 47)",
      bgColor: "oklch(0.95 0.07 47)",
      topics: [
        {
          id: "python",
          title: "Python",
          description: "Python syntax, data types, OOP, file I/O, and the standard library — the primary language of NLP and ML.",
          difficulty: "Beginner",
          estimatedHours: 20,
          prerequisites: [],
          skills: ["Python", "OOP", "File I/O", "Standard library"],
          resources: [
            { title: "Python for Everybody — Coursera", type: "course", duration: "10 hrs" },
            { title: "Python Crash Course (book)", type: "article", duration: "4 hrs" },
            { title: "Python Coding Exercises", type: "practice", duration: "4 hrs" },
          ],
        },
        {
          id: "data-structures",
          title: "Data Structures",
          description: "Arrays, linked lists, stacks, queues, hash maps, and trees — critical for efficient text processing pipelines.",
          difficulty: "Beginner",
          estimatedHours: 12,
          prerequisites: ["python"],
          skills: ["Arrays", "Hash maps", "Trees", "Graphs", "Complexity analysis"],
          resources: [
            { title: "Data Structures in Python", type: "course", duration: "5 hrs" },
            { title: "Big-O Cheatsheet", type: "article", duration: "1 hr" },
            { title: "LeetCode Easy Problems", type: "practice", duration: "3 hrs" },
          ],
        },
        {
          id: "algorithms",
          title: "Algorithms",
          description: "Sorting, searching, dynamic programming, and graph algorithms with complexity analysis.",
          difficulty: "Intermediate",
          estimatedHours: 15,
          prerequisites: ["data-structures"],
          skills: ["Sorting", "Dynamic programming", "Graph search", "Recursion"],
          resources: [
            { title: "Algorithms I — Princeton Coursera", type: "course", duration: "8 hrs" },
            { title: "Grokking Algorithms (book)", type: "article", duration: "4 hrs" },
            { title: "Algorithm Practice Problems", type: "practice", duration: "4 hrs" },
          ],
        },
        {
          id: "numpy",
          title: "NumPy",
          description: "N-dimensional arrays, vectorized operations, broadcasting, and linear algebra with NumPy — the backbone of all ML frameworks.",
          difficulty: "Beginner",
          estimatedHours: 8,
          prerequisites: ["python"],
          skills: ["ndarray", "Broadcasting", "Vectorization", "Linear algebra ops"],
          resources: [
            { title: "NumPy Official Tutorial", type: "article", duration: "2 hrs" },
            { title: "NumPy for ML", type: "video", duration: "2 hrs" },
            { title: "NumPy Operations Lab", type: "practice", duration: "2 hrs" },
          ],
        },
        {
          id: "pandas",
          title: "Pandas",
          description: "DataFrames, Series, merging, grouping, and cleaning tabular data — used for preparing NLP datasets.",
          difficulty: "Beginner",
          estimatedHours: 8,
          prerequisites: ["numpy"],
          skills: ["DataFrame", "Series", "GroupBy", "Merge", "Data cleaning"],
          resources: [
            { title: "Pandas Official 10 Minutes Guide", type: "article", duration: "1 hr" },
            { title: "Data Analysis with Pandas", type: "course", duration: "4 hrs" },
            { title: "Dataset Cleaning Exercise", type: "practice", duration: "2 hrs" },
          ],
        },
      ],
    },
    {
      id: "ml",
      title: "Machine Learning",
      color: "oklch(0.45 0.16 145)",
      bgColor: "oklch(0.93 0.06 145)",
      topics: [
        {
          id: "regression",
          title: "Regression",
          description: "Linear and logistic regression, gradient descent, regularisation (L1/L2), and understanding model generalisation.",
          difficulty: "Intermediate",
          estimatedHours: 12,
          prerequisites: ["calculus", "numpy", "pandas"],
          skills: ["Linear regression", "Logistic regression", "L1/L2 regularisation", "Gradient descent"],
          resources: [
            { title: "Regression from Scratch in Python", type: "video", duration: "2 hrs" },
            { title: "Regularisation Explained", type: "article", duration: "1 hr" },
            { title: "Regression on Real Dataset", type: "practice", duration: "3 hrs" },
          ],
        },
        {
          id: "classification",
          title: "Classification",
          description: "Decision trees, SVMs, Naive Bayes, and k-NN — with a focus on Naive Bayes for its direct NLP applications.",
          difficulty: "Intermediate",
          estimatedHours: 12,
          prerequisites: ["regression", "probability"],
          skills: ["Naive Bayes", "SVM", "Decision trees", "k-NN", "Precision/Recall"],
          resources: [
            { title: "Text Classification with Naive Bayes", type: "video", duration: "1.5 hrs" },
            { title: "Scikit-learn Classification Tutorial", type: "course", duration: "3 hrs" },
            { title: "Spam Filter from Scratch", type: "practice", duration: "3 hrs" },
          ],
        },
        {
          id: "clustering",
          title: "Clustering",
          description: "K-means, DBSCAN, and hierarchical clustering — used in topic modelling and unsupervised NLP tasks.",
          difficulty: "Intermediate",
          estimatedHours: 8,
          prerequisites: ["regression", "linear-algebra"],
          skills: ["K-means", "DBSCAN", "Silhouette score", "Topic modelling"],
          resources: [
            { title: "Clustering Algorithms Overview", type: "video", duration: "1.5 hrs" },
            { title: "K-means for Text Data", type: "article", duration: "1 hr" },
            { title: "Document Clustering Lab", type: "practice", duration: "2 hrs" },
          ],
        },
      ],
    },
    {
      id: "dl",
      title: "Deep Learning",
      color: "oklch(0.50 0.20 20)",
      bgColor: "oklch(0.95 0.05 20)",
      topics: [
        {
          id: "neural-networks",
          title: "Neural Networks",
          description: "Perceptrons, activation functions, backpropagation, batch normalisation, and training dynamics with PyTorch.",
          difficulty: "Intermediate",
          estimatedHours: 20,
          prerequisites: ["classification", "calculus", "linear-algebra"],
          skills: ["Backpropagation", "Activation functions", "Batch norm", "PyTorch"],
          resources: [
            { title: "Neural Networks from Scratch — Sentdex", type: "course", duration: "6 hrs" },
            { title: "The Backpropagation Algorithm", type: "article", duration: "2 hrs" },
            { title: "MNIST Digit Classifier", type: "practice", duration: "3 hrs" },
          ],
        },
        {
          id: "cnns",
          title: "CNNs",
          description: "Convolutional layers, pooling, and landmark architectures. Relevant for NLP tasks like document image understanding.",
          difficulty: "Intermediate",
          estimatedHours: 12,
          prerequisites: ["neural-networks"],
          skills: ["Convolutions", "Pooling", "ResNet", "Transfer learning"],
          resources: [
            { title: "CS231n — Stanford CNN Lectures", type: "video", duration: "5 hrs" },
            { title: "CNN Architecture Guide", type: "article", duration: "1.5 hrs" },
            { title: "Image Classification Project", type: "practice", duration: "3 hrs" },
          ],
        },
        {
          id: "rnns",
          title: "RNNs",
          description: "Recurrent neural networks for sequential data — understanding vanishing gradients and why LSTMs were needed.",
          difficulty: "Intermediate",
          estimatedHours: 10,
          prerequisites: ["neural-networks"],
          skills: ["RNN", "Vanishing gradients", "BPTT", "Sequence modelling"],
          resources: [
            { title: "Recurrent Neural Networks Explained", type: "video", duration: "1.5 hrs" },
            { title: "The Unreasonable Effectiveness of RNNs — Karpathy", type: "article", duration: "1 hr" },
            { title: "Char-RNN Language Model", type: "practice", duration: "3 hrs" },
          ],
        },
        {
          id: "lstms",
          title: "LSTMs",
          description: "Long Short-Term Memory networks — gates, cell state, and how LSTMs solved the vanishing gradient problem.",
          difficulty: "Intermediate",
          estimatedHours: 12,
          prerequisites: ["rnns"],
          skills: ["LSTM", "GRU", "Gates", "Sequence labelling", "Named entity recognition"],
          resources: [
            { title: "Understanding LSTMs — Colah's Blog", type: "article", duration: "2 hrs" },
            { title: "LSTM for Text Generation", type: "video", duration: "1.5 hrs" },
            { title: "NER with LSTM Lab", type: "practice", duration: "3 hrs" },
          ],
        },
        {
          id: "attention",
          title: "Attention",
          description: "Bahdanau and Luong attention, the seq2seq + attention model for machine translation, and intuition behind attention weights.",
          difficulty: "Advanced",
          estimatedHours: 12,
          prerequisites: ["lstms", "information-theory"],
          skills: ["Bahdanau attention", "Seq2seq", "Alignment", "Machine translation"],
          resources: [
            { title: "Neural Machine Translation by Jointly Learning to Align", type: "article", duration: "2 hrs" },
            { title: "Attention Mechanism Explained Visually", type: "video", duration: "1.5 hrs" },
            { title: "Seq2Seq Translation Lab", type: "practice", duration: "4 hrs" },
          ],
        },
        {
          id: "transformers",
          title: "Transformers",
          description: "Multi-head self-attention, positional encoding, encoder-decoder architecture, and the seminal 'Attention Is All You Need' paper.",
          difficulty: "Advanced",
          estimatedHours: 20,
          prerequisites: ["attention"],
          skills: ["Self-attention", "Multi-head attention", "Positional encoding", "Layer norm"],
          resources: [
            { title: "The Illustrated Transformer — Jay Alammar", type: "article", duration: "2.5 hrs" },
            { title: "Attention Is All You Need Walkthrough", type: "video", duration: "2 hrs" },
            { title: "Build a Transformer from Scratch", type: "practice", duration: "5 hrs" },
          ],
        },
      ],
    },
    {
      id: "nlp",
      title: "Natural Language Processing",
      color: "oklch(0.55 0.20 255)",
      bgColor: "oklch(0.93 0.06 255)",
      topics: [
        {
          id: "text-processing",
          title: "Text Processing",
          description: "Tokenization, stemming, lemmatization, stop-word removal, regex, and building preprocessing pipelines with spaCy and NLTK.",
          difficulty: "Beginner",
          estimatedHours: 10,
          prerequisites: ["python", "pandas"],
          skills: ["Tokenization", "spaCy", "NLTK", "Regex", "Pipeline"],
          resources: [
            { title: "Text Preprocessing with spaCy", type: "video", duration: "1.5 hrs" },
            { title: "NLTK Book — Chapters 1–3", type: "article", duration: "3 hrs" },
            { title: "Build a Text Cleaner", type: "practice", duration: "2 hrs" },
          ],
        },
        {
          id: "embeddings",
          title: "Embeddings",
          description: "TF-IDF, Word2Vec, GloVe, FastText — how words are represented as dense vectors encoding semantic relationships.",
          difficulty: "Intermediate",
          estimatedHours: 12,
          prerequisites: ["text-processing", "linear-algebra", "statistics"],
          skills: ["Word2Vec", "GloVe", "FastText", "Cosine similarity", "TF-IDF"],
          resources: [
            { title: "The Illustrated Word2Vec — Jay Alammar", type: "article", duration: "2 hrs" },
            { title: "Word Embeddings Deep Dive", type: "video", duration: "1.5 hrs" },
            { title: "Semantic Similarity Explorer", type: "practice", duration: "2 hrs" },
          ],
        },
        {
          id: "bert",
          title: "BERT",
          description: "Bidirectional Encoder Representations from Transformers — pre-training objectives, fine-tuning, and using HuggingFace Transformers.",
          difficulty: "Advanced",
          estimatedHours: 16,
          prerequisites: ["transformers", "embeddings"],
          skills: ["BERT", "MLM", "Fine-tuning", "HuggingFace", "Tokenizers"],
          resources: [
            { title: "BERT Explained — Jay Alammar", type: "article", duration: "2 hrs" },
            { title: "Fine-Tuning BERT for Classification", type: "course", duration: "4 hrs" },
            { title: "Sentiment Analysis with BERT", type: "practice", duration: "3 hrs" },
          ],
        },
        {
          id: "gpt",
          title: "GPT",
          description: "GPT architecture, autoregressive language modelling, prompt engineering, and interacting with large language models via APIs.",
          difficulty: "Advanced",
          estimatedHours: 16,
          prerequisites: ["transformers"],
          skills: ["GPT", "Autoregressive LM", "Prompt engineering", "OpenAI API", "In-context learning"],
          resources: [
            { title: "The Illustrated GPT-2 — Jay Alammar", type: "article", duration: "2 hrs" },
            { title: "GPT-3 Paper Walkthrough", type: "video", duration: "2 hrs" },
            { title: "Prompt Engineering Lab", type: "practice", duration: "3 hrs" },
          ],
        },
        {
          id: "retrieval-systems",
          title: "Retrieval Systems",
          description: "Dense retrieval, BM25, vector databases (FAISS, Pinecone), and building RAG (Retrieval-Augmented Generation) pipelines.",
          difficulty: "Advanced",
          estimatedHours: 14,
          prerequisites: ["bert", "gpt", "embeddings"],
          skills: ["BM25", "FAISS", "Vector search", "RAG", "LangChain"],
          resources: [
            { title: "Dense Passage Retrieval Paper", type: "article", duration: "1.5 hrs" },
            { title: "Build a RAG System with LangChain", type: "course", duration: "3 hrs" },
            { title: "Semantic Search with FAISS", type: "practice", duration: "3 hrs" },
          ],
        },
      ],
    },
    {
      id: "projects",
      title: "Projects",
      color: "oklch(0.50 0.16 320)",
      bgColor: "oklch(0.95 0.04 320)",
      topics: [
        {
          id: "sentiment-analysis",
          title: "Sentiment Analysis",
          description: "End-to-end sentiment classifier: scrape data, preprocess, fine-tune BERT, evaluate, and expose a REST API.",
          difficulty: "Intermediate",
          estimatedHours: 20,
          prerequisites: ["bert", "text-processing"],
          skills: ["Data scraping", "BERT fine-tuning", "FastAPI", "Model evaluation"],
          resources: [
            { title: "Sentiment Analysis with Transformers", type: "course", duration: "4 hrs" },
            { title: "Deploying NLP Models with FastAPI", type: "article", duration: "1.5 hrs" },
            { title: "Complete Sentiment Project", type: "practice", duration: "10 hrs" },
          ],
        },
        {
          id: "chatbot",
          title: "Chatbot",
          description: "Build a context-aware chatbot using an LLM API, memory management, streaming responses, and a simple front-end.",
          difficulty: "Advanced",
          estimatedHours: 20,
          prerequisites: ["gpt", "retrieval-systems"],
          skills: ["LLM API", "Memory management", "Streaming", "LangChain", "React"],
          resources: [
            { title: "LangChain Chatbot Tutorial", type: "course", duration: "3 hrs" },
            { title: "Building Production Chatbots", type: "video", duration: "2 hrs" },
            { title: "Full-Stack Chatbot Project", type: "practice", duration: "12 hrs" },
          ],
        },
        {
          id: "rag-system",
          title: "RAG System",
          description: "Retrieval-Augmented Generation over your own documents — ingest, chunk, embed, store in a vector DB, and answer questions.",
          difficulty: "Advanced",
          estimatedHours: 25,
          prerequisites: ["retrieval-systems", "chatbot"],
          skills: ["RAG", "Chunking", "Vector DB", "LangChain", "Evaluation"],
          resources: [
            { title: "RAG from Scratch — LangChain", type: "course", duration: "5 hrs" },
            { title: "Evaluating RAG Pipelines", type: "article", duration: "1.5 hrs" },
            { title: "Document Q&A RAG App", type: "practice", duration: "15 hrs" },
          ],
        },
        {
          id: "research-assistant",
          title: "Research Assistant",
          description: "AI agent that searches papers, summarises findings, extracts citations, and generates structured research reports.",
          difficulty: "Advanced",
          estimatedHours: 30,
          prerequisites: ["rag-system"],
          skills: ["AI agents", "Tool use", "Paper parsing", "Summarisation", "Report generation"],
          resources: [
            { title: "LangChain Agents Deep Dive", type: "course", duration: "4 hrs" },
            { title: "Building AI Research Tools", type: "video", duration: "2 hrs" },
            { title: "Research Assistant Capstone", type: "practice", duration: "20 hrs" },
          ],
        },
      ],
    },
  ],
}
