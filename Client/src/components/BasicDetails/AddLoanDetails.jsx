import { Box, Button, Group, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

const AddLoanDetails =
  () =>
  ({ prevStep, loanDetails, setLoanDetails, setOpened, setActiveStep }) => {
    const form = useForm({
      initialValues: {
        description: loanDetails.description,
        interestRate: loanDetails.interestRate,
        terms: loanDetails.contactInfo,
      },
      validate: {
        description: (value) => validateString(value),
        interestRate: (value) =>
          value > 100 ? "Must be smaller than  100%" : null,
        terms: (value) => validateString(value),
        email: (value) => validateString(value),
      },
    });

    // const { description, interestRate, terms}

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
            onChange={(event) =>
              form.setFieldValue("email", event.target.value)
            } // Handle input change
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
export default AddLoanDetails;
