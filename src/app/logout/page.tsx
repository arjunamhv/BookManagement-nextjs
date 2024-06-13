"use client";
import { useEffect } from "react";
import LogoutAction from "./logoutaction";

export default function Logout() {
  useEffect(() => {
    LogoutAction();
  }, []);
}
