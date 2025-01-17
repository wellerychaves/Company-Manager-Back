import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import {
	createUserSchema,
	userLoginSchema,
} from "../interfaces/user.interface";

import { createUserController } from "../controllers/users/userCreate.controller";
import { deleteUserController } from "../controllers/users/userDelete.controller";
import { listUserController } from "../controllers/users/userList.controller";
import { listOneUserController } from "../controllers/users/userListOne.controller";
import { userLoginController } from "../controllers/users/userLogin.controller";
import { updateUserController } from "../controllers/users/userUpdate.controller";

export const user = new Hono();

user.get("/", (c) => listUserController(c));
user.get("/:id", (c) => listOneUserController(c));
user.post("/", zValidator("json", createUserSchema), (c) =>
	createUserController(c),
);
user.delete("/:id", (c) => deleteUserController(c));
user.post("/login", zValidator("json", userLoginSchema), (c) =>
	userLoginController(c),
);
user.patch("/:id", (c) => updateUserController(c));

user.notFound((c) => {
	return c.text("Not Found", 404);
});
