import type { CheckIn, User } from "@prisma/client"
import type { CheckInsRepository } from "@/repositories/check-ins-repository.js"

interface FecthUserCheckInsHistoryUseCaseRequest {
    userId: string
    page?: number
}

interface FecthUserCheckInsHistoyUseCaseResponse {
    checkIns: CheckIn[]
}

export class FecthUserCheckInsHistoyUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
    ) {}
    
    async execute({ 
        userId, 
        page = 1
    }: FecthUserCheckInsHistoryUseCaseRequest): Promise<FecthUserCheckInsHistoyUseCaseResponse> {
        const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)
 
        return {
            checkIns
        }
    }
}
