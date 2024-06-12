"use server";
import { cookies } from "next/headers";

export default async function editBook(
  id: number,
  title: string,
  subtitle: string,
  author: string,
  published: string,
  publisher: string,
  pages: number,
  description: string,
  website: string
) {
  const token = cookies()?.get("token")?.value ?? "";

  const res = await fetch(`http://api-app.test/api/books/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      title: title,
      subtitle: subtitle,
      author: author,
      published: published,
      publisher: publisher,
      pages: pages,
      description: description,
      website: website,
    }),
  });
  const responseText = await res.json();
  return { status: res.status, responseText };
}
