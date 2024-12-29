import { asyncHandler } from "../utils/async-handler";
import { ApiError } from "../utils/api-error";

const testServer = asyncHandler((_, res) => {
  throw new ApiError(400, "Test error!");
});

export { testServer };
