"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession } from "@/lib/auth";

export async function login(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPass) {
    redirect("/login?error=config");
  }

  if (username === expectedUser && password === expectedPass) {
    await createSession(username);
    redirect("/admin");
  }

  redirect("/login?error=1");
}

export async function logout() {
  await destroySession();
  redirect("/login");
}
