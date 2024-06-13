import BookEditForm from "../form";
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

export async function GETBook({ params }: { params: { book_id: string } }) {
    const Swal = require('sweetalert2');
    const token = cookies()?.get("token")?.value ?? "";
    const res = await fetch(`http://api-app.test/api/books/${params.book_id}`,
        {
            cache: 'no-store',
            method: 'GET',
            headers: {
                'Authorization': token
            }
        }
    );

    if (res.status === 200) {
        return res.json();
    } else if (res.status === 401) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You are unauthorized!",
            time: 1500,
            timerProgressBar: true
        }).then(() => {
            window.location.href = '/login';
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });    
    }
}

export default async function BookEdit({ params }: { params: { book_id: string } }) {
    const response = await GETBook({ params: { book_id: params.book_id } });
    const book: Book = response.data;

    return (
        <BookEditForm book={book}/>
    );
}
