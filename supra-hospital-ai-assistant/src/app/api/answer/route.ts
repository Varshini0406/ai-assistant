import { NextResponse } from "next/server";

import {
  buildGenericAnswer,
  buildSupraAnswer,
  getDepartmentFromQuestion,
  getRelevantSources,
  type Role,
} from "@/lib/hospitalData";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const question = typeof body?.question === "string" ? body.question : "";
    const role = (typeof body?.role === "string" ? body.role : "Doctor") as Role;

    if (!question.trim()) {
      return NextResponse.json(
        { error: "Please enter a clinical question." },
        { status: 400 }
      );
    }

    const department = getDepartmentFromQuestion(question);
    const sources = getRelevantSources(question, role, department);
    const supra = buildSupraAnswer(question, role, department, sources);
    const generic = buildGenericAnswer(question);

    return NextResponse.json({
      question,
      role,
      department,
      supra,
      generic,
      sources: sources.map((item) => ({
        title: item.title,
        department: item.department,
        confidentiality: item.confidentiality,
        content: item.content,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}
