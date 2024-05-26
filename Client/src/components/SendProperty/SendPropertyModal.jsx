import React from "react";
import { Modal } from "@mantine/core";

const SendPropertyModal = ({ opened, setOpened }) => {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      Send Property
    </Modal>
  );
};

export default SendPropertyModal;
