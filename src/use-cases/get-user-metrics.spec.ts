import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-checkins-repository.js"
import { GetUserMetricsUseCase } from "./get-user-metrics.js"

let sut: GetUserMetricsUseCase
let checkInsRepository: InMemoryCheckInsRepository

//-6.84302, -35.49221
//-6.8245649,-35.4944589

describe('Get User Metrics Use Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new GetUserMetricsUseCase(checkInsRepository)
    })

    it('should be able to get check-ins count from metrics', async () => {
        await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })

        await checkInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01',
        })

        const { checkInsCount } = await sut.execute({
            userId: 'user-01',
        })

        expect(checkInsCount).toEqual(2)
    })
})