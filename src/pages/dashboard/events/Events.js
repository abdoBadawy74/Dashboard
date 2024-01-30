import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../website/Context/UserContext";

function Events() {
  //
  const [events, setEvents] = useState([]);
  const [runUseEffect, setRunUseEffect] = useState(0);

  const context = useContext(User);
  const token = context.auth.token;
  //
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => setEvents(data.data))
      .catch((err) => console.log(err));
  }, [runUseEffect]);
  //
  async function deleteProduct(id) {
    try {
      let result = await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`, {
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
  let showData = events.map((product, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{product.title}</td>
      <td>{product.description}</td>
      <td>
        <Link to={`${product.id}`}>
          <i className="fas fa-pen-alt update"></i>
        </Link>
        <i className="fas fa-trash-alt delete" onClick={() => deleteProduct(product.id)}></i>
      </td>
    </tr>
  ));
  //
  //
  //

  const data = window.localStorage.getItem("eventData");
  const eventData = JSON.parse(data);
  console.log(eventData);

  let showEventData = (
    <tr>
      <td>{eventData.id}</td>
      <td>{eventData.nameAr}</td>
      <td>{eventData.nameEn}</td>
      <td>{eventData.descriptionAr}</td>
      <td>{eventData.descriptionEn}</td>
      <td>
        <Link to={`${eventData.id}`}>
          <i className="fas fa-pen-alt update"></i>
        </Link>
        <i className="fas fa-trash-alt delete" onClick={() => deleteProduct(eventData.id)}></i>
      </td>
    </tr>
  );

  //
  //
  //
  return (
    <div className="users">
      <h2 className="title">Events</h2>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Arabic Name</th>
              <th>English Name</th>
              <th>Arabic Desc</th>
              <th>English Desc</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{showEventData}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Events;
