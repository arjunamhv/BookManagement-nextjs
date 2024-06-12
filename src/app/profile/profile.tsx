"use client";

import { SyntheticEvent, useState } from "react";
import changepass from "./changepass";
export default function Profile({ user }: { user: any }) {
  const Swal = require("sweetalert2");

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [password, setPassword] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);
    const { status, responseText } = await changepass(password);
    setIsMutating(false);
    if (status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password changed successfully!",
      }).then(() => {
        window.location.reload();
      });
    } else if (status === 401) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You are unauthorized!",
      }).then(() => {
        window.location.href = "/login";
      });
    } else if (status === 422) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: responseText.errors.password[0],
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }
  return (
    <div className="m-10">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-white">
          User Profile Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm font-medium leading-6 text-white">Username</p>
            <p className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              {user}
            </p>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <p className="text-sm font-medium leading-6 text-white">Password</p>
            <a
              className="link mt-1 text-gray-400 sm:col-span-2 sm:mt-0"
              tabIndex={0}
              onClick={toggleCollapse}
            >
              Change password
            </a>
          </div>
          <div></div>
          {!isCollapsed && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <p className="text-sm font-medium leading-6 text-white">
                New Password
              </p>
              <input
                className="mt-1 sm:col-span-2 sm:mt-0 input input-sm input-bordered"
                type="text"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isMutating ? (
                <button
                  onClick={handleSubmit}
                  className="btn btn-sm  sm:col-span-3"
                >
                  Change
                </button>
              ) : (
                <div className="flex justify-center sm:col-span-3">
                  <button type="button" className="btn loading" disabled>
                    loading ...
                  </button>
                </div>
              )}
            </div>
          )}
        </dl>
      </div>
      <div className="flex justify-end mt-2">
        <a href="/logout" className="btn btn-error">
          Logout
        </a>
      </div>
    </div>
  );
}
