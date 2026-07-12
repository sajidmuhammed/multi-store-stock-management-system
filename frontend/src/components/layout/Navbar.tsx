import Button from "../ui/Button";

interface NavbarProps {
  userName: string;
  role: string;
  onLogout: () => void;
}

export default function Navbar({
  userName,
  role,
  onLogout,
}: NavbarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h2 className="text-lg font-semibold">
          Welcome, {userName}
        </h2>

        <p className="text-sm text-gray-500">
          {role}
        </p>
      </div>

      <Button
        variant="outline"
        onClick={onLogout}
      >
        Logout
      </Button>
    </header>
  );
}