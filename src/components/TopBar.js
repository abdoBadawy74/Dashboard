import { Link } from "react-router-dom";

function TopBar() {
  return (
    <div className="top-bar d-flex">
      <h2 style={{ color: " #0d69d5", fontFamily: "sans-serf" }}>Dashboard</h2>
      <Link to="/" className="btn">
        Go To Web Site
      </Link>
    </div>
  );
}

export default TopBar;
