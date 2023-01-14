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

function createSession(data: CreateSessionParams) {
	return prisma.sessions.create({
		data: {
			...data,
		},
	});
}

function findActiveSessionByUserId(userId: number) {
	return prisma.sessions.findFirst({
		where: {
			userId,
			active: true,
		},
	});
}

function updateActiveSession(id: number) {
	return prisma.sessions.update({
		where: {
			id,
		},
		data: {
			active: false,
		},
	});
}

type CreateUserParams = Omit<users, "id">;
type CreateSessionParams = { userId: number; token: string };

export {
	createUser,
	findUserByEmail,
	findUserByUsername,
	createSession,
	findActiveSessionByUserId,
	updateActiveSession,
};
