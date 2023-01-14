import { users } from "@prisma/client";
import { prisma } from "database/prisma";

function createUser(user: CreateUserParams) {
	return prisma.users.create({ data: user });
}

function findUserByEmail(email: string) {
	return prisma.users.findUnique({
		where: {
			email,
		},
	});
}

function findUserByUsername(username: string) {
	return prisma.users.findFirst({
		where: {
			username,
		},
	});
}

type CreateUserParams = Omit<users, "id">;

export { createUser, findUserByEmail, findUserByUsername };
