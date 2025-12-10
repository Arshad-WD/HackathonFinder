const IS_CLOUD = process.env.RENDER === "true";

// ✅ SAFE ON CLOUD (NO BLOCKING)
const CLOUD_SAFE_TARGETS = [
  "https://devfolio.co/hackathons",
  "https://mlh.io/seasons/2025/events",
  "https://angelhack.com/hackathons/",
  "https://hack2skill.com/",
  "https://reskilll.com/allhacks"
];

const LOCAL_ONLY_TARGETS = [
  "https://unstop.com/hackathons",
  "https://internshala.com/internships",
  "https://www.naukri.com/internship-jobs",
  "https://www.linkedin.com/jobs/internship-jobs/",
  "https://careers.google.com/jobs/results/?employment_type=INTERN",
  "https://wellfound.com/jobs"
];

export const targets = IS_CLOUD
  ? CLOUD_SAFE_TARGETS
  : [...CLOUD_SAFE_TARGETS, ...LOCAL_ONLY_TARGETS];
