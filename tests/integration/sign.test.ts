import { faker } from "@faker-js/faker";
import supertest from "supertest";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import server from "server";
import { cleanDatabase } from "../utils/clean-database";
import { createCustomUser, createUser } from "../factories";
import { prisma } from "database/prisma";

const app = supertest(server);

beforeEach(async () => {
	await cleanDatabase();
});

describe("POST /sign-up", () => {
	const route = "/sign-up";

	it("should return status 400 when body is invalid", async () => {
		const body = { username: faker.fake.name };
		const response = await app.post(route).send(body);
		expect(response.status).toBe(httpStatus.BAD_REQUEST);
	});

	it("should return status 409 when there is a user with the sent email", async () => {
		const user = await createUser();
		const newUserBody = {
			username: faker.name.firstName(),
			image: faker.image.avatar(),
			password: faker.internet.password(),
			email: user.email,
		};

		const response = await app.post(route).send(newUserBody);
		expect(response.status).toBe(httpStatus.CONFLICT);
	});

	it("should return status 409 when there is a user with the sent username", async () => {
		const user = await createUser();
		const newUserBody = {
			email: faker.internet.email(),
			image: faker.image.avatar(),
			password: faker.internet.password(),
			username: user.username,
		};

		const response = await app.post(route).send(newUserBody);
		expect(response.status).toBe(httpStatus.CONFLICT);
	});

	it("should return status 204 and no body when data is valid", async () => {
		const body = {
			email: faker.internet.email(),
			image: faker.image.avatar(),
			password: faker.internet.password(),
			username: faker.fake.name,
		};

		const response = await app.post(route).send(body);

		expect(response.status).toBe(httpStatus.NO_CONTENT);
		expect(response.body).toEqual({});
	});

	it("should save a new user in database", async () => {
		const body = {
			email: faker.internet.email(),
			image: faker.image.avatar(),
			password: faker.internet.password(),
			username: faker.fake.name,
		};

		const initialDbCount = await prisma.users.count();

		await app.post(route).send(body);

		const finalDbCount = await prisma.users.count();

		expect(finalDbCount).toBe(initialDbCount + 1);
	});
});

describe("POST /sign-in", () => {
	const route = "/sign-in";

	it("should return status 400 when body is invalid", async () => {
		const body = { email: faker.fake.name };
		const response = await app.post(route).send(body);
		expect(response.status).toBe(httpStatus.BAD_REQUEST);
	});

	it("should return status 400 when there is no user with sent data", async () => {
		const body = {
			email: faker.internet.email(),
			password: faker.lorem.word(),
		};

		const response = await app.post(route).send(body);
		expect(response.status).toBe(httpStatus.BAD_REQUEST);
	});

	it("should return status 200 and a session token when data is valid", async () => {
		const password = faker.word.noun();
		const hashedPassword = await bcrypt.hash(password, 13);
		const { email } = await createCustomUser({
			password: hashedPassword,
		});

		const response = await app.post(route).send({ email, password });

		expect(response.status).toBe(httpStatus.OK);
		expect(response.body).toEqual({ token: expect.any(String) });
	});

	it("should save a new session in database", async () => {
		const password = faker.word.noun();
		const hashedPassword = await bcrypt.hash(password, 13);
		const { email } = await createCustomUser({
			password: hashedPassword,
		});

		const initialDbCount = await prisma.sessions.count();

		await app.post(route).send({ email, password });

		const finalDbCount = await prisma.sessions.count();

		expect(finalDbCount).toBe(initialDbCount + 1);
	});
});
