import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { validateString } from "../../utils/common";
import "@mantine/core/styles.css";

const AddLoanBank = ({ loanDetails, setLoanDetails, nextStep, prevStep }) => {
  const form = useForm({
    initialValues: {
      bank: loanDetails.bank,
      Address: loanDetails.Address,
      contactInfo: loanDetails.contactInfo,
      email: loanDetails.email,
    },
    validate: {
      bank: (value) => validateString(value),
      Address: (value) => validateString(value),
      contactInfo: (value) => validateString(value),
      email: (value) => validateString(value),
    },
  });

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      const { bank, Address, contactInfo, email } = form.values;
      setLoanDetails({
        ...loanDetails,
        bank,
        Address,
        contactInfo,
        email,
      });
      nextStep();
    }
  };

  const { bank, Address, contactInfo, email } = form.values;

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
          label="Bank Name"
          placeholder="Bank Name"
          {...form.getInputProps("bank")}
        />
        <br />
        <TextInput
          placeholder="Address"
          label="Bank Address"
          withAsterisk
          {...form.getInputProps("Address")}
        />
        <br />
        <TextInput
          withAsterisk
          label="Phone Number"
          placeholder="Phone Number"
          {...form.getInputProps("contactInfo")}
        />
        <br />
        <TextInput
          withAsterisk
          label="E-mail Address"
          placeholder="E-mail Address"
          {...form.getInputProps("email")}
        />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button className="button" type="submit">
            Next Step
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default AddLoanBank;
