import fastify from 'fastify';
import { z } from 'zod';
import { prisma } from './lib/prisma.js';
import { register } from './http/controllers/register-controller.js';
import { appRoutes } from './http/routes.js';

export const app = fastify()

app.register(appRoutes)