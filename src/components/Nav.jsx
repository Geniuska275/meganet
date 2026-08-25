import { Link, useLocation } from "react-router-dom";

function Nav() {
  const { pathname } = useLocation();

  return (
    <nav>
      <Link to="/" className={pathname === "/" ? "active" : ""}>Home</Link>
      <Link to="/services" className={pathname === "/services" ? "active" : ""}>Services</Link>
      <Link to="/about" className={pathname === "/about" ? "active" : ""}>About</Link>
      <Link to="/contact" className={pathname === "/contact" ? "active" : ""}>Contact</Link>
    </nav>
  );
}