import axios from "axios";
import { useContext, useState } from "react";
import Header from "../../../components/Header";
import { User } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function SignUp() {
  // Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [error, setError] = useState(false);

  // Navigate
  const nav = useNavigate();

  // Context Variable
  const newUser = useContext(User);

  // Cookies
  const cookie = new Cookies();

  // Submit Function
  async function submit(event) {
    //
    event.preventDefault();
    //
    setAccept(true); // Errors <p> Appear `After` Clicking On Submit Button
    // Send Data
    try {
      let result = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      });
      //------------------------
      const token = result.data.data.token;
      // Cookie ----
      cookie.set("Bearer", token, { path: "/" });
      // Cookie ----
      const userDetails = result.data.data.user;
      newUser.setAuth({ token, userDetails });
      //------------------------
      nav("/dashboard");
    } catch (errorResponse) {
      if (errorResponse.response.status === 401 || errorResponse.response.status === 422) {
        setError(true);
      }
      setAccept(true);
    }
  }
  //
  //TODO Email has already been taken --> appear after correcting it (Problem)
  //
  //
  return (
    <>
      <Header />
      <div className="outside-form">
        <form onSubmit={submit}>
          <h2 className="logo">Hello!</h2>
          <p className="desc">Welcome back, Let's log in.</p>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="taha@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.length < 6 && accept && (
            <p className="error">Password must be more than 6 char.</p>
          )}

          <button type="submit" className="btn">
            Log In
          </button>

          {error === true && accept && (
            <p className="error" style={{ textAlign: "center", marginTop: "10px" }}>
              Wrong Email Or Password.
            </p>
          )}
        </form>
      </div>
    </>
  );
}

export default SignUp;
