import { NextFunction, Request, Response } from "express";
import { ReadStatsUseCase } from "./ReadStatsUseCase";

export class ReadStatsController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const readStatsUseCase = new ReadStatsUseCase()

    const stats = await readStatsUseCase.execute();

    return res.status(200).json(stats);
  }
}