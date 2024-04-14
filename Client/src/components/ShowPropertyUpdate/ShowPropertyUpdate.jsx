import React, { useState } from "react";
import { Container, Modal, Stepper } from "@mantine/core";
import { useAuthContext } from "../../hooks/useAuthContext";

const ShowUpdateModal = ({ opened, setOpened }) => {
  const [active, setActive] = useState(0);
  const handleClose = () => {
    setOpened(false);
  };
};

export default ShowUpdateModal;
