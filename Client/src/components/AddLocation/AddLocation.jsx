import React from "react";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";
import useCountries from "../../hooks/useCountries";
import { Button, Group, Select, TextInput } from "@mantine/core";
import Map from "../Map/Map";

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {
  const { getAll } = useCountries();
  const form = useForm({
    initialValues: {
      country: propertyDetails?.country,
      city: propertyDetails?.city,
      address: propertyDetails?.address,
    },

    validate: {
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value),
    },
  });

  const { country, city, address } = form.values;
  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, city, address, country }));
      nextStep();
    }
  };

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
          <Select
            w={"100%"}
            withAstersk
            label="Country"
            clearable
            searchable
            data={getAll()}
            {...form.getInputProps("country", { type: "input" })}
          />
          <TextInput
            w={"100%"}
            withAstersk
            label="City"
            {...form.getInputProps("city", { type: "input" })}
          />
          <TextInput
            w={"100%"}
            withAstersk
            label="Address"
            {...form.getInputProps("address", { type: "input" })}
          />
        </div>

        {/* Right Side */}
        <div style={{ flex: 1 }}>
          <Map address={address} city={city} country={country} />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button type="submit" className="button">
          Next Step
        </button>
      </div>
    </form>
  );
};

export default AddLocation;
