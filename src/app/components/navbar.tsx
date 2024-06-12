import authChecker from "./authchecker";
export async function NavItem() {
    if (await authChecker() === false) {
        return [
            { name: "Register", href: "/register" },
            { name: "Login", href: "/login" },
        ];
    } else {
        return [
            { name: "Home", href: "/" },
            { name: "Books", href: "/books" },
            { name: "Profile", href: "/profile" },
        ];
    }
}

export default async function Navbar() {
    const navItems = await NavItem();
    return (
        <div className="navbar bg-base-300">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Client-App</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <a href={`${item.href}`}>{item.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
