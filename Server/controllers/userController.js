import asyncHandler from 'express-async-handler'
import { prisma } from "../Config/prismaConfig.js" 
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}
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
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Validate password using a secure hashing algorithm (bcrypt recommended)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isAdmin = user.email === "Krish78@gmail.com"; // Change "your@admin.email" to your desired admin email


    // Create a JWT token (consider using a library like jsonwebtoken)
    const token = createToken(user._id); // Pass user ID for token payload

    res.status(200).json({ email, token, isAdmin }); 
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Internal server error' }); // Generic error for client
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
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password using a secure hashing algorithm (bcrypt recommended)
    const hashedPassword = await bcrypt.hash(password, 12); // Adjust cost factor as needed

    // Create a new user using Prisma
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, emailToken: crypto.randomBytes(64).toString("hex"), isVerified: false },
    });

    // Create a JWT token (consider using a library like jsonwebtoken)
    const token = createToken(user.id); // Pass user ID for token payload

    res.status(201).json({ email, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
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

  //verify email
  export const verifyEmail = async (req, res) => {
    try{
      const emailToken = req.body.emailToken;

      if (!emailToken) return res.status(404).json("EmailToken not found....")

      const user = await prisma.user.findUnique({emailToken})

      if (user) {
        user.emailToken = null;
        user.isVerified = true

        await user.save()

        const token = createToken(user._id)

        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token,
          isVerified: user?.isVerified,
        })
      } else res.status(404).json("Email verification failed, invalid token!")
    } catch (error) {
      console.log(error)
      res.status(500).json(error.message)
    }
  }
