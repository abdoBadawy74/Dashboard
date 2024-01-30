//////////////////////
import { Route, Routes } from "react-router-dom";
// 1- Auth
import UserRegister from "./pages/website/Auth/UserRegister";
import Login from "./pages/website/Auth/Login";
// 2- Website

// 3- Dashboard
import Dashboard from "./pages/dashboard/Dashboard";
// 4- Component For Protected Routes
import RequireAuth from "./pages/website/Auth/RequireAuth";
// 5- Events
import Events from "./pages/dashboard/events/Events";
import CreateEvent from "./pages/dashboard/events/CreateEvent";
import UpdateProduct from "./pages/dashboard/events/UpdateEvent";
// 4- Users
import Users from "./pages/dashboard/users/Users";
import UpdateUser from "./pages/dashboard/users/UpdateUser";
import CreateUser from "./pages/dashboard/users/CreateUser";
// n- CSS
import "./style.css";
import "./all.min.css";
import PersistLogin from "./pages/website/Auth/PersistLogin";
//////////////////////

function App() {
  //
  return (
    <>
      <Routes>
        {/* ----- Public Routes ----- */}
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<Login />} />

        {/* ----- Protected Routes ----- */}
        {/* <Route element={<PersistLogin />}> */}
        {/* <Route element={<RequireAuth />}> */}
        <Route path="" element={<Dashboard />}/>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="users" element={<Users />} />
          <Route path="user/create" element={<CreateUser />} />
          <Route path="users/:id" element={<UpdateUser />} />
          <Route path="events" element={<Events />} />
          <Route path="event/create" element={<CreateEvent />} />
          <Route path="products/:id" element={<UpdateProduct />} />
        </Route>
        {/* </Route> */}
        {/* </Route> */}
      </Routes>
    </>
  );
}

export default App;
