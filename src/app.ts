import fastify from 'fastify';
import { z } from 'zod';
import { prisma } from './lib/prisma.js';
import { register } from './http/controllers/register-controller.js';
import { appRoutes } from './http/routes.js';
import { env } from './env/index.js';

export const app = fastify()

app.register(appRoutes)


app.setErrorHandler((error, _, reply) => {
    if (error instanceof z.ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error.', issues: error.format() })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        // Here you should log the error to an external service
    }

    return reply.status(500).send({ message: 'Internal server error.' })
})