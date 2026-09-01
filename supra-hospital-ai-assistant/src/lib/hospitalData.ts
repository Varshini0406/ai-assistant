export type Role = "Doctor" | "Nurse" | "Admin";
export type Department =
  | "Orthopaedics"
  | "General Medicine"
  | "Cardiology"
  | "Paediatrics"
  | "Surgery"
  | "ICU"
  | "Pharmacy"
  | "Administration";

export type KnowledgeItem = {
  title: string;
  content: string;
  department: Department | "General";
  confidentiality: "public" | "internal" | "admin_only";
  tags: string[];
};

export const hospitalKnowledge: KnowledgeItem[] = [
  {
    title: "Post-TKR Pain Management",
    content:
      "Supra Ortho uses Paracetamol 650mg QDS as first-line post-TKR. Escalate to Tramadol 50mg if VAS > 6. AVOID NSAIDs at all steps due to surgical bleeding risk. Decision by Dr. Vikram, January 2025.",
    department: "Orthopaedics",
    confidentiality: "internal",
    tags: ["tkr", "pain", "orthopaedics", "nsaid"],
  },
  {
    title: "Patient Rajan Drug Alert",
    content:
      "ABSOLUTE: No ibuprofen, no aspirin, no diclofenac for patient Rajan. Cardiac stent 2022, dual antiplatelet therapy. Previous 8 NSAID refusals documented. Family also requests — refuse firmly.",
    department: "General Medicine",
    confidentiality: "internal",
    tags: ["rajan", "pain", "nsaid", "stent", "medication"],
  },
  {
    title: "Sepsis Protocol v3",
    content:
      "Supra Sepsis Bundle v3 2026: blood cultures before antibiotics, lactate within 1 HOUR (tightened from v2 which was 3 hours), 30mL/kg crystalloid for hypotension, vasopressors if MAP <65 after fluids.",
    department: "General Medicine",
    confidentiality: "internal",
    tags: ["sepsis", "protocol", "icu"],
  },
  {
    title: "DVT Prophylaxis",
    content:
      "ALL ortho surgical patients receive DVT prophylaxis: Enoxaparin 40mg SC daily starting 12 hours post-op. Duration: 14 days for TKR, 28 days for THR.",
    department: "Orthopaedics",
    confidentiality: "internal",
    tags: ["dvt", "prophylaxis", "surgery", "orthopaedics"],
  },
  {
    title: "Diabetic Fasting Protocol",
    content:
      "For fasting patients with Type 2 DM: adjust insulin timing not dose. Skip Glimepiride on fast days, continue Metformin with evening meal.",
    department: "General Medicine",
    confidentiality: "internal",
    tags: ["diabetes", "fasting", "metformin", "insulin"],
  },
  {
    title: "TKR Discharge Rule",
    content:
      "Do NOT discharge TKR patients before 48 hours post-op. Past incident: patient discharged at 36 hours developed DVT at home, emergency readmission.",
    department: "Orthopaedics",
    confidentiality: "internal",
    tags: ["tkr", "discharge", "dvt"],
  },
  {
    title: "Zimmer Biomet Preference",
    content:
      "Supra Ortho uses Zimmer Biomet as preferred TKR implant vendor. Smith & Nephew for revision cases only.",
    department: "Orthopaedics",
    confidentiality: "internal",
    tags: ["tkr", "implant", "vendor"],
  },
  {
    title: "Ortho Budget FY2026",
    content:
      "FY2026 Ortho budget: 4.2 Cr. Implants 45%, Staffing 30%, Equipment 15%, Training 10%. CONFIDENTIAL — HOD and Admin only.",
    department: "Orthopaedics",
    confidentiality: "admin_only",
    tags: ["budget", "finance", "orthopaedics", "confidential"],
  },
  {
    title: "Night Shift Handover",
    content:
      "15-minute structured handover using SBAR format. Include: pending labs, new admissions past 4 hours, patients for morning surgery.",
    department: "General",
    confidentiality: "internal",
    tags: ["handover", "sbarr", "shift"],
  },
  {
    title: "Warfarin-NSAID Interaction",
    content:
      "CRITICAL: Never prescribe NSAIDs to patients on Warfarin. Risk of life-threatening GI bleed. Use Paracetamol for pain.",
    department: "General Medicine",
    confidentiality: "internal",
    tags: ["warfarin", "nsaid", "bleed"],
  },
  {
    title: "Verbal Orders Policy",
    content:
      "NEVER accept verbal orders for medication changes without written confirmation within 1 hour. Exception: cardiac arrest only. Incident 2023: wrong dose from mishearing.",
    department: "General",
    confidentiality: "internal",
    tags: ["policy", "verbal order", "medication"],
  },
  {
    title: "Formulary Brands",
    content:
      "Supra preferred brands: Paracetamol (Calpol/Dolo), Omeprazole (Omez), Amoxicillin (Mox), Metformin (Glycomet).",
    department: "Pharmacy",
    confidentiality: "internal",
    tags: ["formulary", "brands", "pharmacy"],
  },
  {
    title: "Padma Fasting DM",
    content:
      "Mrs. Padma, 62F, Type 2 DM. Observes Ekadashi fasting twice monthly. 3 hypoglycemia episodes in 2025 before protocol adjustment.",
    department: "General Medicine",
    confidentiality: "internal",
    tags: ["padma", "diabetes", "fasting", "medication"],
  },
  {
    title: "Hospital Expansion Plan",
    content:
      "Board-approved: 80 beds by Q4 2027. 85 Cr investment. STRICTLY CONFIDENTIAL — Admin only.",
    department: "Administration",
    confidentiality: "admin_only",
    tags: ["expansion", "budget", "admin", "confidential"],
  },
  {
    title: "Emergency Codes",
    content:
      "Code Blue: cardiac arrest. Code Red: fire. Code Pink: infant abduction. Code Grey: combative patient.",
    department: "General",
    confidentiality: "internal",
    tags: ["emergency", "codes"],
  },
  {
    title: "Antibiotic Stewardship Rule",
    content:
      "Supra admits no IV antibiotics without documented indication and stop-date review at 48 hours. Broad-spectrum antibiotics require consultant approval after 72 hours. Pharmacy audits all unrestricted antibiotic use weekly.",
    department: "General Medicine",
    confidentiality: "internal",
    tags: ["antibiotic", "stewardship", "pharmacy", "infection"],
  },
  {
    title: "Paediatric Fever Rule",
    content:
      "For pediatric febrile patients under 5 years, obtain temperature, pulse, and hydration status before prescribing. Do not use non-prescription cough syrups without documentation of age-appropriate dosing. In suspected sepsis, escalate to ICU review immediately.",
    department: "Paediatrics",
    confidentiality: "internal",
    tags: ["paediatric", "fever", "children", "pediatrics"],
  },
  {
    title: "ICU Delirium Screening",
    content:
      "ICU patients require delirium screening every shift using CAM-ICU. Avoid Benzodiazepine escalation unless clearly justified and consultant-approved. Document sedation goal daily.",
    department: "ICU",
    confidentiality: "internal",
    tags: ["icu", "delirium", "sedation", "cam-icu"],
  },
  {
    title: "Cardiac Medication Safety",
    content:
      "Supra Cardiology uses beta-blocker continuation unless hemodynamically unstable. Do not start NSAIDs in patients with heart failure or recent MI without cardiology review. Always confirm serum creatinine before ACE inhibitor dose increase.",
    department: "Cardiology",
    confidentiality: "internal",
    tags: ["cardiology", "heart", "beta-blocker", "ace inhibitor"],
  },
  {
    title: "Surgery Pre-op Checklist",
    content:
      "All elective surgery patients must have NPO status confirmed, consent signed, medication review complete, and allergy status documented before transfer to OT. Incomplete forms are returned to team by charge nurse.",
    department: "Surgery",
    confidentiality: "internal",
    tags: ["surgery", "pre-op", "checklist", "consent"],
  },
  {
    title: "Medication Reconciliation Rule",
    content:
      "Medication reconciliation must be completed within 24 hours of admission and at discharge. Duplicate anti-diabetics or anticoagulants require pharmacist review before the next dose.",
    department: "General Medicine",
    confidentiality: "internal",
    tags: ["medication", "reconciliation", "discharge", "pharmacy"],
  },
  {
    title: "Nurse Escalation Policy",
    content:
      "Nursing staff must escalate unresolved pain > 7/10, oxygen saturation < 92%, or hypotension to on-call doctor immediately. Document escalation and response time in SBAR format.",
    department: "General",
    confidentiality: "internal",
    tags: ["nurse", "escalation", "sbarr", "pain"],
  },
  {
    title: "Post-Operative Monitoring",
    content:
      "Post-op patients require vitals every 4 hours, drain check every shift, and early mobilization by day 1 unless contraindicated. Any fever >38.5C within 48h triggers assessment for SSI or DVT.",
    department: "Surgery",
    confidentiality: "internal",
    tags: ["post-op", "monitoring", "fever", "surgery"],
  },
  {
    title: "Pharmacy Generic Substitution",
    content:
      "Supra Pharmacy substitutes to the lowest-cost equivalent brand only when the generic has equivalent bioavailability and the doctor has not specifically documented brand preference. Use Calpol/Dolo, Omez, Mox, and Glycomet as default preferred names.",
    department: "Pharmacy",
    confidentiality: "internal",
    tags: ["generic", "pharmacy", "brand", "substitution"],
  },
  {
    title: "Hypoglycemia Response",
    content:
      "If capillary glucose <70 mg/dL in a ward patient, repeat check in 15 minutes after fast-acting carbohydrate, notify the doctor, and document action. Do not delay treatment waiting for formal physician confirmation in symptomatic hypoglycemia.",
    department: "General Medicine",
    confidentiality: "internal",
    tags: ["hypoglycemia", "glucose", "diabetes", "emergency"],
  },
  {
    title: "Warfarin Monitoring",
    content:
      "Warfarin therapy requires INR review at baseline and every 48 hours until stable, then weekly. Avoid NSAIDs, and document diet changes that affect INR such as high-dose vitamin K intake.",
    department: "General Medicine",
    confidentiality: "internal",
    tags: ["warfarin", "inr", "anticoagulant", "monitoring"],
  },
];

