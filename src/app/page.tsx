import authChecker from "./components/authchecker";

async function face() {
  const isLoggedIn = await authChecker();
  if (isLoggedIn) {
    return (
      <div className="grid grid-cols-2 gap-4 place-content-center mt-4">
        <a href="/profile" className="btn btn-primary">Profile</a>
        <a href="/books" className="btn btn-outline btn-primary">Books</a>
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-2 gap-4 place-content-center mt-4">
        <a href="/login" className="btn btn-primary">Login</a>
        <a href="/register" className="btn btn-outline btn-primary">Register</a>
      </div>
    );
  }
}

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-white">
          Welcome to the app!
        </h2>
        {face()}
      </div>
    </div>
  );
}
