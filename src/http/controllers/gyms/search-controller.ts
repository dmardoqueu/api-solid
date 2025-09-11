import type { FastifyRequest, FastifyReply } from "fastify"
import z from "zod"
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case.js"

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const searchGymsQuerySchema = z.object({
        query: z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const { query, page } = searchGymsQuerySchema.parse(request.body)

    const searchGymsUseCase = makeSearchGymsUseCase()

    const { gyms } = await searchGymsUseCase.execute({
        query: query,
        page
    })

    return reply.status(200).send({
        gyms
    })
}