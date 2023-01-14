import { faker } from "@faker-js/faker";
import { users } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createCustomUser, createSession } from "../factories";

async function generateValidUser() {
	const password = faker.word.noun();
	const hashedPassword = await bcrypt.hash(password, 13);
	const user = await createCustomUser({
		password: hashedPassword,
	});

	return { ...user, password };
}

async function generateValidToken(user?: users) {
	const { id } = user || (await generateValidUser());
	const token = jwt.sign({ user: id }, process.env.JWT_SECRET);
	const authorization = `Bearer ${token}`;

	await createSession({ userId: id, token });

	return authorization;
}

export { generateValidUser, generateValidToken };
