import type { FastifyInstance } from 'fastify'
import { authenticate } from '@/http/controllers/users/authenticate-controller.js'
import { register } from './register-controller.js'
import { profile } from '@/http/controllers/users/profile-controller.js'
import { verifyJwt } from '../../middlewares/verify-jwt.js'


export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}