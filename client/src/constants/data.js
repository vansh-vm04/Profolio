const degrees = [
  "Bachelor of Technology (B.Tech)",
  "Bachelor of Engineering (B.E)",
  "Bachelor of Science (B.Sc)",
  "Bachelor of Arts (B.A)",
  "Bachelor of Commerce (B.Com)",
  "Bachelor of Business Administration (BBA)",
  "Bachelor of Computer Applications (BCA)",
  "Bachelor of Laws (LLB)",
  "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
  "Bachelor of Dental Surgery (BDS)",
  "Bachelor of Pharmacy (B.Pharma)",
  "Bachelor of Architecture (B.Arch)",
  "Master of Technology (M.Tech)",
  "Master of Engineering (M.E)",
  "Master of Science (M.Sc)",
  "Master of Arts (M.A)",
  "Master of Commerce (M.Com)",
  "Master of Business Administration (MBA)",
  "Master of Computer Applications (MCA)",
  "Master of Laws (LLM)",
  "Doctor of Philosophy (Ph.D.)",
  "Doctor of Medicine (MD)",
  "Master of Surgery (MS)",
  "Diploma in Pharmacy (D.Pharma)",
  "Diploma in Education (D.Ed)",
  "Post Graduate Diploma in Management (PGDM)",
  "Bachelor of Education (B.Ed)",
  "Master of Education (M.Ed)",
  "Bachelor of Fine Arts (BFA)",
  "Master of Fine Arts (MFA)",
];

const templates = [
  {id:"template1", image:"/images/template1.png"},
  {id:"template2", image:"/images/template2.png"},
  {id:"template3", image:"/images/template3.png"}
]

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - 1990 + 1 },
  (_, i) => 2000 + i
);

const skillOptions = [
  // Programming Languages
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "Go", value: "go" },
  { label: "PHP", value: "php" },
  { label: "Kotlin", value: "kotlin" },
  { label: "Swift", value: "swift" },
  { label: "Ruby", value: "ruby" },

  // Web Development
  { label: "HTML5", value: "html5" },
  { label: "CSS3", value: "css3" },
  { label: "Tailwind CSS", value: "tailwind-css" },
  { label: "Bootstrap", value: "bootstrap" },
  { label: "React.js", value: "react-js" },
  { label: "Next.js", value: "next-js" },
  { label: "Angular", value: "angular" },
  { label: "Vue.js", value: "vue-js" },
  { label: "SASS/SCSS", value: "sass-scss" },

  // Backend Development
  { label: "Node.js", value: "node-js" },
  { label: "Express.js", value: "express-js" },
  { label: "Django", value: "django" },
  { label: "Flask", value: "flask" },
  { label: "Spring Boot", value: "spring-boot" },
  { label: "Laravel", value: "laravel" },
  { label: "FastAPI", value: "fastapi" },
  { label: "Ruby on Rails", value: "ruby-on-rails" },

  // Databases
  { label: "MongoDB", value: "mongodb" },
  { label: "PostgreSQL", value: "postgresql" },
  { label: "MySQL", value: "mysql" },
  { label: "SQLite", value: "sqlite" },
  { label: "Firebase", value: "firebase" },
  { label: "Redis", value: "redis" },
  { label: "Supabase", value: "supabase" },

  // Cloud & DevOps
  { label: "Docker", value: "docker" },
  { label: "Kubernetes", value: "kubernetes" },
  { label: "AWS", value: "aws" },
  { label: "Azure", value: "azure" },
  { label: "Google Cloud Platform", value: "gcp" },
  { label: "GitHub Actions", value: "github-actions" },
  { label: "CI/CD", value: "ci-cd" },
  { label: "Terraform", value: "terraform" },

  // Authentication & APIs
  { label: "OAuth 2.0", value: "oauth-2" },
  { label: "JWT", value: "jwt" },
  { label: "REST APIs", value: "rest-apis" },
  { label: "GraphQL", value: "graphql" },
  { label: "Passport.js", value: "passport-js" },
  { label: "Clerk", value: "clerk" },
  { label: "Auth0", value: "auth0" },

  // AI / ML / Data
  { label: "Pandas", value: "pandas" },
  { label: "NumPy", value: "numpy" },
  { label: "TensorFlow", value: "tensorflow" },
  { label: "PyTorch", value: "pytorch" },
  { label: "scikit-learn", value: "scikit-learn" },
  { label: "OpenAI API", value: "openai-api" },
  { label: "Hugging Face", value: "hugging-face" },
  { label: "LangChain", value: "langchain" },
  { label: "Data Visualization", value: "data-visualization" },

  // Testing
  { label: "Jest", value: "jest" },
  { label: "Mocha", value: "mocha" },
  { label: "Cypress", value: "cypress" },
  { label: "Playwright", value: "playwright" },
  { label: "Selenium", value: "selenium" },

  // Mobile Development
  { label: "React Native", value: "react-native" },
  { label: "Flutter", value: "flutter" },
  { label: "SwiftUI", value: "swiftui" },
  { label: "Android SDK", value: "android-sdk" },

  // Tools & Version Control
  { label: "Git", value: "git" },
  { label: "GitHub", value: "github" },
  { label: "GitLab", value: "gitlab" },
  { label: "Bitbucket", value: "bitbucket" },
  { label: "Figma", value: "figma" },
  { label: "Postman", value: "postman" },
  { label: "VS Code", value: "vs-code" },
  { label: "Jira", value: "jira" },
  { label: "Notion", value: "notion" },

  // Design
  { label: "UI/UX Design", value: "UI/UX Design" },
  { label: "Wireframing", value: "Wireframing" },
  { label: "Prototyping", value: "Prototyping" },
  { label: "Adobe XD", value: "Adobe XD" },
  { label: "Canva", value: "Canva" },

  // Content & Marketing
  { label: "Content Writing", value: "Content Writing" },
  { label: "SEO", value: "SEO" },
  { label: "Copywriting", value: "Copywriting" },
  { label: "Social Media Marketing", value: "Social Media Marketing" },
  { label: "Email Marketing", value: "Email Marketing" },
  { label: "Digital Strategy", value: "Digital Strategy" },

  // Business & Soft Skills
  { label: "Communication", value: "Communication" },
  { label: "Problem Solving", value: "Problem Solving" },
  { label: "Teamwork", value: "Teamwork" },
  { label: "Time Management", value: "Time Management" },
  { label: "Critical Thinking", value: "Critical Thinking" },
  { label: "Creativity", value: "Creativity" },
  { label: "Adaptability", value: "Adaptability" },
  { label: "Leadership", value: "Leadership" },
  { label: "Presentation Skills", value: "Presentation Skills" },
  { label: "Public Speaking", value: "Public Speaking" },
  { label: "Conflict Resolution", value: "Conflict Resolution" },
  { label: "Active Listening", value: "Active Listening" },
  { label: "Empathy", value: "Empathy" },
  { label: "Emotional Intelligence", value: "Emotional Intelligence" },
  { label: "Decision Making", value: "Decision Making" },

  // Project & Product Management
  { label: "Agile Methodologies", value: "Agile Methodologies" },
  { label: "Scrum", value: "Scrum" },
  { label: "Project Management", value: "Project Management" },
  { label: "Product Management", value: "Product Management" },
  { label: "Business Analysis", value: "Business Analysis" },
  { label: "User Research", value: "User Research" }
];



export { degrees, months, years, templates, skillOptions };
