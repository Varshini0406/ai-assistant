"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type AppRole = "Doctor" | "Nurse" | "Admin";

type SessionUser = {
  name: string;
  role: AppRole;
  username: string;
  department: string;
};

const demoQuestions: Record<AppRole, string[]> = {
  Doctor: [
    "What pain medication should I give a post-TKR patient?",
    "Patient Rajan has knee pain, what should I prescribe?",
    "When should I start DVT prophylaxis after surgery?",
    "What’s our sepsis protocol?",
  ],
  Nurse: [
    "What is the escalation policy for oxygen saturation below 92%?",
    "What should I document in a nursing handover?",
    "What are the DVT prophylaxis steps for post-op ward patients?",
    "When should I escalate a pain score above 7/10?",
  ],
  Admin: [
    "Show the FY2026 orthopaedics budget summary.",
    "What is the planned hospital expansion for Q4 2027?",
    "Show the last audit events and retention status.",
  ],
};

const adminMetrics = [
  { title: "Orthopaedics Budget FY2026", value: "4.2 Cr", detail: "Implants 45%, staffing 30%, equipment 15%" },
  { title: "Hospital Expansion Plan", value: "80 beds", detail: "Board-approved Q4 2027 with 85 Cr capital outlay" },
  { title: "Audit Events", value: "1,248", detail: "Prompt, approval, and access actions logged this month" },
  { title: "Retention Status", value: "Active", detail: "Data retention and redaction controls aligned with policy" },
];

