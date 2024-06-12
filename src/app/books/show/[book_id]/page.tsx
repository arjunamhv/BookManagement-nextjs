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
async function GET({ params }: { params: { book_id: string } }) {
  const Swal = require("sweetalert2");
  const token = cookies()?.get("token")?.value ?? "";
  const res = await fetch(`http://api-app.test/api/books/${params.book_id}`, {
    cache: "no-store",
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  if (res.status === 200) {
    return res.json();
  } else if (res.status === 401) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You are unauthorized!",
      time: 1500,
      timerProgressBar: true,
    }).then(() => {
      window.location.href = "/login";
    });
  } else {
    throw new Error("Error fetching data: " + res.statusText);
  }
}

export default async function BookDetail({
  params,
}: {
  params: { book_id: string };
}) {
  const response = await GET({ params: { book_id: params.book_id } });
  const book: Book = response.data;
  return (
    <div className="m-10">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-white">
          Book Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Book details.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm font-medium leading-6 text-white">ISBN</p>
            <p className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              {book.isbn}
            </p>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm font-medium leading-6 text-white">Title</p>
            <p className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              {book.title}
            </p>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm font-medium leading-6 text-white">Subtitle</p>
            <p className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              {book.subtitle}
            </p>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm font-medium leading-6 text-white">
              Author Name
            </p>
            <p className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              {book.author}
            </p>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm font-medium leading-6 text-white">
              Published
            </p>
            <p className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              {book.published}
            </p>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm font-medium leading-6 text-white">
              Publisher Name
            </p>
            <p className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              {book.publisher}
            </p>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm font-medium leading-6 text-white">
              Total Pages
            </p>
            <p className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              {book.pages}
            </p>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm font-medium leading-6 text-white">
              Book Description
            </p>
            <p className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              {book.description}
            </p>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm font-medium leading-6 text-white">Website</p>
            <p className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              {book.website}
            </p>
          </div>
          <div></div>
        </dl>
      </div>
    </div>
  );
}
