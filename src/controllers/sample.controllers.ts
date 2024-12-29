import { asyncHandler } from "../utils/async-handler";
// import { ApiError } from "../utils/api-error";

const testServer = asyncHandler((_, res) => {
  res.sendStatus(200);
});

export { testServer };
