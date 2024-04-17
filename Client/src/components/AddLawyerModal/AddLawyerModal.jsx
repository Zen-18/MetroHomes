import { Container, Modal } from "@mantine/core";
import React, { useState } from "react";
import { Stepper } from "@mantine/core";
import AddLawyerInfo from "../AddLawyerLocation/AddLawyerLocation";
import { useAuthContext } from "../../hooks/useAuthContext";
import UploadImageLawyer from "../UploadImage/UploadImageLawyer";
import AddLawyerDetails from "../BasicDetails/AddLawyerDetails";

const AddLawyerModal = ({ opened, setOpened }) => {
  const [active, setActive] = useState(0);
  const { user } = useAuthContext();

  const [lawyerDetails, setlawyerDetails] = useState({
    name: "",
    firm: "",
    location: "",
    image: null,
    email: "",
    phoneNumber: "",
    qualification: "",
    experience: "",
  });

  const nextStep = () => {
    setActive((current) => (current < 3 ? current + 1 : current));
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
            label="Lawyer Information"
            description="Insert Informations"
          >
            <AddLawyerInfo
              nextStep={nextStep}
              lawyerDetails={lawyerDetails}
              setlawyerDetails={setlawyerDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Profile Picture" description="Upload Picture">
            <UploadImageLawyer
              prevStep={prevStep}
              nextStep={nextStep}
              lawyerDetails={lawyerDetails}
              setlawyerDetails={setlawyerDetails}
            />
          </Stepper.Step>
          <Stepper.Step
            label="Lawyer Qualifications"
            description="Insert Qualification Informations"
          >
            <AddLawyerDetails
              lawyerDetails={lawyerDetails}
              setlawyerDetails={setlawyerDetails}
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
export default AddLawyerModal;
