import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { User } from "../../website/Context/UserContext";
import { useNavigate } from "react-router-dom";

function Forms(props) {
  //
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatePassword, setRepeatePassword] = useState("");
  const [accept, setAccept] = useState(false);
  const regEx = /\w+@\w+\.\w+/gi; // Regular Exp for Email Validation
  const [emailError, setEmailError] = useState("");

  // Navigate
  const nav = useNavigate();

  // Context Variable
  const context = useContext(User);
  const token = context.auth.token;
  //
  const id = window.location.pathname.slice(17);
  //
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => result.json())
      .then((data) => {
        setName(data[0].name);
        setEmail(data[0].email);
      });
  }, []);
  //
  // Submit Function
  async function submit(event) {
    //
    event.preventDefault();
    //
    setAccept(true); // Errors <p> Appear `After` Clicking On Submit Button
    // Send Data
    try {
      let result = await axios.post(
        `http://127.0.0.1:8000/api/user/update/${id}`,
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: repeatePassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      nav("/dashboard/users");
    } catch (error) {
      if (error.response.status === 422 || error.response.status === 401) {
        setEmailError(true);
      }
      setAccept(true);
    }
  }
  //
  return (
    <div className="inside-form">
      <form onSubmit={submit}>
        <h2 className="title">Update User</h2>

        <label htmlFor="name">Update Name </label>
        <input
          type="text"
          id="name"
          placeholder="Taha"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {name.length < 2 && accept && <p className="error">Name should be more than 2 letters.</p>}

        <label htmlFor="email">Update Email</label>
        <input
          type="email"
          id="email"
          placeholder="taha@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {regEx.test(email) === false && accept && (
          <p className="error">Write email like this (taha55@gmail.com).</p>
        )}
        {emailError === 422 && accept && <p className="error">The email has already been taken.</p>}

        <label htmlFor="password">Update Password</label>
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

        <label htmlFor="repeatePassword">Repeat Updated Password</label>
        <input
          type="password"
          id="repeatePassword"
          placeholder="********"
          value={repeatePassword}
          onChange={(e) => setRepeatePassword(e.target.value)}
        />
        {repeatePassword !== password && accept && <p className="error">Password dosn't match.</p>}

        <button type="submit" className="btn">
          Update
        </button>
      </form>
    </div>
  );
}

export default Forms;
