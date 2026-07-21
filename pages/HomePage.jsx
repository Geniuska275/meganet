import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress =
        (window.scrollY / totalHeight) * 100;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav className="navbar">
        My Navbar
      </nav>

      <main>
        {/* Your page content */}
      </main>
    </>
  );
}