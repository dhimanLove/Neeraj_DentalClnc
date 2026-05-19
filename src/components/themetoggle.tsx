import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const AnimatedThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Check system preference
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setTheme(systemTheme);
      applyTheme(systemTheme);
    }
  }, []);

  const applyTheme = (newTheme: "light" | "dark") => {
    const root = document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) {
    return <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center group border border-gray-200 dark:border-gray-700 hover:scale-105 active:scale-95"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300">
          {theme === "light" ? (
            <Sun size={18} className="text-gray-700 dark:text-gray-300" />
          ) : (
            <Moon size={18} className="text-gray-700 dark:text-gray-300" />
          )}
        </div>
      </div>
    </button>
  );
};

export default AnimatedThemeToggle;