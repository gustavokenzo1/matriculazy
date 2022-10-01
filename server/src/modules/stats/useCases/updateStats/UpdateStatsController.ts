import { Request, Response, NextFunction } from "express";
import { UpdateStatsUseCase } from "./UpdateStatsUseCase";

export class UpdateStatsController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const updateStatsUseCase = new UpdateStatsUseCase()

    await updateStatsUseCase.execute();

    return next();
  }
}