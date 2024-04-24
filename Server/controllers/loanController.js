import asyncHandler from 'express-async-handler'
import {prisma} from '../Config/prismaConfig.js'

export const createLoan = asyncHandler(async(req,res) => {
    const { 
        bank, 
        description, 
        interestRate, 
        terms, 
        image,
        contactInfo, 
        documents,
        Address,
        email} = req.body.data;

        console.log(req.body.data)

        try {
            const loan = await prisma.loan.create({
              data: {
                bank, 
                description, 
                interestRate, 
                terms, 
                image,
                Address,
                contactInfo, 
                documents,
                email
              },
            });
        
            res.send({ message: "Loan added successfully", loan });
          } catch (err) {
            if (err.code === "P2002") {
              throw new Error("A Loan form the same bank is already added.");
            }
            throw new Error(err.message);
          }
})

export const getAllLoans = asyncHandler(async (req, res) => {
    const loans = await prisma.loan.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.send(loans);
  });

  export const getLoan = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      const loan = await prisma.loan.findUnique({
        where: { id },
      });
      res.send(loan);
    } catch (err) {
      throw new Error(err.message);
    }
  });

  export const deleteLoan = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      // Convert the ID to an integer before passing it to Prisma
      const loanId = parseInt(id);
  
      // Ensure that the loan with the provided ID exists before attempting deletion
      const existingLoan = await prisma.loan.findUnique({
        where: { id: loanId },
      });
  
      if (!existingLoan) {
        // If the loan doesn't exist, return a 404 Not Found response
        res.status(404).send({ error: "Loan not found." });
        return;
      }
  
      // Delete the loan using the correct loan ID
      await prisma.loan.delete({
        where: { id: loanId },
      });
  
      // Send a success response
      res.send({ message: "Loan deleted successfully" });
    } catch (err) {
      // If an error occurs during deletion, return a 500 Internal Server Error response
      res.status(500).send({ error: "An error occurred while deleting the loan." });
    }
  });
  