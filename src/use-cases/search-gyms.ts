import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'
import type { Gym } from '@prisma/client'
import type { GymsRepository } from '@/repositories/gyms-repository.js'

interface SearchGymsUseCaseRequest {
    query: string
    page: number
}

interface SearchGymsUseCaseResponse {
    gyms: Gym[]
}

export class SearchGymsUseCase {
    constructor(private gysmRepository: GymsRepository) { }

    async execute({
        query,
        page,
    }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
        const gyms = await this.gysmRepository.searchMany(query, page)

        return {
            gyms
        }
    }
}