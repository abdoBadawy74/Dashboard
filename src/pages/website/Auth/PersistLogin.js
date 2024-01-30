import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../Context/UserContext";
import axios from "axios";
import LoadingScreen from "../../../components/LoadingScreen";
import Cookies from "universal-cookie";

function PersistLogin() {
  // Get Current User
  const context = useContext(User);
  const token = context.auth.token;
  // Cookies
  const cookie = new Cookies();
  const getCookie = cookie.get("Bearer");
  // Loading Screen
  const [loading, setLoading] = useState(true);
  // Send Request To Refresh Token
  useEffect(() => {
    async function refresh() {
      try {
        await axios
          .post(`http://127.0.0.1:8000/api/refresh`, null, {
            headers: {
              Authorization: "Bearer " + getCookie,
            },
          })
          .then((data) => {
            cookie.set("Bearer", data.data.token, { path: "/" });
            context.setAuth((prev) => {
              return { userDetails: data.data.user, token: data.data.token };
            });
          });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    !token ? refresh() : setLoading(false);
  }, []);

  return loading ? <LoadingScreen /> : <Outlet />;
}

export default PersistLogin;
