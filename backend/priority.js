export function scoreEvent(item) {
  let score = 0;
  const reasons = [];

  //  Type
  if (item.type === "hackathon") {
    score += 15;
    reasons.push("Hackathon opportunity");
  }

  if (item.type === "internship") {
    score += 10;
    reasons.push("Internship opportunity");
  }

  //  Mode
  if (item.mode === "online") {
    score += 10;
    reasons.push("Online access");
  }

  if (item.mode === "offline") {
    score += 5;
    reasons.push("Offline event");
  }

  //  Location
  if (item.location?.toLowerCase().includes("india")) {
    score += 10;
    reasons.push("India-based");
  }

  //  Description quality
  if (item.description?.length > 120) {
    score += 10;
    reasons.push("Well-detailed opportunity");
  } else if (item.description?.length > 50) {
    score += 5;
    reasons.push("Basic description available");
  }

  //  Deadline urgency (SAFE)
  if (item.deadline) {
    const deadline = new Date(item.deadline);
    const now = new Date();
    const diff = deadline - now;

    if (!isNaN(diff)) {
      const daysLeft = diff / (1000 * 60 * 60 * 24);

      if (daysLeft <= 3) {
        score += 35;
        reasons.push("Deadline within 3 days");
      } else if (daysLeft <= 7) {
        score += 25;
        reasons.push("Deadline within 7 days");
      } else if (daysLeft <= 15) {
        score += 15;
        reasons.push("Deadline within 15 days");
      } else if (daysLeft <= 30) {
        score += 8;
        reasons.push("Deadline within 30 days");
      }
    }
  }

  //  Source reliability bonus
  if (item.source?.includes("unstop")) {
    score += 10;
    reasons.push("Trusted source: Unstop");
  }
  if (item.source?.includes("hack2skill")) {
    score += 8;
    reasons.push("Trusted source: Hack2Skill");
  }
  if (item.source?.includes("devfolio")) {
    score += 6;
    reasons.push("Trusted source: Devfolio");
  }

  return {
    score: Math.round(score),
    reasons
  };
}
