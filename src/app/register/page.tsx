'use client';
import { SyntheticEvent, useState } from 'react';

export default function Register() {
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
        const response = await fetch('http://api-app.test/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
        setIsMutating(false);
        const responseData = await response.json();
        if (response.status === 201) {
            clearStateForm();
            Swal.fire({
                title: 'Success',
                text: 'Your account has been registered',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = '/login';
            })
        } else if (response.status === 422) {
            Swal.fire({
                title: 'Oops!',
                text: responseData.errors.username || responseData.errors.password,
                icon: 'error',
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
            })
            clearStateForm();
        } else {
            Swal.fire({
                title: 'Oops!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
            })
            clearStateForm();
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Register your account</h2>
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
                            <button type="submit" className="flex w-full justify-center btn btn-primary">Register</button>
                        ) : (
                            <div className='flex w-full justify-center'>
                                <button type="button" className="mx-auto btn loading">Register</button>
                            </div>
                        )}
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have an account?
                    <a href="/login" className="font-semibold leading-6 text-primary hover:text-indigo-500"> Login</a>
                </p>
            </div>
        </div>
    );


}
