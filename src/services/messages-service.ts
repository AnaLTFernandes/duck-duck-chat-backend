import { messages } from "@prisma/client";
import { notFoundError, unauthorizedError } from "helpers/errors";
import * as messagesRepository from "repositories/messages-repository";

async function findMessages() {
	return messagesRepository.findMessages();
}

async function findMessagesSentByUser(userId: number) {
	return messagesRepository.findMessagesSentByUser(userId);
}

async function createMessage(data: CreateMessageParams) {
	return messagesRepository.createMessage(data);
}

async function updateMessage(data: UpdateMessageParams) {
	const message = await messagesRepository.findMessageById(data.messageId);

	if (!message) throw notFoundError();

	if (message.userId !== data.userId) throw unauthorizedError();

	return messagesRepository.updateMessage(data);
}

async function deleteMessage(data: DeleteMessageParams) {
	const message = await messagesRepository.findMessageById(data.messageId);

	if (!message) throw notFoundError();

	if (message.userId !== data.userId) throw unauthorizedError();

	return messagesRepository.deleteMessage(data.messageId);
}

export type CreateMessageParams = Omit<messages, "id" | "date">;
export type UpdateMessageParams = Omit<messages, "id" | "date"> & {
	messageId: number;
};
export type DeleteMessageParams = {
	userId: number;
	messageId: number;
};

export {
	findMessages,
	findMessagesSentByUser,
	createMessage,
	updateMessage,
	deleteMessage,
};
