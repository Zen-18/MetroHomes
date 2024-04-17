import React from "react";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";
import useCountries from "../../hooks/useCountries";
import { Button, Group, Select, TextInput } from "@mantine/core";
import Map from "../Map/Map";

const AddLawyerInfo = ({ lawyerDetails, setlawyerDetails, nextStep }) => {
  const { getAll } = useCountries();

  const form = useForm({
    initialValues: {
      firm: lawyerDetails?.firm || "",
      country: lawyerDetails?.country || "",
      city: lawyerDetails?.city || "",
      address: lawyerDetails?.address || "",
    },

    validate: {
      firm: (value) => validateString(value),
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value),
    },
  });

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      const { firm, country, city, address } = form.values;
      setlawyerDetails({ ...lawyerDetails, firm, country, city, address });
      nextStep();
    }
  };

  const { firm, country, city, address } = form.values;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div
        className="flexCenter"
        style={{
          justifyContent: "space-between",
          gap: "3rem",
          marginTop: "3rem",
          marginBottom: "3rem",
          flexDirection: "row",
        }}
      >
        {/* Left Side */}
        {/* Inputs */}
        <div className="flexColStart">
          <TextInput
            w={"100%"}
            withAsterisk
            label="Firm Name"
            value={firm}
            onChange={(event) => form.setFieldValue("firm", event.target.value)}
          />
          <Select
            w={"100%"}
            withAsterisk
            label="Country"
            clearable
            searchable
            data={getAll()}
            value={country}
            onChange={(value) => form.setFieldValue("country", value)}
          />
          <TextInput
            w={"100%"}
            withAsterisk
            label="City"
            value={city}
            onChange={(event) => form.setFieldValue("city", event.target.value)}
          />
          <TextInput
            w={"100%"}
            withAsterisk
            label="Address"
            value={address}
            onChange={(event) =>
              form.setFieldValue("address", event.target.value)
            }
          />
        </div>

        {/* Right Side */}
        <div style={{ flex: 1 }}>
          <Map address={address} city={city} country={country} />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button type="submit">Next Step</Button>
      </div>
    </form>
  );
};

export default AddLawyerInfo;
