import { NavLink } from "react-router-dom";
import logo from "../../images/icons/logo.png";
import headerImage from "../../images/header.png";
import { useContext } from "react";
import { LoggedUserContext } from "../../App";
import { auth } from "../../firebase.init";
import { signOut } from "firebase/auth";

const Header = () => {
  const [loggedUser, setLoggedUser, , setMessage] =
    useContext(LoggedUserContext);
  const activeStyle = { borderBottom: "2px solid white" };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        const newMessage = {
          isOpen: true,
          text: "Logout successful!",
          type: "success",
        };
        setMessage(newMessage);
        setLoggedUser({});
      })
      .catch((error) => {
        const newMessage = { isOpen: true, text: error.code, type: "error" };
        setMessage(newMessage);
      });
  };
  return (
    <header
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3) ), url(${headerImage})`,
      }}
    >
      <img src={logo} alt="logo" width={75} />
      <nav>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          {" "}
          Home
        </NavLink>
        <NavLink
          to="/booking"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Book
        </NavLink>
        {loggedUser.username ? (
          <NavLink onClick={handleLogout}>Logout</NavLink>
        ) : (
          <NavLink
            to="/login"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Login
          </NavLink>
        )}
      </nav>
      <div>
        <h1>Hotel Royal</h1>
        <b>The Global Icon Of Luxury</b>
      </div>
    </header>
  );
};

export default Header;
