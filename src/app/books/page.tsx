"use client";
import { useState, useEffect, SyntheticEvent } from "react";
import { FaRegEye, FaRegEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import deleteBook from "./deletebook";
import GETBook from "./getbook";
import Pagination from "../components/pagination";
import SearchBook from "./searchbook";

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

export default function Books() {
  const Swal = require("sweetalert2");
  const [booksdata, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [isMutating, setIsMutating] = useState(false);
  useEffect(() => {
    if (searchTerm === "") {
      fetchData();
    } else {
      handleSearch;
    }
  }, [currentPage]);
  async function fetchData() {
    const { status, books, meta } = await GETBook(currentPage);
    if (status === 200 && books) {
      setBooks(books);
      setCurrentPage(meta.current_page);
      setLastPage(meta.last_page);
      setTotal(meta.total);
    } else if (status === 401) {
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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }
  async function handleSearch(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);
    setCurrentPage(1);
    const { status, books, meta } = await SearchBook(
      searchTerm,
      searchBy,
      currentPage
    );
    setIsMutating(false);
    if (status === 200 && books) {
      setBooks(books);
      setCurrentPage(meta.current_page);
      setLastPage(meta.last_page);
      setTotal(meta.total);
    } else if (status === 401) {
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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }

  async function handleDelete(id: number) {
    setIsMutating(true);
    const response = await deleteBook(id);
    setIsMutating(false);
    if (response.status === 200) {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Book deleted successfully",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete book!",
      });
    }
  }

  return (
    <div className="overflow-y-auto m-5">
      <div className="flex justify-between my-4">
        <a href="/books/add" className="btn btn-sm">
          <FaPlus /> Add New Book
        </a>
        <div className="join">
          <div>
            <div>
              <input
                name="searchTerm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered join-item"
                placeholder="Search"
              />
            </div>
          </div>
          <select
            name="searchBy"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            className="select select-bordered join-item"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="publisher">Publisher</option>
          </select>
          {!isMutating ? (
            <button onClick={handleSearch} className="btn join-item">
              Search
            </button>
          ) : (
            <button className="btn join-item">
              <span className="loading loading-spinner"></span>Loading...
            </button>
          )}
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {booksdata.map((book: Book, index: number) => (
            <tr key={book.id}>
              <td>{(currentPage - 1) * 10 + index + 1}</td>
              <td>{book.isbn}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>
                <div className="flex gap-2">
                  <a href={`/books/show/${book.id}`} className="btn btn-sm">
                    <FaRegEye />
                  </a>
                  <a href={`/books/edit/${book.id}`} className="btn btn-sm">
                    <FaRegEdit />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDelete(book.id)}
                    className="btn btn-sm"
                  >
                    <BsTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {total > 10 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isMutating={isMutating}
          lastPage={lastPage}
        />
      )}
    </div>
  );
}
