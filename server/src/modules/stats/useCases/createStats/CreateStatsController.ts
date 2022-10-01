import { NextFunction, Request, Response } from "express";
import { CreateStatsUseCase } from "./CreateStatsUseCase";

export class CreateStatsController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const createStatsUseCase = new CreateStatsUseCase()
      await createStatsUseCase.execute();

      return next();
    } catch (err) {
      return res.status(201).send();
    }
  }
}