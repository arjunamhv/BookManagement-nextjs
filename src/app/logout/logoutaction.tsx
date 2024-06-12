"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LogoutAction() {
  const token = cookies()?.get("token")?.value ?? "";
  const res = await fetch("http://api-app.test/api/users/logout", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  cookies().delete("token");
  redirect("/login");
}
