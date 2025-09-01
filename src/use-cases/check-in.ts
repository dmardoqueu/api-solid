import type { CheckIn, User } from "@prisma/client"
import type { CheckInsRepository } from "@/repositories/check-ins-repository.js"
import type { GymsRepository } from "@/repositories/gyms-repository.js"
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js"
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates.js"

interface CheckInUseCaseRequest {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository,
    ) {}
    
    async execute({ 
        userId, 
        gymId,
        userLatitude,
        userLongitude
    }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const gym = await this.gymsRepository.findById(gymId)
        if (!gym) {
            throw new ResourceNotFoundError()
        }

        // calculate the distance between the user and the gym

        const distance = getDistanceBetweenCoordinates(
            { latitude: userLatitude, longitude: userLongitude },
            { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
        )

        console.log('Distância calculada:', distance)

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new Error('User is too far from the gym.')
        }
        
        const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

        if (checkInOnSameDate) {
            throw new Error('User has already checked in today.')
        }

        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId
        })

        return {
            checkIn
        }
    }
}
