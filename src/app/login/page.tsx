'use client';
import { SyntheticEvent, useState, useEffect } from "react";
import saveToken from "./savetoken";

export default function Login() {
    const Swal = require("sweetalert2");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isMutating, setIsMutating] = useState(false);
    const clearStateForm = () => {
        setUsername("");
        setPassword("");
    };

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        setIsMutating(true);
        const response = await fetch("http://api-app.test/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
        const responseData = await response.json();
        if (response.status === 200) {
            await saveToken(responseData.data.token);
            Swal.fire({
                title: "Success",
                text: "You are now logged in",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                clearStateForm();
                window.location.href = "/books";
            });
        } else if (response.status === 401) {
            Swal.fire({
                title: "Error",
                text: responseData.errors.message,
                icon: "error",
                confirmButtonText: "OK",
            });
            clearStateForm();
        } else {
            Swal.fire({
                title: "Error",
                text: "An error occurred. Please try again later.",
                icon: "error",
                confirmButtonText: "OK",
            });
            clearStateForm();
        }
        setIsMutating(false);
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Log in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="label-text">Username</label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                className="input input-bordered w-full input-primary"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="label-text">Password</label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="input input-bordered w-full input-primary"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        {!isMutating ? (
                            <button type="submit" className="flex w-full justify-center btn btn-primary">Login</button>
                        ) : (
                            <div className='flex w-full justify-center'>
                                <button type="button" className="mx-auto btn loading">Login</button>
                            </div>
                        )}
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Don't have an account yet?
                    <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Register here</a>
                </p>
            </div>
        </div>
    );
}
