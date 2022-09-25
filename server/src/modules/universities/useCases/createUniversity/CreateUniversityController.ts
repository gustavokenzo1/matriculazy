import { NextFunction, Request, Response } from "express";
import { CreateUniversityUseCase } from "./CreateUniversityUseCase";

export class CreateUniversityController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { university, url } = req.body

    const createUniversityUseCase = new CreateUniversityUseCase()
    await createUniversityUseCase.execute({ university, url })

    return next()
  }
}