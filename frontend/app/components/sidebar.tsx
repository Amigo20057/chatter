import { Link } from "react-router";

export default function Sidebar() {
  const navigationLinks: {
    name: string;
    href: string;
  }[] = [
    { name: "Home", href: "/home" },
    { name: "Profile", href: "/profile" },
    { name: "Settings", href: "/settings" },
  ];
  return (
    <div>
      <span>Logo</span>
      {navigationLinks.map((link) => (
        <Link key={link.name} to={link.href}>
          {link.name}
        </Link>
      ))}
    </div>
  );
}
