import type { Gym } from '@prisma/client'
import type { GymsRepository } from '@/repositories/gyms-repository.js'

interface FetchNearbyGymsUseCaseRequest {
    userLatitude: number
    userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
    gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
    constructor(private gysmRepository: GymsRepository) { }

    async execute({
        userLatitude,
        userLongitude,
    }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
        const gyms = await this.gysmRepository.findManyNearby({
            latitude: userLatitude,
            longitude: userLongitude
        })

        return {
            gyms
        }
    }
}