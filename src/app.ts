import fastify, { type FastifyReply, type FastifyRequest } from 'fastify';
import { check, z } from 'zod';
import fastifyJwt from '@fastify/jwt';
import { env } from './env/index.js';
import { usersRoutes } from './http/controllers/users/routes.js';
import { gymsRoutes } from './http/controllers/gyms/routes.js';
import { checkInsRoutes } from './http/controllers/check-ins/routes.js';
import fastifyCookie from '@fastify/cookie';

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: '10m',
    },
    cookie: {
        cookieName: 'refreshToken',
        signed: false,
    },
})

app.register(fastifyCookie)

app.decorate('authenticate', async function(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify()
    } catch (err) {
        reply.send(err)
    }
})

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

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