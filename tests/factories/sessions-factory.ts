import { prisma } from "../../src/database/prisma";

function createSession(data: CreateSessionParams) {
	return prisma.sessions.create({
		data: {
			...data,
		},
	});
}

type CreateSessionParams = { userId: number; token: string };

export { createSession };
