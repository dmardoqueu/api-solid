import { expect, describe, it, beforeEach, vi, afterEach } from "vitest"
import { CheckInUseCase } from "./check-in.js"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-checkins-repository.js"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository.js"
import { Decimal } from "generated/prisma/runtime/library.js"
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error.js"
import { MaxDistanceError } from "./errors/max-distance-error.js"

let sut: CheckInUseCase
let gymsRepository: InMemoryGymsRepository
let checkInsRepository: InMemoryCheckInsRepository

describe('Check-in Use Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInsRepository, gymsRepository)

        await gymsRepository.create({
            id: 'gym-01',
            title: 'JavaScript Gym',
            description: '',
            latitude: -6.8245649,
            longitude: -35.4944589,
            phone: '',
        })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -6.8245649,
            userLongitude: -35.4944589,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -6.8245649,
            userLongitude: -35.4944589,
        })

        await expect(() =>
            sut.execute({
                gymId: 'gym-01',
                userId: 'user-01',
                userLatitude: -6.8245649,
                userLongitude: -35.4944589,
            })
        ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
    })

    it('should be able to check in in twice but in different days', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -6.8245649,
            userLongitude: -35.4944589,
        })

        vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -6.8245649,
            userLongitude: -35.4944589,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in on distanct gym', async () => {
        gymsRepository.items.push({
            id: 'gym-02',
            title: 'JavaScript Gym',
            description: '',
            latitude: new Decimal(-6.6904148),
            longitude: new Decimal(-35.2494476),
            phone: '',
        })

        await expect(() => sut.execute({
            gymId: 'gym-02',
            userId: 'user-01',
            userLatitude: -6.8245649,
            userLongitude: -35.4944589,
        })
        ).rejects.toBeInstanceOf(MaxDistanceError)
    })
})