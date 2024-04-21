import React, { useEffect, useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout.jsx";
import { useAuthContext } from "../../hooks/useAuthContext.jsx";
import ProfileMenu from "../ProfileMenu/ProfileMenu.jsx";
import AddMenu from "../ProfileMenu/AddMenu.jsx";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // State to store isAdmin flag

  const { validateLogin, user, updateUser, state } = useAuthContext();

  useEffect(() => {
    if (user && user.isAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

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
            {isAdmin && user && <AddMenu user={user} />}
            <div className="properties-link">
              <NavLink to="/properties">Properties</NavLink>
            </div>
            <div className="properties-link">
              <NavLink to="/Loans">Loan Plans</NavLink>
            </div>
            <div></div>

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
