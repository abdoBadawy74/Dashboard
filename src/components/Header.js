import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

function Header() {
  //
  const cookie = new Cookies();
  const storedToken = cookie.get("Bearer");
  //
  async function handleLogOut() {
    await axios
      .post("http://127.0.0.1:8000/api/logout", null, {
        headers: {
          Authorization: "Bearer " + storedToken,
        },
      })
      .catch((error) => {
        console.log(error);
      });
    cookie.remove("Bearer");
    window.location.pathname = "/";
  }
  //
  //
  return (
    <>
      <div className="header">
        {/* logo */}
        <img src={require("../images/logo.png")} alt="store-logo" width={"120px"} />

        {/* login, register and logout */}

        {storedToken ? (
          <div className="logout">
            <Link to="/dashboard" className="btn">
              Dashboard
            </Link>
            <span className="btn" onClick={handleLogOut}>
              Log Out
            </span>
          </div>
        ) : (
          <div className="login-reg">
            <Link to="/register" className="btn">
              Sign Up
            </Link>
            <Link to="/login" className="btn">
              Log in
            </Link>
          </div>
        )}

        {/* ------ */}
      </div>
    </>
  );
}

export default Header;
