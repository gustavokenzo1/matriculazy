import { Request, Response } from "express";
import { ReadDepartmentsUseCase } from "./ReadDepartmentsUseCase";

export class ReadDepartmentsController {
  async handle(req: Request, res: Response) {
    const { university } = req.params

    const readDepartmentsUseCase = new ReadDepartmentsUseCase()

    const departments = await readDepartmentsUseCase.execute(university)

    return res.status(200).json(departments)
  }
}