import { expect, describe, it, beforeEach } from "vitest"
import { FecthUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history.js"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository.js"
import { SearchGymsUseCase } from "./search-gyms.js"

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

//-6.84302, -35.49221
//-6.8245649,-35.4944589

describe('Search Gyms Use Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymsUseCase(gymsRepository)
    })

    it('should be able to search for gymas', async () => {
        await gymsRepository.create({
            title: 'JavaScript Gym',
            description: '',
            latitude: -6.8245649,
            longitude: -35.4944589,
            phone: '',
        })

        await gymsRepository.create({
            title: 'TypeScript Gym',
            description: '',
            latitude: -6.8245649,
            longitude: -35.4944589,
            phone: '',
        })

        const { gyms } = await sut.execute({
            query: 'JavaScript',
            page: 1,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
    })

    it('should be able to fetch paginated gyms search', async () => {

        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `JavaScript Gym ${i}`,
                description: '',
                latitude: -6.8245649,
                longitude: -35.4944589,
                phone: '',
            })
        }

        const { gyms } = await sut.execute({
            query: 'JavaScript',
            page: 2,
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JavaScript Gym 21' }),
            expect.objectContaining({ title: 'JavaScript Gym 22' }),
        ])
    })
})