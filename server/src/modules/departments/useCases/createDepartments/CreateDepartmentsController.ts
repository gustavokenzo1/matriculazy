import { NextFunction, Request, Response } from "express";
import { CreateDepartmentsUseCase } from "./CreateDepartmentsUseCase";

export class CreateDepartmentsController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { url, university } = req.body

    const createDepartmentsUseCase = new CreateDepartmentsUseCase()
    await createDepartmentsUseCase.execute({ url, university })

    return next()
  }
}