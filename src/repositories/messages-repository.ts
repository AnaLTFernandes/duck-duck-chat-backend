import { messages } from "@prisma/client";
import { prisma } from "../database/prisma";

function findMessages() {
	return prisma.messages.findMany({
		include: {
			users: {
				select: {
					image: true,
					username: true,
				},
			},
		},
	});
}

function findMessagesSentByUser(userId: number) {
	return prisma.messages.findMany({
		where: {
			userId,
		},
		include: {
			users: {
				select: {
					image: true,
					username: true,
				},
			},
		},
	});
}

function findMessageById(id: number) {
	return prisma.messages.findUnique({
		where: {
			id,
		},
	});
}

function createMessage(data: CreateMessageParams) {
	return prisma.messages.create({
		data: { ...data },
	});
}

function updateMessage({ messageId, ...data }: UpdateMessageParams) {
	return prisma.messages.update({
		where: {
			id: messageId,
		},
		data: { ...data },
	});
}

function deleteMessage(id: number) {
	return prisma.messages.delete({
		where: {
			id,
		},
	});
}

type CreateMessageParams = Omit<messages, "id" | "date">;
type UpdateMessageParams = Omit<messages, "id" | "date"> & {
	messageId: number;
};

export {
	findMessages,
	findMessagesSentByUser,
	findMessageById,
	createMessage,
	updateMessage,
	deleteMessage,
};
