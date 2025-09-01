import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'
import type { Gym } from '@prisma/client'
import type { GymsRepository } from '@/repositories/gyms-repository.js'

interface CreateGymUseCaseRequest {
    title: string
    description: string | null
    phone: string | null
    latitude: number
    longitude: number
}

interface CreateGymUseCaseResponse {
    gym: Gym
}

export class CreateGymUseCase {
    constructor(private gysmRepository: GymsRepository) {}

    async execute({
        title,
        description,
        phone,
        latitude,
        longitude,
    }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
        const gym = await this.gysmRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude,
        })

        return {
            gym
        }
    }
}