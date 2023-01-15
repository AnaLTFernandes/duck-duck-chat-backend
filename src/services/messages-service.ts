import { messages } from "@prisma/client";
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

export type CreateMessageParams = Omit<messages, "id" | "date">;

export { findMessages, findMessagesSentByUser, createMessage };
