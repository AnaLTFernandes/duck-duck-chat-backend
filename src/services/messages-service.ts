import * as messagesRepository from "repositories/messages-repository";

async function findMessages() {
	return messagesRepository.findMessages();
}

export { findMessages };
