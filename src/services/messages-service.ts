import { messages } from "@prisma/client";
import { notFoundError, unauthorizedError } from "../helpers/errors";
import * as messagesRepository from "../repositories/messages-repository";

async function findMessages() {
	const messages = await messagesRepository.findMessages();
	const formatedMessages = formatMessages(messages);
	return formatedMessages;
}

async function findMessagesSentByUser(userId: number) {
	const messages = await messagesRepository.findMessagesSentByUser(userId);
	const formatedMessages = formatMessages(messages);
	return formatedMessages;
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

function formatMessages(messages: FormatMessagesParams) {
	return messages.map(({ users, ...data }) => ({
		...data,
		userImage: users.image,
		username: users.username,
	}));
}

type FormatMessagesParams = (messages & {
	users: {
		username: string;
		image: string;
	};
})[];

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
