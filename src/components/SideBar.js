import { NavLink } from "react-router-dom";

function SideBar() {
  //
  let items = ["Users", "New User", "Events", "Create Event"];
  let icons = ["fas fa-users", "fas fa-user-plus", "fas fa-boxes", "fas fa-plus-square"];
  let paths = ["users", "user/create", "events", "event/create"];

  //
  return (
    <div className="side-bar">
      {items.map((item, index) => {
        return (
          <NavLink key={index} to={`/dashboard/${paths[index]}`} className="link">
            <i className={icons[index]}></i>
            <span>{item}</span>
          </NavLink>
        );
      })}
    </div>
  );
}

export default SideBar;
