import type { CheckIn } from "@prisma/client"
import type { CheckInsRepository } from "@/repositories/check-ins-repository.js"

interface FecthUserCheckInsHistoryUseCaseRequest {
    userId: string
    page?: number
}

interface FecthUserCheckInsHistoryUseCaseResponse {
    checkIns: CheckIn[]
}

export class FecthUserCheckInsHistoryUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
    ) {}
    
    async execute({ 
        userId, 
        page = 1
    }: FecthUserCheckInsHistoryUseCaseRequest): Promise<FecthUserCheckInsHistoryUseCaseResponse> {
        const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)
 
        return {
            checkIns
        }
    }
}
