import server from "server";
import supertest from "supertest";

const app = supertest(server);

describe("conection test", () => {
	it("should return the status text", async () => {
		const expectedResult = "It's alive!!!";
		const result = await app.get("/status");
		expect(result.text).toBe(expectedResult);
	});
});
