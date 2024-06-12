"use server";
import { cookies } from "next/headers";

export default async function deleteBook(id: number) {
  const token = cookies()?.get("token")?.value ?? "";

  const res = await fetch(`http://api-app.test/api/books/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token
    }
  });
  const responseText = await res.json();
  return { status: res.status, responseText };
}
