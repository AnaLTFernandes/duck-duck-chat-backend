import { faker } from "@faker-js/faker";
import supertest from "supertest";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import server from "server";
import { prisma } from "database/prisma";
import { cleanDatabase } from "../helpers/clean-database";
import { createUser } from "../factories";
import {
	generateValidToken,
	generateValidUser,
} from "../helpers/generate-data";

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
		const { email, password } = await generateValidUser();

		const response = await app.post(route).send({ email, password });

		expect(response.status).toBe(httpStatus.OK);
		expect(response.body).toEqual({ token: expect.any(String) });
	});

	it("should save a new session in database", async () => {
		const { email, password } = await generateValidUser();

		const initialDbCount = await prisma.sessions.count();

		await app.post(route).send({ email, password });

		const finalDbCount = await prisma.sessions.count();

		expect(finalDbCount).toBe(initialDbCount + 1);
	});
});

describe("POST /sign-out", () => {
	const route = "/sign-out";

	it("should return status 401 when no token is sent", async () => {
		const response = await app.post(route);
		expect(response.status).toBe(httpStatus.UNAUTHORIZED);
	});

	it("should return status 401 when token is invalid", async () => {
		const token = `Bearer ${faker.lorem.words()}`;
		const response = await app.post(route).set("Authorization", token);
		expect(response.status).toBe(httpStatus.UNAUTHORIZED);
	});

	describe("when token is valid", () => {
		it("should return status 401 if there is no active session for the user", async () => {
			const { id } = await generateValidUser();
			const token = jwt.sign({ user: id }, process.env.JWT_SECRET);
			const authorization = `Bearer ${token}`;

			const response = await app
				.post(route)
				.set("Authorization", authorization);

			expect(response.status).toBe(httpStatus.UNAUTHORIZED);
		});

		it("should return status 204 and no body", async () => {
			const token = await generateValidToken();

			const response = await app.post(route).set("Authorization", token);

			expect(response.status).toBe(httpStatus.NO_CONTENT);
			expect(response.body).toEqual({});
		});

		it("should update the session in database", async () => {
			const token = await generateValidToken();
			const testToken = token.replace("Bearer ", "");

			const initialSession = await prisma.sessions.findFirst({
				where: { token: testToken },
			});

			await app.post(route).set("Authorization", token);

			const finalSession = await prisma.sessions.findFirst({
				where: { token: testToken },
			});

			expect(initialSession.active).toBe(true);
			expect(finalSession.active).toBe(false);
		});
	});
});