export function getDepartmentFromQuestion(question: string): Department | "General" {
  const q = question.toLowerCase();

  if (q.includes("tkr") || q.includes("knee") || q.includes("ortho")) return "Orthopaedics";
  if (q.includes("sepsis") || q.includes("diabetes") || q.includes("padma") || q.includes("fasting")) return "General Medicine";
  if (q.includes("code") || q.includes("cardiac") || q.includes("arrest")) return "General";
  if (q.includes("drug") || q.includes("medication") || q.includes("prescribe") || q.includes("warfarin")) return "General Medicine";
  if (q.includes("dvt") || q.includes("surgery") || q.includes("post-op")) return "Orthopaedics";

  return "General";
}

export function getRelevantSources(question: string, role: Role, department: Department | "General") {
  const q = question.toLowerCase();

  const filtered = hospitalKnowledge.filter((item) => {
    const isRoleAllowed =
      item.confidentiality !== "admin_only" || role === "Admin";

    const keywordMatch =
      item.tags.some((tag) => q.includes(tag)) ||
      item.title.toLowerCase().includes(q) ||
      item.content.toLowerCase().includes(q);

    const departmentMatch =
      item.department === "General" ||
      item.department === department ||
      item.department === "Pharmacy";

    return isRoleAllowed && (keywordMatch || departmentMatch);
  });

  return filtered.slice(0, 4);
}

