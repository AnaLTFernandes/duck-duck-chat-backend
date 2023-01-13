import server from "server";
import supertest from "supertest";
import { createUsers } from "../factories/users-factory";
import { cleanDatabase } from "../utils/clean-database";

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
		const users = await createUsers();
		const response = await app.get("/users");

		expect(response.body).toEqual([
			{ id: users.id, username: users.username, image: users.image },
		]);
	});
});
