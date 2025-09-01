import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository.js"
import { AuthenticateUseCase } from "./authenticate.js"
import { hash } from "bcryptjs"

let sut: AuthenticateUseCase
let usersRepository: InMemoryUsersRepository

describe('Authenticate Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateUseCase(usersRepository)
    })

    it('should be able to authenticate', async () => {
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
        })

        const { user } = await sut.execute({
            email: 'johndoe@example.com',
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        expect(() =>
            sut.execute({
                email: 'johndoe@example.com',
                password: '123456',
            }))
    })

    it('should not be able to authenticate with wrong password', async () => {
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123567', 6),
        })

        await expect(() =>
            sut.execute({
                email: 'johndoe@example.com',
                password: '123456',
            }))
    })
})