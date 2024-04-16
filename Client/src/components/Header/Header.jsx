import React, { useEffect, useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";
import { useLogout } from "../../hooks/useLogout.jsx";
import { useAuthContext } from "../../hooks/useAuthContext.jsx";
import ProfileMenu from "../ProfileMenu/ProfileMenu.jsx";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // State to store isAdmin flag

  const { validateLogin, user, updateUser, state } = useAuthContext();

  useEffect(() => {
    if (user && user.isAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const handleAddPropertyClick = () => {
    setModalOpened(true);
  };

  console.log("user", user);

  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" };
    }
  };

  const { logout } = useLogout();

  const handleClick = () => {
    logout();
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

            <div className="properties-link">
              <NavLink to="/Lawyers">Lawyers</NavLink>
            </div>

            <div className="properties-link">
              <NavLink to="/Loans">Loan Plans</NavLink>
            </div>

            {/* Add property button */}
            {isAdmin && user && (
              <div className="add-property-link">
                <div onClick={handleAddPropertyClick}>Add Property</div>
              </div>
            )}
            <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />

            <div className="contact-link">
              <a href="mailto:sherchankrish2715@gmail.com">Contact</a>
            </div>

            {/* login button */}
            {user ? (
              <div>
                <ProfileMenu user={user} logout={logout} />
              </div>
            ) : (
              <div className="button">
                <Link to="/login">Login</Link>
              </div>
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
