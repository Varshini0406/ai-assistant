# Supra Hospital AI Assistant — Design Document

## 1. Problem

Generic AI tools produce answers that are not grounded in hospital policy, local medication rules, or patient-specific safety constraints. In a healthcare setting, that can lead to unsafe recommendations. Supra Hospital has institutional knowledge built over years, including protocols, drug preferences, and confidentiality rules. A doctor needs an assistant that is not only conversational but also policy-aware and safe.

## 2. Objectives

- Ground every answer in Supra Hospital context
- Difference the result from generic ChatGPT answers
- Protect confidential administrative information
- Support role-aware and department-aware answers
- Make the system usable in a clinical workflow

## 3. Product Scope

The prototype supports healthcare staff who ask routine questions such as:

- What pain medication should be used post-TKR?
- Which drugs are contraindicated for a specific patient?
- What is the local sepsis protocol?
- What is the current DVT prophylaxis policy?

## 4. Architecture

The system is built as a lightweight web application with four layers:

1. Frontend UI
2. API layer
3. Knowledge base
4. Local reasoning and response logic

The frontend is a Next.js app that lets clinicians type a question and view two answer cards:

- Supra Hospital AI answer
- Generic answer

The backend route uses local rules and hospital knowledge to create a clinically grounded answer. It also applies authorization filters so admin-only info is not revealed to unauthorized roles.

## 5. Knowledge Layer

The hospital knowledge is stored as structured records with fields including:

- title
- content
- department
- confidentiality
- tags

This allows the system to match inputs to the most relevant protocol, patient alert, or department rule. For example, a TKR pain question maps to the post-TKR pain protocol and not to a generic analgesia recommendation.

## 6. Security Model

The prototype includes the following security principles:

- Role-based access control
- Confidentiality filtering
- Audit-friendly logging model
- Minimal data exposure to the model
- HTTPS and secure session handling in production

Admin-only items such as hospital expansion and FY2026 orthopaedics budget are blocked for non-admin roles. This is important because hospital confidential planning data should never be exposed casually through a chat interface.

## 7. Why This Is Better Than Raw ChatGPT

A general AI model may suggest NSAIDs after knee surgery without knowing that Supra explicitly avoids NSAIDs due to bleeding risk. It may also miss patient-specific restrictions, such as Rajan’s stent and dual antiplatelet therapy. The Supra system instead prioritizes the institution’s actual protocols and patient safety rules.

## 8. Risks and Challenges

The biggest technical challenge is not generating a response; it is making sure the output is safety-appropriate and context-aware. We also need to avoid prompt-based leakage of restricted information. In production, the system would need stricter classification, access logging, and clinician signoff for high-risk decision support.

## 9. Future Enhancements

If more time were available, the next steps would be:

- Add real hospital identity and login using SSO, MFA, and role-based access federation for doctors, nurses, and admins
- Move from local knowledge files to a production-grade database such as PostgreSQL with encryption at rest and strong backup and recovery policies
- Integrate with real patient EHR systems using standards like HL7 FHIR and restrict access by clinician permission, department, and patient consent
- Add production encryption and audit infrastructure, including TLS, HSM-backed keys, field-level encryption for sensitive patient data, and immutable audit trails for each interaction
- Add semantic retrieval using vector search over a validated clinical knowledge repository
- Add clinical review workflow for high-risk decisions before medication or discharge guidance is finalized
- Add multilingual support for patient-facing communication and staff workflows
- Add policy enforcement for medication safety checks, allergies, contraindications, and dose validation workflows

## 10. Production Architecture Requirements

A real hospital deployment would need a more rigorous architecture than this prototype. The production stack would include:

- Enterprise identity provider with hospital SSO and MFA
- Fine-grained authorization for doctors, nurses, admin staff, and pharmacists
- PostgreSQL or a hardened clinical database with row-level security and encrypted backups
- EHR integration layer with HL7 FHIR or equivalent standards
- Key management system for encryption at rest and in transit
- Complete audit logging for every prompt, answer, user, and data access event
- Data retention, redaction, and privacy controls aligned with healthcare requirements
- Approval workflow before the system acts on medication, discharge, or emergency protocols

## 11. Conclusion

For a hospital, a general-purpose chatbot is not enough. The assistant must be grounded in local policy, role-aware, and protected against confidentiality leaks. This prototype demonstrates that a hospital-specific AI assistant can provide safer and more relevant guidance than generic ChatGPT for the exact clinical questions that matter in practice.
