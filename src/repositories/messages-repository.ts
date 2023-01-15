import { messages } from "@prisma/client";
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

function createMessage(data: CreateMessageParams) {
	return prisma.messages.create({
		data: { ...data },
	});
}

type CreateMessageParams = Omit<messages, "id" | "date">;

export { findMessages, findMessagesSentByUser, createMessage };
