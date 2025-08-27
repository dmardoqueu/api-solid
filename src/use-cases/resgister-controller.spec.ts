import { expect, describe, it } from "vitest"
import { RegisterUseCase } from "./register-controller.js"
import { compare } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository.js"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.js"

describe('Register Use Case', () => {
    it('should be able to register', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)
        
        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)
        

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        const isPasswordCorrectlyHash = await compare(
            '123456',
            user.password_hash
        )

        expect(isPasswordCorrectlyHash).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)
        
        const email = 'johndoe@gmail.com'

        await registerUseCase.execute({
            name: 'John Doe',
            email: email,
            password: '123456'
        })

        await expect(() => registerUseCase.execute({
            name: 'John Doe',
            email: email,
           password: '123456'
        })).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})
