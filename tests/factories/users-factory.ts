import { prisma } from "../../src/database/prisma";
import { faker } from "@faker-js/faker";
import { users } from "@prisma/client";

function createUser() {
	return prisma.users.create({
		data: {
			username: faker.name.firstName(),
			email: faker.internet.email(),
			image: faker.image.avatar(),
			password: faker.internet.password(),
		},
	});
}

function createCustomUser(data: CreateCustomUserParams) {
	return prisma.users.create({
		data: {
			username: faker.name.firstName(),
			email: faker.internet.email(),
			image: faker.image.avatar(),
			password: faker.internet.password(),
			...data
		},
	});
}

type CreateCustomUserParams = Partial<Omit<users, 'id'>>

export { createUser, createCustomUser };
