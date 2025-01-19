import { describe, expect, test } from "bun:test";
import { app } from "../app";
import type { ICompany } from "../interfaces/company.interface";
import type { IUser } from "../interfaces/user.interface";

describe("Company Route Tests", () => {
	let userId: string;
	let companyId: string;
	test("GET /companies - List all companies", async () => {
		const res = await app.request("/companies");
		expect(res.status).toBe(200);
	});

	test("POST /companies - Create a company", async () => {
		const testUser = {
			firstName: "Test",
			secondName: "User",
			email: "testCompany@mail.com",
			password: "TestPassword123",
		};

		const res = await app.request("/users", {
			method: "POST",
			body: JSON.stringify(testUser),
			headers: { "Content-Type": "application/json" },
		});

		const users: IUser = await res.json();
		const user = users[0];
		userId = user.id;

		const testCompany = {
			userId: `${userId}`,
			companyName: "Company Test",
			companyEmail: "testCompany@mail.com",
			contactPhone: "(00)91234-5678",
			address: "Test st.",
			description: "Test company description",
		};

		const companyRes = await app.request("companies", {
			method: "POST",
			body: JSON.stringify(testCompany),
			headers: { "Content-Type": "application/json" },
		});

		const companies: ICompany = await companyRes.json();
		const company = companies[0];
		companyId = company.id;

		expect(companyRes.status).toBe(201);
		expect(company.companyEmail).toBe("testCompany@mail.com");
	});

	test("DELETE /companies/:id - Delete a company", async () => {
		const companyRes = await app.request(`/companies/${companyId}`, {
			method: "DELETE",
		});
		expect(companyRes.status).toBe(200);

		const resBody = await companyRes.json();
		expect(resBody).toEqual({ message: "Company Deleted" });

		const res = await app.request(`/users/${userId}`, {
			method: "DELETE",
		});
		expect(res.status).toBe(200);

		/* 
		const checkRes = await app.request(`/users/${userId}`);
		
		expect(checkRes.status).toBe(404);
		*/
	});
});
