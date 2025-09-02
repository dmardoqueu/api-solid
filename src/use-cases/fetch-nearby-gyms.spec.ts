import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository.js"
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms.js"

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchNearbyGymsUseCase(gymsRepository)
    })

    it('should be able to fetch nearby gyms', async () => {
        await gymsRepository.create({
            title: 'Near Gym',
            description: '',
            latitude: -6.8245649,
            longitude: -35.4944589,
            phone: '',
        })

        await gymsRepository.create({
            title: 'Far Gym',
            description: '',
            latitude: -7.0348072,
            longitude: -35.6288806,
            phone: '',
        })

        const { gyms } = await sut.execute({
            userLatitude: -6.8245649,
            userLongitude: -35.4944589,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
    })

})