export function RoleDashboard({ role }: { role: AppRole }) {
  const router = useRouter();
  const [session, setSession] = useState<SessionUser | null>(null);
  const [question, setQuestion] = useState(demoQuestions[role][0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("Clinical AI");

  useEffect(() => {
    const stored = window.localStorage.getItem("supra-hospital-session");
    if (!stored) {
      router.replace("/");
      return;
    }

    try {
      const parsed = JSON.parse(stored) as SessionUser;
      if (parsed.role !== role) {
        router.replace(`/${parsed.role.toLowerCase()}`);
        return;
      }
      setSession(parsed);
    } catch {
      window.localStorage.removeItem("supra-hospital-session");
      router.replace("/");
    }
  }, [role, router]);

  const tabs = useMemo(() => {
    if (role === "Doctor") return ["Clinical AI", "Safety Rules", "Departments", "Audit Log"];
    if (role === "Nurse") return ["Clinical AI", "Safety Rules", "Shift Handover", "Audit Log"];
    return ["Management", "Safety Rules", "Audit Log", "Finance"]; 
  }, [role]);

  const logout = () => {
    window.localStorage.removeItem("supra-hospital-session");
    router.push("/");
  };

  const askQuestion = async () => {
    if (!session) return;
    setLoading(true);
    try {
      const response = await fetch("/api/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, role: session.role }),
      });
      const data = await response.json();
      setResult(data);
    } catch {
      setResult({ error: "Something went wrong while fetching the response." });
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return <div className="min-h-screen bg-[var(--background)]" />;
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-6 text-[var(--text)] md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[28px] border border-[var(--border)] bg-white/60 p-5 shadow-[0_20px_40px_rgba(60,95,125,0.08)] backdrop-blur-sm md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--primary-dark))] text-sm font-bold text-white">
                S
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Supra Multi-Specialty Hospital</p>
                <h1 className="mt-1 text-2xl font-bold md:text-3xl">{role} Workspace</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-sm font-medium text-[var(--text)]">
                {session.role}
              </span>
              <button
                onClick={logout}
                className="rounded-full border border-[var(--border)] bg-white px-3 py-2 text-sm font-medium text-[var(--text)]"
              >
                Sign out
              </button>
            </div>
          </div>
        </header>

        <div className="mt-6 grid gap-6 xl:grid-cols-[240px_1fr]">
          <aside className="rounded-[28px] border border-[var(--border)] bg-white/60 p-4 shadow-[0_18px_30px_rgba(60,95,125,0.06)]">
            <div className="mb-5">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Signed in</p>
              <p className="mt-2 text-lg font-bold">{session.name}</p>
              <p className="text-sm text-[var(--muted)]">{session.department}</p>
            </div>

            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full rounded-2xl px-3 py-2 text-left text-sm font-medium transition ${
                    activeTab === tab
                      ? "bg-[var(--background-soft)] text-[var(--text)]"
                      : "text-[var(--muted)] hover:bg-[var(--panel)]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </aside>

          <section className="space-y-6">
            {activeTab === "Clinical AI" && (
              <>
                <div className="rounded-[28px] border border-[var(--border)] bg-white/60 p-5 shadow-[0_20px_40px_rgba(60,95,125,0.08)] md:p-6">
                  <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Assistant</p>
                      <h2 className="mt-1 text-2xl font-bold">Clinical question</h2>
                    </div>
                    <div className="rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--text)]">
                      Role: {session.role}
                    </div>
                  </div>

                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={5}
                    className="w-full rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4 text-base text-[var(--text)] shadow-inner outline-none placeholder:text-[var(--muted)]"
                    placeholder="Ask the hospital assistant..."
                  />

                  <div className="mt-5 flex flex-wrap gap-2">
                    {demoQuestions[role].map((item) => (
                      <button
                        key={item}
                        onClick={() => setQuestion(item)}
                        className="rounded-full border border-[var(--primary-soft)] bg-[var(--background-soft)] px-3 py-1.5 text-xs font-medium text-[var(--text)] transition hover:border-[var(--primary)]"
                      >
                        {item.length > 34 ? item.slice(0, 34) + "..." : item}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={askQuestion}
                    disabled={loading}
                    className="mt-6 w-full rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--primary-dark))] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(35,70,103,0.25)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Checking hospital protocol..." : "Ask Supra AI"}
                  </button>
                </div>

                {result && (
                  <div className="grid gap-6 xl:grid-cols-2">
                    <div className="rounded-[28px] border border-emerald-200 bg-[#edfaf3] p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Supra AI</p>
                        <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                          hospital-aware
                        </span>
                      </div>
                      <div className="rounded-2xl border border-emerald-200 bg-white p-4 text-sm leading-7 text-[var(--text)]">
                        {result.error ? <p className="text-red-600">{result.error}</p> : <p>{result.supra}</p>}
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-amber-200 bg-[#fff8ee] p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Generic answer</p>
                        <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700">
                          baseline model
                        </span>
                      </div>
                      <div className="rounded-2xl border border-amber-200 bg-white p-4 text-sm leading-7 text-[var(--text)]">
                        {result.error ? <p className="text-red-600">{result.error}</p> : <p>{result.generic}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {result && result.sources && result.sources.length > 0 && (
                  <div className="rounded-[28px] border border-[var(--border)] bg-white/60 p-5 shadow-[0_20px_40px_rgba(60,95,125,0.08)] md:p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Matched sources</p>
                    <h3 className="mt-2 text-xl font-bold">Supra institutional evidence</h3>
                    <div className="mt-5 grid gap-4 lg:grid-cols-2">
                      {result.sources.map((source: any) => (
                        <div key={source.title} className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4">
                          <div className="mb-2 flex items-center justify-between gap-2">
                            <p className="font-semibold text-[var(--text)]">{source.title}</p>
                            <span className="rounded-full bg-[var(--background-soft)] px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                              {source.confidentiality}
                            </span>
                          </div>
                          <p className="text-sm leading-6 text-[var(--muted)]">{source.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {(activeTab === "Safety Rules" || activeTab === "Management") && (
              <div className="rounded-[28px] border border-[var(--border)] bg-white/60 p-5 shadow-[0_20px_40px_rgba(60,95,125,0.08)] md:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Clinical safety</p>
                <h3 className="mt-2 text-2xl font-bold">Role-aware safety rules</h3>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {(role === "Admin"
                    ? [
                        "Admin-only budget and expansion data are protected behind role checks.",
                        "Restricted plans are visible only to authorized admin users.",
                        "All sensitive record access is tracked in the audit log.",
                        "Approval workflows are required before action on high-risk decisions.",
                      ]
                    : [
                        "Avoid NSAIDs in post-TKR and high-bleeding-risk patients.",
                        "Document verbal medication changes and escalate within one hour.",
                        "DVT prophylaxis begins 12 hours post-op for orthopedic patients.",
                        "ICU delirium screening and sedation documentation are mandatory.",
                      ])
                    .map((item) => (
                      <div key={item} className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4 text-sm leading-7 text-[var(--text)]">
                        {item}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {activeTab === "Departments" && (
              <div className="rounded-[28px] border border-[var(--border)] bg-white/60 p-5 shadow-[0_20px_40px_rgba(60,95,125,0.08)] md:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Coverage</p>
                <h3 className="mt-2 text-2xl font-bold">Department protocols</h3>
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {[
                    "Orthopaedics",
                    "General Medicine",
                    "Cardiology",
                    "Paediatrics",
                    "ICU",
                    "Surgery",
                    "Pharmacy",
                  ].map((department) => (
                    <div key={department} className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4">
                      <p className="text-sm font-semibold text-[var(--text)]">{department}</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Local policy set and clinical safety checks available.</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Audit Log" && (
              <div className="rounded-[28px] border border-[var(--border)] bg-white/60 p-5 shadow-[0_20px_40px_rgba(60,95,125,0.08)] md:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Compliance</p>
                <h3 className="mt-2 text-2xl font-bold">Access and approval log</h3>
                <div className="mt-5 space-y-3">
                  {[
                    "12:40 PM — Doctor reviewed post-TKR pain guidance.",
                    "13:10 PM — Nurse escalated oxygen saturation alert.",
                    "14:05 PM — Admin opened restricted FY2026 budget review.",
                    "15:30 PM — DVT prophylaxis policy was matched to a surgical case.",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4 text-sm text-[var(--text)]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Finance" && (
              <div className="grid gap-4 md:grid-cols-2">
                {adminMetrics.map((item) => (
                  <div key={item.title} className="rounded-[24px] border border-[var(--border)] bg-[var(--panel)] p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">{item.title}</p>
                    <p className="mt-3 text-3xl font-bold text-[var(--text)]">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.detail}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Shift Handover" && (
              <div className="rounded-[28px] border border-[var(--border)] bg-white/60 p-5 shadow-[0_20px_40px_rgba(60,95,125,0.08)] md:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Ward workflow</p>
                <h3 className="mt-2 text-2xl font-bold">Night handover checklist</h3>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--text)]">
                  <li>• Pending labs and abnormal vitals reviewed.</li>
                  <li>• New admissions in the last four hours checked.</li>
                  <li>• Morning surgery list confirmed and escalated where necessary.</li>
                  <li>• Patient escalation and SBAR summary documented before shift close.</li>
                </ul>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
