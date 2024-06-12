"use client";
import { SyntheticEvent, useState } from "react";
import editBook from "./postedit";

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

export default function BookEditForm({ book }: { book: Book }) {
  const Swal = require("sweetalert2");
  const id = book.id;
  const [title, setTitle] = useState(book.title);
  const [subtitle, setSubtitle] = useState(book.subtitle);
  const [author, setAuthor] = useState(book.author);
  const [publisher, setPublisher] = useState(book.publisher);
  const [published, setPublished] = useState(book.published);
  const [pages, setPages] = useState(book.pages);
  const [description, setDescription] = useState(book.description);
  const [website, setWebsite] = useState(book.website);
  const [isMutating, setIsMutating] = useState(false);
  const clearStateForm = () => {
    setTitle("");
    setSubtitle("");
    setAuthor("");
    setPublisher("");
    setPublished("");
    setPages(0);
    setDescription("");
    setWebsite("");
  };
  return (
    <div className="m-5">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Book Update Form
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Update existing book.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="title" className="label-text text-white">
                  Book Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input input-bordered input-primary w-full bg-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="subtitle" className="label-text text-white">
                  Subtitle
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="subtitle"
                    id="subtitle"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="input input-bordered input-primary w-full bg-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="author" className="label-text text-white">
                  Author Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="author"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="input input-bordered input-primary w-full bg-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="publisher" className="label-text text-white">
                  Publisher Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="publisher"
                    id="publisher"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    className="input input-bordered input-primary w-full bg-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="published" className="label-text text-white">
                  Published Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="published"
                    id="published"
                    value={published}
                    onChange={(e) => setPublished(e.target.value)}
                    className="input input-bordered input-primary w-full bg-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="pages" className="label-text text-white">
                  Total Pages
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="pages"
                    id="pages"
                    value={pages}
                    onChange={(e) => setPages(Number(e.target.value))}
                    className="input input-bordered input-primary w-full bg-white"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="description" className="label-text text-white">
                  Book Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    className="textarea textarea-bordered textarea-lg textarea-primary w-full bg-white"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="website" className="label-text text-white">
                  Website
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="website"
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="input input-bordered input-primary w-full bg-white"
                  />
                </div>
              </div>

              <div className="col-span-full flex items-center justify-end gap-x-6">
                <a
                  href="/books"
                  onClick={clearStateForm}
                  type="button"
                  className="btn btn-primary btn-outline"
                >
                  Cancel
                </a>
                {!isMutating ? (
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                ) : (
                  <button type="button" className="btn">
                    <span className="loading loading-spinner"></span> Saving...
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);
    const { status, responseText } = await editBook(
      id,
      title,
      subtitle,
      author,
      published,
      publisher,
      pages,
      description,
      website
    );
    setIsMutating(false);
    if (status === 200) {
      clearStateForm();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Book Updated successfully!",
        time: 1500,
        timerProgressBar: true,
      }).then(() => {
        window.location.href = "/books";
      });
    } else if (status === 401) {
      clearStateForm();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You are unauthorized!",
        time: 1500,
        timerProgressBar: true,
      }).then(() => {
        window.location.href = "/login";
      });
    } else if (status === 422) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          responseText.errors.title[0] ||
          responseText.errors.author[0] ||
          responseText.errors.published[0] ||
          responseText.errors.publisher[0] ||
          responseText.errors.pages[0] ||
          responseText.errors.description[0] ||
          responseText.errors.website[0] ||
          responseText.errors.subtitle[0] ||
          "Something went wrong!",
        time: 1500,
        timerProgressBar: true,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }
}
