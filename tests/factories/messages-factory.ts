import { faker } from "@faker-js/faker";
import { prisma } from "database/prisma";

function createMessage(userId: number) {
	return prisma.messages.create({
		data: {
			userId,
			text: faker.lorem.sentence(),
		},
	});
}

export { createMessage };
