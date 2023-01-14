import * as messagesRepository from "repositories/messages-repository";

async function findMessages() {
	return messagesRepository.findMessages();
}

async function findMessagesSentByUser(userId: number) {
	return messagesRepository.findMessagesSentByUser(userId);
}

export { findMessages, findMessagesSentByUser };
