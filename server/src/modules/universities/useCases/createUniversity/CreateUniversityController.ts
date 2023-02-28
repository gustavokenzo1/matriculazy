import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../../shared/errors/AppError";
import { CreateUniversityUseCase } from "./CreateUniversityUseCase";

export class CreateUniversityController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { university, url } = req.body

    const createUniversityUseCase = new CreateUniversityUseCase()

    try {
      await createUniversityUseCase.execute({ university, url })
      return next()
    } catch (error) {
      console.log(error);

      return res.status(400).json({ message: "Houve um erro ao criar a universidade" })
    }
  }
}