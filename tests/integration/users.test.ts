import server from "server";
import supertest from "supertest";
import { createUser } from "../factories/users-factory";
import { cleanDatabase } from "../helpers/clean-database";

const app = supertest(server);

beforeAll(async () => {
	await cleanDatabase();
});

describe("GET /users", () => {
	it("should return a empty array when there is no users", async () => {
		const response = await app.get("/users");

		expect(response.body).toEqual([]);
	});

	it("should return all users", async () => {
		const users = await createUser();
		const response = await app.get("/users");

		expect(response.body).toEqual([
			{ id: users.id, username: users.username, image: users.image },
		]);
	});
});
