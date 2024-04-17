import React, { useContext } from "react";
import { TextInput, Box, Textarea, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";
import "@mantine/core/styles.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import UserDetailContext from "../../Context/UserDetailContext";
import useLawyers from "../../hooks/useLawyers";
import { useMutation } from "react-query";
import { createLawyer } from "../../utils/api.js";
import { toast } from "react-toastify";

const AddLawyerDetails = ({
  prevStep,
  lawyerDetails,
  setlawyerDetails,
  setOpened,
  setActiveStep,
}) => {
  const form = useForm({
    initialValues: {
      name: lawyerDetails.name || "", // Provide initial value or empty string
      email: lawyerDetails.email || "", // Provide initial value or empty string
      phoneNumber: lawyerDetails.phoneNumber || "", // Provide initial value or empty string
      qualification: lawyerDetails.qualification || "", // Provide initial value or empty string
      experience: lawyerDetails.experience || "", // Provide initial value or empty string
    },
    validate: {
      name: (value) => validateString(value),
      email: (value) => validateString(value),
      phoneNumber: (value) => validateString(value),
      qualification: (value) => validateString(value),
      experience: (value) => validateString(value),
    },
  });

  const { name, email, phoneNumber, qualification, experience } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setlawyerDetails((prev) => ({
        ...prev,
        name,
        email,
        phoneNumber,
        qualification,
        experience,
      }));
      mutate();
    }
  };

  // ============================ upload Logic
  const { user } = useAuthContext();
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { refetch: refetchLawyers } = useLawyers();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createLawyer(
        {
          ...lawyerDetails,
          name,
          email,
          phoneNumber,
          qualification,
          experience,
        },
        token
      ),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
      toast.success("Added Successfully", { position: "bottom-right" });
      setlawyerDetails({
        name: "",
        email: "",
        phoneNumber: "",
        country: "",
        city: "",
        address: "",
        image: null,
        firm: "",
        qualification: "",
        experience: "",
      });
      setOpened(false);
      setActiveStep(0);
      refetchLawyers();
    },
  });

  return (
    <Box maw="50%" mx="auto" my="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextInput
          withAsterisk
          label="Lawyer Name"
          placeholder="Full Name"
          value={name} // Ensure that value is controlled
          onChange={(event) => form.setFieldValue("name", event.target.value)} // Handle input change
        />
        <br />
        <TextInput
          placeholder="example@gmail.com"
          label="E-mail Address"
          withAsterisk
          value={email} // Ensure that value is controlled
          onChange={(event) => form.setFieldValue("email", event.target.value)} // Handle input change
        />
        <br />
        <TextInput
          withAsterisk
          label="Phone Number"
          placeholder="Phone Number"
          value={phoneNumber} // Ensure that value is controlled
          onChange={(event) =>
            form.setFieldValue("phoneNumber", event.target.value)
          } // Handle input change
        />
        <br />
        <Textarea
          withAsterisk
          label="Qualification"
          placeholder="Degrees and Certificates"
          value={qualification} // Ensure that value is controlled
          onChange={(event) =>
            form.setFieldValue("qualification", event.target.value)
          } // Handle input change
        />
        <br />
        <TextInput
          withAsterisk
          label="Experience"
          placeholder="Years"
          value={experience} // Ensure that value is controlled
          onChange={(event) =>
            form.setFieldValue("experience", event.target.value)
          } // Handle input change
        />
        <Group position="center" mt={"xl"}>
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting" : "Add Lawyer"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default AddLawyerDetails;
