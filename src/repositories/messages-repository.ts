import { prisma } from "database/prisma";

function findMessages() {
	return prisma.messages.findMany();
}

function findMessagesSentByUser(userId: number) {
	return prisma.messages.findMany({
		where: {
			userId,
		},
	});
}

export { findMessages, findMessagesSentByUser };
