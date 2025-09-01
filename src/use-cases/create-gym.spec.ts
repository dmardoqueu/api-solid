import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository.js"
import { CreateGymUseCase } from "./create-gym.js"

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymsRepository)
    })

        it('should be able to create gym', async () => {

            const { gym } = await sut.execute({
                title: 'JavaScript Gym',
                description: null,
                phone: null,
                latitude: -6.84302,
                longitude: -35.49221
            })

            expect(gym.id).toEqual(expect.any(String))
        })

    })
