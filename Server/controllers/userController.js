import asyncHandler from "express-async-handler";
import { prisma } from "../Config/prismaConfig.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// function to login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email using Prisma
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true }, // Only select necessary fields
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Validate password using a secure hashing algorithm (bcrypt recommended)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isAdmin = user.email === "metrohomes977@gmail.com"; //admin email

    // Create a JWT token (consider using a library like jsonwebtoken)
    const token = createToken(user._id); // Pass user ID for token payload

    res.status(200).json({ email, token, isAdmin });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" }); // Generic error for client
  }
});

// function to sign up a user
export const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for existing user with the same email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password using a secure hashing algorithm (bcrypt recommended)
    const hashedPassword = await bcrypt.hash(password, 12); // Adjust cost factor as needed

    // Create a new user using Prisma
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        emailToken: crypto.randomBytes(64).toString("hex"),
        isVerified: false,
      },
    });

    // Create a JWT token (consider using a library like jsonwebtoken)
    const token = createToken(user.id); // Pass user ID for token payload

    res.status(201).json({ email, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// function to book a visit to resd
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res
        .status(400)
        .json({ message: "This residency is already booked by you" });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      res.send("your visit is booked successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// funtion to get all bookings of a user
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    res.status(200).send(bookings);
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to cancel the booking
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });

      res.send("Booking cancelled successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to add a resd in favourite list of a user
export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user.favResidenciesID.includes(rid)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !== rid),
          },
        },
      });

      res.send({ message: "Removed from favorites", user: updateUser });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            push: rid,
          },
        },
      });
      res.send({ message: "Updated favorites", user: updateUser });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to get all favorites
export const getAllFavorites = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const favResd = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesID: true },
    });
    res.status(200).send(favResd);
  } catch (err) {
    throw new Error(err.message);
  }
});

export const getUserData = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) return res.status(404).json("Email not found....");

    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).json("User not found.");
    }


    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};


//verify email
export const verifyEmail = async (req, res) => {
  try {
    const emailToken = req.body.emailToken;
    console.log(emailToken);
    if (!emailToken) return res.status(404).json("EmailToken not found....");

    const user = await prisma.user.findFirst({
      where: {
        emailToken: req.body.emailToken,
      },
    });

    if (user) {
      await prisma.user.update({
        where: {
          id: user.id, // assuming user has an id field
        },
        data: {
          isVerified: true,
        },
      });
      const token = createToken(user._id);

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
        isVerified: user?.isVerified,
      });
    } else res.status(404).json("Email verification failed, invalid token!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const SendEmail = async (req, res) => {
  const email = req.body.email;
  console.log(email);
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  console.log(user.emailToken);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "metrohomes977@gmail.com",
      pass: "yxsk vcog klzm wekn",
    },
  });

  var mailOptions = {
    from: "metrohomes977@gmail.com",
    to: email,
    subject: "Email Verification",
    html: `<h1>Verify your email</h1><a href="http://localhost:5173/verify-email/${user.emailToken}">Click here to verify</a>`,
  };
  console.log("Email was senttt");
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export const generateForgotPassWordToken = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(404).json("Email not found....");
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "metrohomes977@gmail.com",
        pass: "yxsk vcog klzm wekn",
      },
    });

    var mailOptions = {
      from: "metrohomes977@gmail.com",
      to: email,
      subject: "Reset Password Link",
      html: `<h1>Reset Password Link</h1>
      <a href="http://localhost:5173/forgot-password/${user.emailToken}">Reset Password</a>`,
    };
    console.log("Email was senttt");
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res
      .json({
        message: "Email sent",
        token: user.emailToken,
      })
      .status(200);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Email not valid" });
  }
};
export const resetPassword = async (req, res) => {
  const { password, token } = req.body;
  if (!password) return res.status(400).json({ message: "Password is empty" });
  try {
    const user = await prisma.user.findFirst({
      where: {
        emailToken: token,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 12); // Adjust cost factor as needed
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    return res
      .status(200)
      .json({ user, message: "Password reset successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};