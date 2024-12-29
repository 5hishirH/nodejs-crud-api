import { Request, Response, NextFunction, RequestHandler } from "express";

const asyncHandler = (requestHandler: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } catch (error: any) {
      console.error(error); // Log the error for debugging

      res.status(error.statusCode).send({ message: error.message, ...error });
    }
  };
};

export { asyncHandler };
