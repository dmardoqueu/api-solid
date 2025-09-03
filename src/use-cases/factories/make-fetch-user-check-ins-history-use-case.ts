import { FecthUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history.js"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.js"

export function makeFetchUserCheckInsHistoryUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const useCase = new FecthUserCheckInsHistoryUseCase(checkInsRepository)

    return useCase
}