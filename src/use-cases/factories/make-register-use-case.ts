import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js"
import { RegisterUseCase } from "../register-controller.js"

export function makeRegisterUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    return registerUseCase
}