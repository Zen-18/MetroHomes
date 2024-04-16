import asyncHandler from 'express-async-handler'
import {prisma} from '../Config/prismaConfig.js'

export const createLawyer = asyncHandler(async(req,res) => {
    const { 
        name, 
        firm, 
        location, 
        image, 
        email, 
        phoneNumber, 
        qualification, 
        experience } = req.body.data;

        console.log(req.body.data)

        try {
            const lawyer = await prisma.lawyer.create({
              data: {
                name, 
                firm, 
                location, 
                image, 
                email, 
                phoneNumber, 
                qualification, 
                experience
              },
            });
        
            res.send({ message: "Lawyer registered successfully", lawyer });
          } catch (err) {
            if (err.code === "P2002") {
              throw new Error("A Lawyer with email already there");
            }
            throw new Error(err.message);
          }
})

export const getAllLawyers = asyncHandler(async (req, res) => {
    const lawyers = await prisma.lawyer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.send(lawyers);
  });

  export const getLawyer = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      const lawyer = await prisma.lawyer.findUnique({
        where: { id },
      });
      res.send(lawyer);
    } catch (err) {
      throw new Error(err.message);
    }
  });

  export const deleteLawyer = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      await prisma.lawyer.delete({
        where: { id },
      });
  
      res.send({ message: "Lawyer deleted successfully" });
    } catch (err) {
      throw new Error(err.message);
    }
  });
  