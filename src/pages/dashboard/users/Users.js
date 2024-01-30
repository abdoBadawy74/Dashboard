/************ Details ***********
 * @token (users) ---> "http://127.0.0.1:8000/api/user/show"
 * @token (user-id) -> `http://127.0.0.1:8000/api/user/delete/${id}`
 *
 ********************************
 */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../website/Context/UserContext";

function Users() {
  //
  const [users, setUsers] = useState([]);
  const [runUseEffect, setRunUseEffect] = useState(0);

  const context = useContext(User);
  const token = context.auth.token;
  //
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, [runUseEffect]);
  //
  async function deleteUser(id) {
    try {
      let result = await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (result.status === 200) {
        setRunUseEffect((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }
  //
  let showData = users.map((user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <Link to={`${user.id}`}>
          <i className="fas fa-pen-alt update"></i>
        </Link>
        <i className="fas fa-trash-alt delete" onClick={() => deleteUser(user.id)}></i>
      </td>
    </tr>
  ));
  //
  return (
    <div className="users">
      <h2 className="title">Users</h2>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{showData}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
