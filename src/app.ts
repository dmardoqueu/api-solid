import fastify from 'fastify';
import { PrismaClient } from 'generated/prisma/index.js';

export const app = fastify()

const prisma = new PrismaClient();

prisma.user.create({
    data: {
        name: 'Diogo Mardoqueu',
        email: 'diogovasco11@gmail.com',
    }
})