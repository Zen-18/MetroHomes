import React, { useContext, useState } from "react";
import { Button, Modal } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMutation } from "react-query";
import UserDetailContext from "../../Context/UserDetailContext.js";
import { bookVisit } from "../../utils/api.js";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const [value, setValue] = useState(null);

  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailContext);

  const handleBookingSuccess = () => {
    toast.success("You have booked your visit", {
      position: "bottom-right",
    });
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YYYY"),
        },
      ],
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError: ({ response }) => toast.error(response.data.message),
    onSettled: () => setOpened(false),
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Select the date for your visit"
      centered
    >
      <div className="flexColCenter" style={{ gap: "1rem" }}>
        <DatePicker
          value={value}
          onChange={setValue}
          getDayProps={() => {
            return {
              sx: (theme) => ({
                backgroundColor: theme.colors.red[6],
                color: theme.black,
                ...theme.fn.hover({
                  backgroundColor: theme.colors.violet[7],
                  color: theme.white,
                }),
              }),
            };
          }}
        />

        <Button disabled={!value || isLoading} onClick={() => mutate()}>
          Book Visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
