import { Hono } from "hono";
import { company } from "./company.routes";
import { product } from "./product.routes";
import { user } from "./user.routes";

export const routes = new Hono();

routes.route("/companies", company);
routes.route("/users", user);
routes.route("/products", product);
