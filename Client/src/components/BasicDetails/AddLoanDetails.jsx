import {
  Box,
  Button,
  Group,
  NumberInput,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext, useEffect } from "react";
import { useMutation } from "react-query";
import UserDetailContext from "../../Context/UserDetailContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { validateString } from "../../utils/common";
import { toast } from "react-toastify";
import useLoans from "../../hooks/useLoans";
import { createLoan } from "../../utils/api";
import "@mantine/core/styles.css";

const AddLoanDetails = ({
  prevStep,
  loanDetails,
  setLoanDetails,
  setOpened,
  setActiveStep,
}) => {
  const form = useForm({
    initialValues: {
      description: loanDetails.description,
      interestRate: loanDetails.interestRate,
      terms: loanDetails.terms,
      documents: loanDetails.documents,
    },
    validate: {
      description: (value) => validateString(value),
      interestRate: (value) =>
        value > 100 ? "Must be smaller than  100%" : null,
      terms: (value) => validateString(value),
      documents: (value) => validateString(value),
    },
  });

  const { description, interestRate, terms, documents } = form.values;

  useEffect(() => {
    form.setFieldValue("description", loanDetails.description);
    form.setFieldValue("interestRate", loanDetails.interestRate);
    form.setFieldValue("terms", loanDetails.terms);
    form.setFieldValue("documents", loanDetails.documents);
  }, [loanDetails]);

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setLoanDetails((prev) => ({
        ...prev,
        description,
        interestRate,
        terms,
        documents,
      }));
      mutate();
    }
  };

  // ============================ upload Logic
  const { user } = useAuthContext();
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { refetch: refetchLoans } = useLoans();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createLoan(
        {
          ...loanDetails,
          description,
          interestRate,
          terms,
          documents,
        },
        token
      ),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
      toast.success("Added Successfully", { position: "bottom-right" });
      setLoanDetails({
        bank: "",
        description: "",
        interestRate: 0,
        terms: "",
        Address: "",
        contactInfo: "",
        image: null,
        documents: "",
        email: "",
      });
      setOpened(false);
      setActiveStep(0);
      refetchLoans();
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
        <Textarea
          withAsterisk
          label="Loan Plan Description"
          placeholder="Plan explanation"
          value={description} // Ensure that value is controlled
          onChange={(event) =>
            form.setFieldValue("description", event.target.value)
          } // Handle input change
        />
        <br />
        <NumberInput
          withAsterisk
          label="Interest Rate"
          placeholder="Rate %"
          min={0}
          value={interestRate} // Ensure that value is controlled
          {...form.getInputProps("interestRate")}
        />
        <br />
        <TextInput
          placeholder="- years"
          label="Terms"
          withAsterisk
          value={terms} // Ensure that value is controlled
          onChange={(event) => form.setFieldValue("terms", event.target.value)} // Handle input change
        />
        <br />
        <TextInput
          placeholder="Documents needed"
          label="Documents"
          withAsterisk
          value={documents} // Ensure that value is controlled
          onChange={(event) =>
            form.setFieldValue("documents", event.target.value)
          } // Handle input change
        />

        <Group position="center" mt={"xl"}>
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Added" : "Add Loan"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};
export default AddLoanDetails;
