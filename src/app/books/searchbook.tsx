"use server";
import { cookies } from "next/headers";

type Book = {
  id: number;
  isbn: string;
  title: string;
  subtitle: string;
  author: string;
  published: string;
  publisher: string;
  pages: number;
  description: string;
  website: string;
};

export default async function SearchBook(
  searchTerm: string,
  searchBy: string,
  currentPage: number
) {
  const token = cookies()?.get("token")?.value ?? "";
  const res = await fetch(
      `http://api-app.test/api/books?${searchBy}=${searchTerm}&page=${currentPage}`,
      {
        cache: "no-store",
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );

  if (!res.ok) {
    return { response: res };
  }

  const data = await res.json();
  const books: Book[] = data.data;
  const status = res.status;
  const meta = data.meta;
  return { status, books, meta };
}
