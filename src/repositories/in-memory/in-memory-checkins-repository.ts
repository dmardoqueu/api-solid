import type { CheckIn, Prisma } from "@prisma/client";
import type { CheckInsRepository } from "../check-ins-repository.js";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements CheckInsRepository {
    public items: CheckIn[] = []

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
            createdAt: new Date()
        }

        this.items.push(checkIn)

        return checkIn
    }
}
