import type { FastifyRequest, FastifyReply } from "fastify"
import z from "zod"
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case.js"
import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case.js"

export async function history(request: FastifyRequest, reply: FastifyReply) {
    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const { page } = checkInHistoryQuerySchema.parse(request.query)

    const fetchNearbyGymsUseCase = makeFetchUserCheckInsHistoryUseCase()

    const { checkIns } = await fetchNearbyGymsUseCase.execute({
        userId: request.user.sub,
        page
    })

    return reply.status(200).send({
        checkIns
    })
}