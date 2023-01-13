import { prisma } from "../../src/database/prisma";
import { faker } from "@faker-js/faker";

function createUsers() {
	return prisma.users.create({
		data: {
			username: faker.name.firstName(),
			email: faker.internet.email(),
			image: faker.image.avatar(),
			password: faker.internet.password(),
		},
	});
}

export { createUsers };
