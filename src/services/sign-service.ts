import { users } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { badRequestError, conflictError } from "helpers/errors";
import * as signRepository from "repositories/sign-repository";

async function createUser(user: CreateUserParams) {
	const existUserWithEmail = await signRepository.findUserByEmail(user.email);
	if (existUserWithEmail) throw conflictError();

	const existUserWithUsername = await signRepository.findUserByUsername(
		user.username
	);
	if (existUserWithUsername) throw conflictError();

	const hashedPassword = await bcrypt.hash(user.password, 13);

	return signRepository.createUser({ ...user, password: hashedPassword });
}

async function createSession(credentials: CreateSessionParams) {
	const user = await signRepository.findUserByEmail(credentials.email);

	if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
		throw badRequestError();
	}

	const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET);

	await signRepository.createSession({ userId: user.id, token });

	return { token };
}

async function finishSession(sessionId: number) {
	return signRepository.updateActiveSession(sessionId);
}

export type CreateUserParams = Omit<users, "id">;
export type CreateSessionParams = Omit<users, "id" | "username" | "image">;

export { createUser, createSession, finishSession };
