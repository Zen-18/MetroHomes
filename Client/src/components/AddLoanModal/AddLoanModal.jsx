import { Container, Modal, Stepper } from "@mantine/core";
import React, { useState } from "react";
import AddLoanBank from "../AddLoanBank/AddLoanBank";
import AddLoanDetails from "../BasicDetails/AddLoanDetails";

const AddLoanModal = ({ opened, setOpened }) => {
  const [active, setActive] = useState(0);
  const [loanDetails, setLoanDetails] = useState({
    bank: "",
    description: "",
    interestRate: 0,
    terms: "",
    Address: "",
    contactInfo: "",
    email: "",
  });

  const nextStep = () => {
    setActive((current) => (current < 2 ? current + 1 : current));
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      <Container h={"45rem"} w={"100%"}>
        <Stepper
          active={active}
          onStepClick={setActive}
          allowNextStepsSelect={false}
        >
          <Stepper.Step
            label="Bank Information"
            description="Insert bank Information"
          >
            <AddLoanBank
              nextStep={nextStep} // Corrected prop name
              loanDetails={loanDetails}
              setLoanDetails={setLoanDetails} // Corrected prop name
            />
          </Stepper.Step>
          <Stepper.Step
            label="Plan Information"
            description="Insert Loan Plan Information"
          >
            <AddLoanDetails
              prevStep={prevStep}
              loanDetails={loanDetails}
              setLoanDetails={setLoanDetails}
              setActiveStep={setActive}
            />
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
      </Container>
    </Modal>
  );
};

export default AddLoanModal;
