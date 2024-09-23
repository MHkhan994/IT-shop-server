import {RequestHandler} from "express";
import {AnyZodObject} from "zod";

export const validateRequest = (zSchema: AnyZodObject): RequestHandler => {
  return async (req, res, next) => {
    const data = req.body;
    try {
      await zSchema.parseAsync(data);
      next();
    } catch (err) {
      next(err);
    }
  };
};