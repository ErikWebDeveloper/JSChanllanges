import { Link } from "react-router-dom";
import JSLogo from "@/assets/img/javascript-logo.svg";

export default function Navbar() {
  return (
    <nav className="navbar shadow-sm">
      <div className="container-fluid px-3">
        <Link
          className="navbar-brand d-flex align-items-center gap-2"
          to={"/"}
        >
          <img src={JSLogo} className="img-thumbnail border-0 p-0" width={30} />{" "}
          Challenges
        </Link>
      </div>
    </nav>
  );
}
