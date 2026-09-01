"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type AppRole = "Doctor" | "Nurse" | "Admin";

type UserSession = {
  name: string;
  role: AppRole;
  username: string;
  department: string;
};

const demoQuestions = [
  "What pain medication should I give a post-TKR patient?",
  "Patient Rajan has knee pain, what should I prescribe?",
  "When should I start DVT prophylaxis after surgery?",
  "What’s our sepsis protocol?",
  "Tell me about Mrs. Padma’s medication management",
  "What is the orthopaedics budget for FY2026?",
];

const mockUsers: Array<UserSession & { password: string }> = [
  {
    name: "Dr. Arjun Singh",
    role: "Doctor",
    username: "dr.singh",
    password: "supra123",
    department: "Orthopaedics",
  },
  {
    name: "Nurse Meera Reddy",
    role: "Nurse",
    username: "nurse.meera",
    password: "supra123",
    department: "ICU",
  },
  {
    name: "Admin Priya Nair",
    role: "Admin",
    username: "admin.priya",
    password: "supra123",
    department: "Administration",
  },
];

const tabMap: Record<AppRole, string[]> = {
  Doctor: ["Clinical AI", "Safety Rules", "Departments", "Audit Log"],
  Nurse: ["Clinical AI", "Safety Rules", "Shift Handover"],
  Admin: ["Clinical AI", "Safety Rules", "Finance", "Audit Log"],
};

const restrictedAdminCopy =
  "This section is restricted to authorized administrative users only.";

