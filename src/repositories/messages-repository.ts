import { prisma } from "database/prisma";

function findMessages() {
	return prisma.messages.findMany();
}

export { findMessages };
