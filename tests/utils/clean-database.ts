import { prisma } from "database/prisma";

export async function cleanDatabase() {
	await prisma.users.deleteMany();
}
