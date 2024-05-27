import React from "react";
import { Container, Modal } from "@mantine/core";
import "./SendPropertyModal.css";

const SendPropertyModal = ({ opened, setOpened }) => {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      <Container h={"40rem"} w={"100%"}>
        <div className="SendDetails">
          {/* Property details */}
          <div className="PropertyDetails">
            <u className="line">For Property Details</u>
            <div className="details">
              - Please provide the exact location of the Property and the
              facilities available in the property (No. of parking space,
              bedroom and bathroom).
            </div>
            <div className="details">
              - Please provide a Clear and High quality Picture of the Property.
            </div>
            <div className="details">
              - Please make sure the Property details are accurate and also
              provide a neighbourhood insight on the property.
            </div>
            <div className="details">
              - Also, Provide a Price for the property you think is suitable.
            </div>
          </div>

          {/* Lawyer details */}
          <div className="LawyerDetails">
            <u>For Lawyer Details</u>
            <div className="details">
              - Please provide your name, qualifications and experience with
              proof if possible.
            </div>
            <div className="details">
              - Please provide a Clear and High Quality Profile Picture of
              yourself.
            </div>
            <div className="details">
              - Please provide the name and location of the law firm you are
              working at or your office.
            </div>
            <div className="details">
              - Please make sure the information regarding the firm and
              qualifications are accurate.
            </div>
          </div>
        </div>
        <div>
          - While providing the information make sure to meet all the
          requirements required.
        </div>
        <div style={{ marginTop: "1rem" }}>
          - After reviewing the provided information, you will be contacted
          before listing it on the website.
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <button className="button">
            <a href="mailto:metrohomes977@gmail.com">Send Us your Details</a>
          </button>
        </div>
      </Container>
    </Modal>
  );
};

export default SendPropertyModal;
