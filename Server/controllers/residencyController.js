import asyncHandler from "express-async-handler";
import { prisma } from "../Config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
  } = req.body.data;

  console.log(req.body.data);
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
      },
    });

    res.send({ message: "Residency created successfully", residency });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A residency with address already there");
    }
    throw new Error(err.message);
  }
});

// function to get all the documents/residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
});

// function to get a specific document/residency
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });
    res.send(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});


//function to delete a residency
export const deleteResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Use Prisma's delete method to remove the property by its ID
    await prisma.residency.delete({
      where: { id },
    });

    res.send({ message: "Residency deleted successfully" });
  } catch (err) {
    // Handle errors
    throw new Error(err.message);
  }
});

// Function to update a residency
export const updateResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
  } = req.body.data;

  try {
    // Use Prisma's update method to update the property by its ID
    const updatedResidency = await prisma.residency.update({
      where: { id },
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
      },
    });

    res.send({ message: "Residency updated successfully", residency: updatedResidency });
  } catch (err) {
    // Handle errors
    throw new Error(err.message);
  }
});