export function buildSupraAnswer(
  question: string,
  role: Role,
  department: Department | "General",
  sources: KnowledgeItem[]
) {
  const q = question.toLowerCase();

  if (role !== "Admin" && q.includes("budget") && q.includes("ortho")) {
    return "This information is restricted to authorized HOD/Admin staff only. For an approved orthopedic budget review, please escalate to the hospital administration team.";
  }

  if (q.includes("expansion") || q.includes("80 beds") || q.includes("q4 2027")) {
    if (role !== "Admin") {
      return "This is a confidential board-level expansion plan and is restricted to authorized admin users only.";
    }
  }

  if (q.includes("rajan") || q.includes("ibuprofen") || q.includes("diclofenac") || q.includes("aspirin")) {
    return "For patient Rajan, do not prescribe ibuprofen, aspirin, or diclofenac. He has a cardiac stent and dual antiplatelet therapy, and the hospital has documented prior NSAID refusals. Use a non-NSAID alternative and document the refusal clearly. This is a strict safety rule from the Supra drug alert.";
  }

  if (q.includes("post-tkr") || (q.includes("tkr") && q.includes("pain"))) {
    return "For a post-TKR patient, Supra Ortho protocol is Paracetamol 650mg QDS as first-line pain relief. Escalate to Tramadol 50mg if VAS > 6. Avoid NSAIDs at all steps because of surgical bleeding risk. This is the local Supra protocol approved by Dr. Vikram.";
  }

  if (q.includes("dvt") || q.includes("prophylaxis")) {
    return "Start DVT prophylaxis 12 hours post-op: Enoxaparin 40mg SC once daily. Continue for 14 days after TKR and 28 days after THR. This is the standard Supra ortho protocol.";
  }

  if (q.includes("sepsis")) {
    return "Supra Sepsis Bundle v3 requires blood cultures before antibiotics, lactate within 1 hour, 30 mL/kg crystalloid for hypotension, and vasopressors if MAP remains below 65 after fluids.";
  }

  if (q.includes("padma") || q.includes("fasting") || q.includes("diabetes")) {
    return "For Mrs. Padma and other fasting Type 2 DM patients, adjust the insulin timing rather than the dose, skip Glimepiride on fast days, and continue Metformin with the evening meal. This is the local fasting protocol used at Supra.";
  }

  if (q.includes("antibiotic") || q.includes("stewardship") || q.includes("infection")) {
    return "Supra policy requires documented indication and a stop date for IV antibiotics within 48 hours, with consultant review after 72 hours for broad-spectrum therapy. Pharmacy audits unrestricted antibiotic use weekly.";
  }

  if (q.includes("fever") || q.includes("paediatric") || q.includes("pediatric") || q.includes("child")) {
    return "For pediatric febrile patients under 5 years, assess temperature, pulse, hydration, and age-specific dosing before prescribing. In suspected sepsis, escalate immediately to the ICU pathway.";
  }

  if (q.includes("icu") || q.includes("delirium") || q.includes("sedation")) {
    return "ICU patients require delirium screening every shift with CAM-ICU. Benzodiazepine escalation should be avoided unless clearly justified and consultant-approved, and sedation goals must be documented daily.";
  }

  if (q.includes("cardiac") || q.includes("heart") || q.includes("beta") || q.includes("ace inhibitor")) {
    return "Supra Cardiology policy maintains beta-blockers unless the patient is hemodynamically unstable and requires cardiology review before NSAID use in heart failure or recent MI. ACE inhibitor dose adjustments require confirmation of creatinine.";
  }

  if (q.includes("pre-op") || q.includes("surgery") || q.includes("consent") || q.includes("npo")) {
    return "For elective surgery, confirm NPO status, complete informed consent, review medication history, and document allergies before transferring to the operating theatre. Incomplete forms are returned to the team by the charge nurse.";
  }

  if (q.includes("reconciliation") || q.includes("medication reconciliation") || q.includes("discharge")) {
    return "Medication reconciliation must be completed within 24 hours of admission and again at discharge. Duplicate anti-diabetics or anticoagulants must have pharmacist review before the next dose.";
  }

  if (q.includes("hypoglycemia") || q.includes("glucose") || q.includes("low sugar")) {
    return "If capillary glucose is under 70 mg/dL, treat symptomatic hypoglycemia with fast-acting carbohydrate, repeat the check after 15 minutes, notify the doctor, and document the action. Do not delay treatment for formal approval in symptomatic cases.";
  }

  if (q.includes("warfarin") || q.includes("inr")) {
    return "Warfarin requires INR review at baseline and every 48 hours until stable, then weekly. NSAIDs should be avoided, and diet-related INR changes such as high vitamin K intake should be documented.";
  }

  if (sources.length === 0) {
    return "I could not find a strong Supra-specific match for this question. Please ask about a specific hospital protocol, drug rule, or patient safety issue. For restricted admin information, use an authorized admin role.";
  }

  return `Based on Supra Hospital policy, ${sources[0].title} is the closest relevant standard. The local rule states: ${sources[0].content}`;
}

