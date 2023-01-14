import supertest from "supertest";
import httpStatus from "http-status";
import server from "server";
import { cleanDatabase } from "../helpers/clean-database";
import { generateValidUser } from "../helpers/generate-data";
import { createMessage } from "../factories";

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
