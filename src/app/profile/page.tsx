import Profile from "./profile";
import { cookies } from "next/headers";

export default async function User() {
  const Swal = require("sweetalert2");
  const token = cookies()?.get("token")?.value ?? "";
  const res = await fetch("http://api-app.test/api/users/current", {
    cache: "no-store",
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  const responseMessage = await res.json();
  if (res.status === 200) {
    return <Profile user={responseMessage.data.username} />;
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
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
}
