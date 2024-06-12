"use client";
import { useEffect } from "react";
import LogoutAction from "./logoutaction";

export default function logout() {
  useEffect(() => {
    LogoutAction();
  }, []);
}
