import supertest from "supertest";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import server from "server";
import { cleanDatabase } from "../helpers/clean-database";
import {
	generateValidToken,
	generateValidUser,
} from "../helpers/generate-data";
import { createMessage } from "../factories";
import { faker } from "@faker-js/faker";
import { prisma } from "database/prisma";

const app = supertest(server);

beforeEach(async () => {
	await cleanDatabase();
});

describe("GET /messages", () => {
	const route = "/messages";

	it("should return status 200 and an empty array when there is no messages", async () => {
		const response = await app.get(route);
		expect(response.status).toBe(httpStatus.OK);
		expect(response.body).toEqual([]);
	});

	it("should return status 200 and an messages array", async () => {
		const { id } = await generateValidUser();
		const message = await createMessage(id);

		const response = await app.get(route);

		expect(response.status).toBe(httpStatus.OK);
		expect(response.body).toEqual([
			{ ...message, date: message.date.toISOString() },
		]);
	});
});

describe("GET /messages/:userId", () => {
	const route = "/messages";

	it("should return status 400 when userId is invalid", async () => {
		const response = await app.get(`${route}/0`);
		expect(response.status).toBe(httpStatus.BAD_REQUEST);
	});

	it("should return status 200 and an empty array when user have not sent messages", async () => {
		const response = await app.get(`${route}/1`);
		expect(response.status).toBe(httpStatus.OK);
		expect(response.body).toEqual([]);
	});

	it("should return status 200 and the messages sent by user", async () => {
		const { id } = await generateValidUser();
		const message = await createMessage(id);

		const response = await app.get(`${route}/${id}`);

		expect(response.status).toBe(httpStatus.OK);
		expect(response.body).toEqual([
			{ ...message, date: message.date.toISOString() },
		]);
	});
});

describe("POST /messages", () => {
	const route = "/messages";

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

		it("should return status 400 when body is invalid", async () => {
			const token = await generateValidToken();
			const body = { [faker.lorem.word()]: faker.lorem.sentence() };

			const response = await app
				.post(route)
				.set("Authorization", token)
				.set(body);

			expect(response.status).toBe(httpStatus.BAD_REQUEST);
		});

		describe("when body is valid", () => {
			it("should return status 201 and no data", async () => {
				const token = await generateValidToken();
				const body = { text: faker.lorem.sentence() };

				const response = await app
					.post(route)
					.set("Authorization", token)
					.send(body);

				expect(response.status).toBe(httpStatus.CREATED);
				expect(response.body).toEqual({});
			});

			it("should save a new message in database", async () => {
				const token = await generateValidToken();
				const body = { text: faker.lorem.sentence() };

				const initialMessagesCount = await prisma.messages.count();

				await app.post(route).set("Authorization", token).send(body);

				const finalMessagesCount = await prisma.messages.count();

				expect(finalMessagesCount).toBe(initialMessagesCount + 1);
			});
		});
	});
});

describe("PUT /messages/:id", () => {
	const route = "/messages";

	it("should return status 401 when no token is sent", async () => {
		const response = await app.put(`${route}/1`);
		expect(response.status).toBe(httpStatus.UNAUTHORIZED);
	});

	it("should return status 401 when token is invalid", async () => {
		const token = `Bearer ${faker.lorem.words()}`;
		const response = await app.put(`${route}/1`).set("Authorization", token);
		expect(response.status).toBe(httpStatus.UNAUTHORIZED);
	});

	describe("when token is valid", () => {
		it("should return status 401 if there is no active session for the user", async () => {
			const { id } = await generateValidUser();
			const token = jwt.sign({ user: id }, process.env.JWT_SECRET);
			const authorization = `Bearer ${token}`;

			const response = await app
				.put(`${route}/1`)
				.set("Authorization", authorization);

			expect(response.status).toBe(httpStatus.UNAUTHORIZED);
		});

		it("should return status 400 when body is invalid", async () => {
			const token = await generateValidToken();
			const body = { [faker.lorem.word()]: faker.lorem.sentence() };

			const response = await app
				.put(`${route}/1`)
				.set("Authorization", token)
				.send(body);

			expect(response.status).toBe(httpStatus.BAD_REQUEST);
		});

		describe("when body is valid", () => {
			const body = { text: faker.lorem.sentence() };

			it("should return status 400 when id params is invalid", async () => {
				const token = await generateValidToken();

				const response = await app
					.put(`${route}/0`)
					.set("Authorization", token)
					.send(body);

				expect(response.status).toBe(httpStatus.BAD_REQUEST);
			});

			it("should return status 404 when there is no message with given id", async () => {
				const token = await generateValidToken();

				const response = await app
					.put(`${route}/1`)
					.set("Authorization", token)
					.send(body);

				expect(response.status).toBe(httpStatus.NOT_FOUND);
			});

			it("should return status 401 when user is not the owner of the message", async () => {
				const token = await generateValidToken();
				const otherUser = await generateValidUser();
				const message = await createMessage(otherUser.id);

				const response = await app
					.put(`${route}/${message.id}`)
					.set("Authorization", token)
					.send(body);

				expect(response.status).toBe(httpStatus.UNAUTHORIZED);
			});

			it("should return status 204 and no data", async () => {
				const user = await generateValidUser();
				const token = await generateValidToken(user);
				const message = await createMessage(user.id);

				const response = await app
					.put(`${route}/${message.id}`)
					.set("Authorization", token)
					.send(body);

				expect(response.status).toBe(httpStatus.NO_CONTENT);
			});
		});
	});
});
