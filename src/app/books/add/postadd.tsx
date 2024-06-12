"use server";
import { cookies } from "next/headers";

export default async function addBook(
  isbn: string,
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

  const res = await fetch("http://api-app.test/api/books/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      isbn,
      title,
      subtitle,
      author,
      published,
      publisher,
      pages,
      description,
      website,
    }),
  });
  const responseText = await res.json();
  return { status: res.status, responseText };
}
