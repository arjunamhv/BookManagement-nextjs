"use server";

import { cookies } from "next/headers";
export default async function changepass(password: string) {
  const token = cookies()?.get("token")?.value ?? "";
  const res = await fetch("http://api-app.test/api/users/current", {
    cache: "no-store",
    method: "PATCH",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });
  const responseText = await res.json();
  
  return { status: res.status, responseText };
}
