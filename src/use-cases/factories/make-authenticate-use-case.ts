import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js"
import { RegisterUseCase } from "../register-controller.js"
import { AuthenticateUseCase } from "../authenticate-controller.js"

export function makeAuthenticateUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

    return authenticateUseCase
}