import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  deleteProperty,
  getProperty,
  getUserData,
  removeBooking,
  updateResidency,
} from "../../utils/api"; // Import updateResidency
import { PuffLoader } from "react-spinners";
import { AiFillHeart, AiTwotoneCar } from "react-icons/ai";
import "./Property.css";
import { useMutation } from "react-query";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdDelete, MdLocationPin, MdMeetingRoom } from "react-icons/md";
import { FaShower } from "react-icons/fa";
import Map from "../../components/Map/Map";
import ShowUpdateModal from "../../components/ShowPropertyUpdate/ShowPropertyUpdate";
import { useAuthContext } from "../../hooks/useAuthContext";
import BookingModal from "../../components/BookingModal/BookingModal";
import UserDetailContext from "../../Context/UserDetailContext";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import Heart from "../../components/Heart/Heart";

const Property = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [BookmodalOpened, setBookModalOpened] = useState(false);
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const [isAdmin, setIsAdmin] = useState(false); // State to store isAdmin flag
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailContext);

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));

      toast.success("Booking Cancelled", { position: "bottom-right" });
    },
  });

  useEffect(() => {
    if (user && user.isAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    const getUser = async () => {
      const response = await getUserData(
        JSON.parse(localStorage.getItem("user"))
      );
      setIsVerified(response.isVerified);
    };
    getUser();
  }, [user]);

  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  );

  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" };
    }
  };

  const [updatedData, setUpdatedData] = useState({}); // State to hold updated data

  const { mutate: deleteMutation, isLoading: isDeleting } = useMutation(
    deleteProperty,
    {
      onSuccess: () => {
        // Redirect to the homepage after successful deletion
        window.location.href = "/properties";
      },
    }
  );

  console.log(data);

  const handleDelete = () => {
    deleteMutation(id);
  };

  const handleVerify = () => {
    navigate("/verifyemail");
    console.log("hello");
  };

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* like button */}
        <div className="like">
          <Heart id={id} />
        </div>

        {/* image */}
        <img src={data?.image} alt="Property Image" />

        <div className="flexCenter property-details">
          {/* left */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                Rs {data?.price}
              </span>
            </div>

            {/* facilities */}
            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.facilities.bathrooms} Bathrooms</span>
              </div>
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities.parkings} Parkings</span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities.bedrooms} Bedrooms</span>
              </div>
            </div>

            {/* Description */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            {/* Address */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address}, {data?.city}, {data?.country}
              </span>
              {isAdmin && (
                <div className="del" onClick={handleDelete}>
                  <RiDeleteBin6Line size={35} color="red" />
                </div>
              )}
            </div>

            {/* Booking Button */}
            {!isVerified ? (
              <button className="button" onClick={handleVerify}>
                Please Verify your email to Book
              </button>
            ) : bookings && bookings.some((booking) => booking.id === id) ? (
              <>
                <Button
                  variant="outline"
                  w={"100%"}
                  color="red"
                  onClick={() => cancelBooking()}
                  disabled={cancelling}
                >
                  <span>Cancel Booking</span>
                </Button>
                <span>
                  Your visit already booked for the date{" "}
                  {bookings?.filter((booking) => booking?.id === id)[0].date}
                </span>
                <span>
                  Are you in need of legal assistance? If so
                  <button
                    className="properties-link hire-button"
                    style={{ marginLeft: "1rem" }}
                  >
                    <NavLink to="/Lawyers">
                      <u>Hire yourself a Lawyer</u>
                    </NavLink>
                  </button>
                </span>
              </>
            ) : (
              <div>
                <button
                  className="button-book"
                  onClick={() => {
                    setModalOpened(true);
                  }}
                >
                  Book your Visit
                </button>
                <BookingModal
                  opened={modalOpened}
                  setOpened={setModalOpened}
                  propertyId={id}
                  email={user?.email}
                />
              </div>
            )}

            {/* <button className="button button1">
                <div onClick={handleUpdate}>
                  <ShowUpdateModal
                    opened={modalOpened}
                    setOpened={setModalOpened}
                  />
                </div>
              </button> */}
          </div>

          {/* right */}
          <div className="map">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
