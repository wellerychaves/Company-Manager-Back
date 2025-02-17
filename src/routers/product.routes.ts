import { Hono } from "hono";

import { createProductController } from "../controllers/products/productCreate.controller";
import { deleteProductController } from "../controllers/products/productDelete.controller";
import { listProductController } from "../controllers/products/productList.controller";
import { listOneProductController } from "../controllers/products/productListOne.controller";
import { updateProductController } from "../controllers/products/productUpdate.controller";

export const product = new Hono();

product.get("/", (c) => listProductController(c));
product.get("/:id", (c) => listOneProductController(c));
product.post("/", (c) => createProductController(c));
product.patch("/:id", (c) => updateProductController(c));
product.delete("/:id", (c) => deleteProductController(c));

product.notFound((c) => {
	return c.text("Not Found", 404);
});
