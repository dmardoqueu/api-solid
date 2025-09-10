import type { FastifyInstance } from 'fastify'
import { authenticate } from '@/http/controllers/authenticate-controller.js'
import { register } from './controllers/register-controller.js'
import { profile } from '@/http/controllers/profile-controller.js'
import { verifyJwt } from './controllers/middlewares/verify-jwt.js'


export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}