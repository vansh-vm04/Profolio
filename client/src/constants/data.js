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

export { degrees, months, years, templates };