export default function Home() {
  const router = useRouter();
  const [session, setSession] = useState<UserSession | null>(null);
  const [activeTab, setActiveTab] = useState("Clinical AI");
  const [username, setUsername] = useState("dr.singh");
  const [password, setPassword] = useState("supra123");
  const [role, setRole] = useState<AppRole>("Doctor");
  const [loginError, setLoginError] = useState("");
  const [question, setQuestion] = useState(demoQuestions[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const savedSession = window.localStorage.getItem("supra-hospital-session");
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession) as UserSession;
        setSession(parsed);
        router.replace(`/${parsed.role.toLowerCase()}`);
      } catch {
        window.localStorage.removeItem("supra-hospital-session");
      }
    }
  }, [router]);

  useEffect(() => {
    if (session) {
      window.localStorage.setItem("supra-hospital-session", JSON.stringify(session));
    }
  }, [session]);

  const visibleTabs = useMemo(() => {
    if (!session) return tabMap.Doctor;
    return tabMap[session.role];
  }, [session]);

  const login = (event: React.FormEvent) => {
    event.preventDefault();

    const user = mockUsers.find(
      (entry) =>
        entry.username === username.trim() &&
        entry.password === password.trim() &&
        entry.role === role
    );

    if (!user) {
      setLoginError("Invalid credentials for the selected role. Use the demo accounts below.");
      return;
    }

    const safeSession = {
      name: user.name,
      role: user.role,
      username: user.username,
      department: user.department,
    };

    window.localStorage.setItem("supra-hospital-session", JSON.stringify(safeSession));
    setSession(safeSession);
    setActiveTab("Clinical AI");
    setLoginError("");
    setResult(null);
    router.push(`/${safeSession.role.toLowerCase()}`);
  };

  const logout = () => {
    setSession(null);
    window.localStorage.removeItem("supra-hospital-session");
    setResult(null);
    setQuestion(demoQuestions[0]);
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

  const renderAdminOnlyContent = () => {
    if (session?.role !== "Admin") {
      return (
        <div className="rounded-[24px] border border-[var(--border)] bg-[var(--panel)] p-5 text-[var(--text)]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Access control</p>
          <h3 className="mt-2 text-xl font-bold">Restricted admin data</h3>
          <p className="mt-3 leading-7 text-[var(--muted)]">{restrictedAdminCopy}</p>
        </div>
      );
    }

    return (
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { title: "Orthopaedics Budget FY2026", value: "4.2 Cr", detail: "Implants 45%, staffing 30%, equipment 15%" },
          { title: "Hospital Expansion Plan", value: "80 beds", detail: "Board-approved Q4 2027 with 85 Cr capital outlay" },
          { title: "Audit Events", value: "1,248", detail: "Prompt, approval, and access actions logged this month" },
          { title: "Retention Policy", value: "Active", detail: "Data retention and redaction controls aligned with policy" },
        ].map((item) => (
          <div key={item.title} className="rounded-[22px] border border-[var(--border)] bg-[var(--panel)] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">{item.title}</p>
            <p className="mt-3 text-3xl font-bold text-[var(--text)]">{item.value}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.detail}</p>
          </div>
        ))}
      </div>
    );
  };

  if (!session) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-4 py-8 text-[var(--text)] md:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
          <div className="grid w-full overflow-hidden rounded-[30px] border border-[var(--border)] bg-white/60 shadow-[0_25px_50px_rgba(60,95,125,0.08)] backdrop-blur-sm md:grid-cols-[1.1fr_0.9fr]">
            <div className="bg-[var(--background-soft)] p-8 md:p-10">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--primary-dark))] text-sm font-bold text-white">
                  S
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">Supra</p>
                  <p className="text-xl font-bold">Clinical Access</p>
                </div>
              </div>

              <h1 className="mt-8 text-4xl font-bold leading-tight">
                Secure hospital assistant access.
              </h1>
              <p className="mt-4 max-w-md text-base leading-7 text-[var(--muted)]">
                Sign in to check clinical guidance, safety rules, and department protocols with role-aware access controls.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Doctor access to clinical guidance",
                  "Nurse access to ward safety protocols",
                  "Admin access to restricted board data",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-white/70 p-3">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />
                    <span className="text-sm text-[var(--text)]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[24px] border border-[var(--border)] bg-white/60 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Demo accounts</p>
                <div className="mt-3 space-y-2 text-sm text-[var(--text)]">
                  <div><span className="font-semibold">Doctor:</span> dr.singh / supra123</div>
                  <div><span className="font-semibold">Nurse:</span> nurse.meera / supra123</div>
                  <div><span className="font-semibold">Admin:</span> admin.priya / supra123</div>
                </div>
              </div>
            </div>

            <div className="bg-white/70 p-8 md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--muted)]">Login</p>
              <h2 className="mt-3 text-3xl font-bold">Supra Hospital</h2>

              <form onSubmit={login} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--muted)]">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as AppRole)}
                    className="w-full rounded-2xl border border-[var(--border)] bg-[var(--panel)] px-4 py-3 text-[var(--text)] outline-none"
                  >
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--muted)]">Username</label>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-2xl border border-[var(--border)] bg-[var(--panel)] px-4 py-3 text-[var(--text)] outline-none"
                    placeholder="Enter username"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--muted)]">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-[var(--border)] bg-[var(--panel)] px-4 py-3 text-[var(--text)] outline-none"
                    placeholder="Enter password"
                  />
                </div>

                {loginError && <p className="text-sm text-red-600">{loginError}</p>}

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--primary-dark))] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(35,70,103,0.25)] transition hover:brightness-105"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    );
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
                <h1 className="mt-1 text-2xl font-bold md:text-3xl">Clinical Workspace</h1>
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
              {visibleTabs.map((tab) => (
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
                    {demoQuestions.map((item) => (
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

            {activeTab === "Safety Rules" && (
              <div className="rounded-[28px] border border-[var(--border)] bg-white/60 p-5 shadow-[0_20px_40px_rgba(60,95,125,0.08)] md:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Clinical safety</p>
                <h3 className="mt-2 text-2xl font-bold">Role-based safety rules</h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "Avoid NSAIDs in post-TKR and high-bleeding-risk patients.",
                    "Document verbal medication changes and escalate within one hour.",
                    "DVT prophylaxis begins 12 hours post-op for orthopedic patients.",
                    "ICU delirium screening and sedation documentation are mandatory.",
                    "Admin-only financial and expansion plans remain hidden from clinical staff.",
                    "Critical medication rules are enforced before triage and discharge.",
                  ].map((item) => (
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

            {activeTab === "Finance" && renderAdminOnlyContent()}

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
