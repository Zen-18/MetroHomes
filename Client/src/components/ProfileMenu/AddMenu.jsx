import React, { useState } from "react";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";
import AddLawyerModal from "../AddLawyerModal/AddLawyerModal";
import AddLoanModal from "../AddLoanModal/AddLoanModal";
import { Menu } from "@mantine/core";
import { NavLink } from "react-router-dom";

const AddMenu = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [lawyermodalOpened, setLawyerModalOpened] = useState(false);
  const [loanmodalOpened, setLoanModalOpened] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpened((prev) => !prev);
  };

  const handleAddPropertyClick = () => {
    setModalOpened(true);
    setMenuOpened(false);
  };

  const handleAddLawyerClick = () => {
    setLawyerModalOpened(true);
    setMenuOpened(false);
  };

  const handleAddLoanClick = () => {
    setLoanModalOpened(true);
    setMenuOpened(false);
  };

  const handleMenuClose = () => {
    setMenuOpened(false);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          fontSize: "1.3rem",
          width: "5rem",
        }}
        onClick={handleMenuToggle}
      >
        Add
      </div>
      {menuOpened && (
        <Menu
          position="topLeft"
          transition="pop-top-left"
          withArrow
          onClose={handleMenuClose}
        >
          <Menu.Item
            onClick={handleAddPropertyClick}
            style={{ fontSize: "1rem" }}
          >
            Add Property
          </Menu.Item>
          <Menu.Item
            onClick={handleAddLawyerClick}
            style={{ fontSize: "1rem" }}
          >
            Add Lawyer
          </Menu.Item>
          <Menu.Item onClick={handleAddLoanClick} style={{ fontSize: "1rem" }}>
            Add Loans
          </Menu.Item>
        </Menu>
      )}
      <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />
      <AddLawyerModal
        opened={lawyermodalOpened}
        setOpened={setLawyerModalOpened}
      />
      <AddLoanModal opened={loanmodalOpened} setOpened={setLoanModalOpened} />
      <div className="properties-link" style={{ marginLeft: "1rem" }}>
        <NavLink to="/Lawyers">Lawyers</NavLink>
      </div>
    </div>
  );
};

export default AddMenu;
