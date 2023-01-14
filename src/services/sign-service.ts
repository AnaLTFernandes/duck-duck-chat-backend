import { users } from "@prisma/client";
import bcrypt from "bcrypt";
import { conflictError } from "helpers/errors";
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

export type CreateUserParams = Omit<users, "id">;

export { createUser };
