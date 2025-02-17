
import request from "supertest";
import app from "../server.js";
import { sequelize } from "../utility/db.js";
import { jest } from "@jest/globals";

jest.setTimeout(10000);

beforeAll(async () => {
    await sequelize.sync({ alter: true });
});

afterAll(async () => {
    await sequelize.close();
    await new Promise(resolve => setTimeout(resolve, 1000))
});

describe("Testowanie routingu aplikacji", () => {
    test("GET / powinno zwrócić status 200", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });

    test("GET /courses powinno zwrócić status 200", async () => {
        const response = await request(app).get("/courses");
        expect(response.statusCode).toBe(200);
    });

    test("GET /nonexistent powinno zwrócić status 404", async () => {
        const response = await request(app).get("/nonexistent");
        expect(response.statusCode).toBe(404);
    });

    test("GET / powinno zwrócić nagłówek content-type", async () => {
        const response = await request(app).get("/");
        expect(response.headers['content-type']).toMatch(/html/);
    });
});
