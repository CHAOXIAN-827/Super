import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/practice", label: "Practice", icon: "📖" },
  { to: "/vocabulary", label: "Words", icon: "🔤" },
];

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 no-underline">
            <span className="text-3xl">📚</span>
            <span className="text-xl font-extrabold text-primary-600">
              English Buddy
            </span>
          </NavLink>
          <nav className="flex gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all no-underline ${
                    isActive
                      ? "bg-primary-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                  }`
                }
              >
                <span>{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>
      <footer className="text-center py-4 text-sm text-gray-400">
        English Buddy - Made for young learners
      </footer>
    </div>
  );
}
