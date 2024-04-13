import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const requireAuth = async (req, res, next) => {
    // Verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        // Verify the token
        const { _id } = jwt.verify(token, process.env.SECRET);

        // Fetch user data using Prisma
        const user = await prisma.user.findUnique({
            where: { id: _id },
            select: { id: true },
        });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Attach user object to the request
        req.user = user;

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};
