import { describe, expect, test } from "bun:test";
import { app } from "../app";
import { type ICompany, companySchema } from "../interfaces/company.interface";
import type { IUser } from "../interfaces/user.interface";

describe("Company Route Tests", () => {
	let userId: string;
	let companyId: string;

	test("POST /companies - Create a company", async () => {
		const testUser = {
			firstName: "Test",
			secondName: "User",
			email: `testUser${new Date().getMilliseconds()}@mail.com`,
			password: "TestPassword123",
		};

		const userRes = await app.request("/users", {
			method: "POST",
			body: JSON.stringify(testUser),
			headers: { "Content-Type": "application/json" },
		});

		const users: IUser = await userRes.json();
		const user = users[0];
		userId = user.id;

		const testCompany = {
			userId: `${userId}`,
			companyName: "Company Test",
			companyEmail: `testCompany${new Date().getMilliseconds()}@mail.com`,
			contactPhone: "(00)91111-1111",
			address: "Test st.",
			description: "Test company description",
		};

		const companyRes = await app.request("companies", {
			method: "POST",
			body: JSON.stringify(testCompany),
			headers: { "Content-Type": "application/json" },
		});

		const company: ICompany = await companyRes.json();
		companyId = company[0].id;
		company[0].createdAt = new Date(company[0].createdAt);
		company[0].updatedAt = new Date(company[0].updatedAt);

		companySchema.parse(company[0]);

		expect(companyRes.status).toBe(201);
	});

	test("GET /companies - List all companies", async () => {
		const companyRes = await app.request("/companies");
		const company: ICompany = await companyRes.json();

		company[0].createdAt = new Date(company[0].createdAt);
		company[0].updatedAt = new Date(company[0].updatedAt);

		companySchema.parse(company[0]);

		expect(companyRes.status).toBe(200);
	});

	test("DELETE /companies/:id - Delete a company", async () => {
		const companyRes = await app.request(`/companies/${companyId}`, {
			method: "DELETE",
		});

		expect(companyRes.status).toBe(200);
		const resBody = await companyRes.json();
		expect(resBody).toEqual({ message: "Company Deleted" });

		const userRes = await app.request(`/users/${userId}`, {
			method: "DELETE",
		});

		expect(userRes.status).toBe(200);
	});
});