export function buildGenericAnswer(question: string) {
  const q = question.toLowerCase();

  if (q.includes("rajan") || q.includes("ibuprofen") || q.includes("diclofenac") || q.includes("aspirin")) {
    return "For knee pain, consider reviewing the patient’s medication history and avoiding NSAIDs if there is a cardiovascular or bleeding risk. A clinician may choose an alternative based on assessment, and the final drug choice should be individualized.";
  }

  if (q.includes("post-tkr") || (q.includes("tkr") && q.includes("pain"))) {
    return "After knee replacement, pain management often includes acetaminophen and an opioid if needed, while tailoring the plan to the patient’s pain score and bleeding risk. NSAIDs may be used cautiously only if the clinical situation allows it.";
  }

  if (q.includes("dvt") || q.includes("prophylaxis")) {
    return "DVT prophylaxis is commonly started after surgery based on the patient’s risk factors, surgery type, and mobility status. Many protocols use a prophylactic anticoagulant for a set period after major orthopedic surgery.";
  }

  if (q.includes("sepsis")) {
    return "Sepsis treatment generally includes early recognition, cultures, broad-spectrum antibiotics, fluids, and close monitoring of blood pressure and lactate. The exact bundle can vary by institution and local guideline.";
  }

  return "General clinical guidance should be based on the patient’s condition, review of contraindications, and local institutional policy. Always verify formulary, allergy history, and safety checks before prescribing.";
}
