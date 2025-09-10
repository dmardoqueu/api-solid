import fastify, { type FastifyReply, type FastifyRequest } from 'fastify';
import { z } from 'zod';
import { appRoutes } from './http/routes.js';
import fastifyJwt from '@fastify/jwt';
import { env } from './env/index.js';

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
})

app.decorate('authenticate', async function(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify()
    } catch (err) {
        reply.send(err)
    }
})

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