import axios from "axios";
import { useContext, useState } from "react";
import Header from "../../../components/Header";
import { User } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function SignUp(props) {
  // Variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatePassword, setRepeatePassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);
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
      let result = await axios.post("http://127.0.0.1:8000/api/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: repeatePassword,
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
    } catch (error) {
      if (error.response.status === 422 || error.response.status === 401) {
        setEmailError(true);
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
          <h2 className="logo">Welcome!</h2>
          <p className="desc">Sign up to get started.</p>

          <label htmlFor="name">Name </label>
          <input
            type="text"
            id="name"
            placeholder="Taha"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name.length < 2 && accept && (
            <p className="error">Name should be more than 2 letters.</p>
          )}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="taha@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError === true && accept && (
            <p className="error">The email has already been taken.</p>
          )}

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

          <label htmlFor="repeatePassword">Repeat Password</label>
          <input
            type="password"
            id="repeatePassword"
            placeholder="********"
            value={repeatePassword}
            onChange={(e) => setRepeatePassword(e.target.value)}
          />
          {repeatePassword !== password && accept && (
            <p className="error">Password dosn't match.</p>
          )}

          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
