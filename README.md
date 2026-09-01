# Supra Hospital AI Assistant

A hospital-aware clinical assistant prototype for Supra Multi-Specialty Hospital, designed to show role-based access, policy-aware guidance, and restricted admin-only management data.

## Features

- Doctor workspace with clinical AI assistance
- Nurse workspace with ward safety and escalation guidance
- Admin workspace with mock hospital management metrics
- Role-specific login flow and route separation
- Hospital policy-aware comparison between local Supra guidance and generic answers
- Restricted admin access for confidential operational and financial data

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- App Router

## Demo Accounts

- Doctor: `dr.singh` / `supra123`
- Nurse: `nurse.meera` / `supra123`
- Admin: `admin.priya` / `supra123`

## Local Setup

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## Production Notes

This project is a healthcare prototype. It demonstrates role-based access, policy-aware clinical responses, and admin mock management information, but it does not include production-grade hospital security, EHR integration, or live patient data handling.

## Project Structure

```text
src/
  app/
    admin/
    doctor/
    nurse/
    api/answer/
    page.tsx
  components/
    RoleDashboard.tsx
  lib/
    hospitalData.ts
```

## Important Clarification

This is a prototype for demo and evaluation purposes. A real hospital deployment would require enterprise identity, fine-grained authorization, encrypted databases, audit logging, EHR integrations, and approval-driven clinical workflows.
