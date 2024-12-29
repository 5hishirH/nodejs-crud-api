import { ApiError } from "../utils/api-error";
import { asyncHandler } from "../utils/async-handler";
import { AnyZodObject } from "zod";

const validateResource = (schema: AnyZodObject) =>
  asyncHandler((req, _, next) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      throw new ApiError(400, "Invalid request!", error.errors);
    }
  });

export { validateResource };
