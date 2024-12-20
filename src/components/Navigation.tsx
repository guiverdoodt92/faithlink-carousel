import { Home, Users, Video, Radio, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home" },
  { icon: Users, label: "Community" },
  { icon: Video, label: "Shorts" },
  { icon: Radio, label: "Live" },
  { icon: BookOpen, label: "Devotionals" },
];

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 px-4 py-2 sm:top-0 sm:bottom-auto">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        {navItems.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className={cn(
              "flex flex-col items-center p-2 text-gray-600 hover:text-gray-900",
              "transition-colors duration-200"
            )}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};