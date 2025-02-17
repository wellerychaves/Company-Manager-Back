import { describe, expect, test } from "bun:test";
import { app } from "../app";
import type { ICompany } from "../interfaces/company.interface";
import type { IProduct } from "../interfaces/produtct.interface";
import type { IUser } from "../interfaces/user.interface";

describe("Product Route Tests", () => {
	let userId: string;
	let companyId: string;
	let productId: string;

	test("POST /products - Create a product", async () => {
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
		userId = users[0].id;

		const testCompany = {
			userId: `${userId}`,
			companyName: "Company Test",
			companyEmail: `testCompany${new Date().getMilliseconds()}@mail.com`,
			contactPhone: "(00)90000-0000",
			address: "Test st.",
			description: "Test company description",
		};

		const companyRes = await app.request("companies", {
			method: "POST",
			body: JSON.stringify(testCompany),
			headers: { "Content-Type": "application/json" },
		});

		const companies: ICompany = await companyRes.json();
		companyId = companies[0].id;

		const testProduct = {
			companyId: `${companyId}`,
			productName: "Product Name",
			quantity: 10,
			price: 2000,
			description: "Test product description",
		};

		const productRes = await app.request("/products", {
			method: "POST",
			body: JSON.stringify(testProduct),
			headers: { "Content-Type": "application/json" },
		});

		const products: IProduct = await productRes.json();
		productId = products.id;

		expect(productRes.status).toBe(201);
	});

	test("GET /products - List all products", async () => {
		const res = await app.request("/products");
		expect(res.status).toBe(200);
	});

	test("DELETE /products - delete a product", async () => {
		const productRes = await app.request(`/products/${productId}`, {
			method: "DELETE",
		});
		expect(productRes.status).toBe(200);

		const companyRes = await app.request(`/companies/${companyId}`, {
			method: "DELETE",
		});
		expect(companyRes.status).toBe(200);

		const userRes = await app.request(`/users/${userId}`, {
			method: "DELETE",
		});
		expect(userRes.status).toBe(200);
	});
});
