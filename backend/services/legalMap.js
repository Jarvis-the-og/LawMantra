/**
 * STATIC legal mapping — AI never generates or modifies this.
 * All legal sections are manually verified and sourced from Indian law.
 */
const legalMap = {
  phishing: {
    section: "IT Act Sections 66C & 66D",
    acts: ["Information Technology Act, 2000"],
    description: "Identity theft (66C) and cheating by personation using computer resources (66D).",
    punishment: "Up to 3 years imprisonment and fine up to ₹1 lakh (66C); Up to 3 years and ₹1 lakh (66D).",
    reportTo: ["cybercrime.gov.in", "Local Cyber Crime Cell", "Bank fraud helpline: 1930"],
  },

  upi_fraud: {
    section: "IT Act Section 66D & IPC Section 420",
    acts: ["Information Technology Act, 2000", "Indian Penal Code, 1860"],
    description: "Cheating by impersonation using electronic means (66D) and general cheating (IPC 420).",
    punishment: "Up to 3 years imprisonment and fine (66D); Up to 7 years and fine (IPC 420).",
    reportTo: ["cybercrime.gov.in", "Bank's fraud helpline", "National helpline: 1930", "UPI provider support"],
  },

  job_scam: {
    section: "IPC Sections 420 & 406",
    acts: ["Indian Penal Code, 1860"],
    description: "Cheating and dishonestly inducing delivery of property (420), and criminal breach of trust (406).",
    punishment: "Up to 7 years imprisonment and fine (420); Up to 3 years (406).",
    reportTo: ["cybercrime.gov.in", "Local Police Station", "Ministry of Labour helpline"],
  },

  lottery_scam: {
    section: "IPC Section 420 & Prize Chits and Money Circulation Schemes (Banning) Act, 1978",
    acts: ["Indian Penal Code, 1860", "Prize Chits & Money Circulation Schemes (Banning) Act, 1978"],
    description: "Fraudulent prize schemes are cheating under IPC 420 and banned under the 1978 Act.",
    punishment: "Up to 7 years and fine (IPC 420); Up to 3 years under 1978 Act.",
    reportTo: ["cybercrime.gov.in", "Local Police Station", "Consumer helpline: 1800-11-4000"],
  },

  unknown: {
    section: "IT Act Section 66 & IPC Section 420",
    acts: ["Information Technology Act, 2000", "Indian Penal Code, 1860"],
    description: "General cybercrime and/or cheating provisions may apply depending on the nature of the fraud.",
    punishment: "Varies based on specific provisions invoked.",
    reportTo: ["cybercrime.gov.in", "Local Police Station", "National helpline: 1930"],
  },
};

/**
 * Returns the legal info for a given scam type.
 * Always falls back to 'unknown' if type not found.
 */
const getLegalInfo = (scamType) => {
  return legalMap[scamType] || legalMap["unknown"];
};

module.exports = { getLegalInfo, legalMap };
