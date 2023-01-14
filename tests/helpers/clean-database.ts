import { prisma } from "database/prisma";

export async function cleanDatabase() {
	await prisma.messages.deleteMany();
	await prisma.sessions.deleteMany();
	await prisma.users.deleteMany();
}
