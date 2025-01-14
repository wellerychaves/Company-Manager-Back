import { Hono } from "hono";
import { routes } from "./routers/index.routes";

export const app = new Hono();

app.route("/", routes);

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

export default {
	port: 1337,
	fetch: app.fetch,
};
