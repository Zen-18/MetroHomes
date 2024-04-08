import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";
import useAuthCheck from "../../hooks/useAuthCheck.jsx";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const validateLogin = useAuthCheck();
  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalOpened(true);
    }
  };

  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" };
    }
  };

  return (
    <section className="h-wrapper">
      <div className="h-container flexCenter paddings innerWidth">
        <Link to="/">
          <img src="./J.png" alt="Logo" width={210} />
        </Link>

        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div
            className="h-menu flexCenter Text"
            style={getMenuStyles(menuOpened)}
          >
            <div className="properties-link">
              <NavLink to="/properties">Properties</NavLink>
            </div>

            {/* Add property button */}
            <div className="add-property-link">
              <div onClick={handleAddPropertyClick}>Add Property</div>
            </div>
            <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />

            <div className="contact-link">
              <a href="mailto:sherchankrish2715@gmail.com">Contact</a>
            </div>

            {/* login button */}
            {!isAuthenticated ? (
              <button className="button" onClick={loginWithRedirect}>
                Login
              </button>
            ) : (
              <ProfileMenu user={user} logout={logout} />
            )}
          </div>
        </OutsideClickHandler>

        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
