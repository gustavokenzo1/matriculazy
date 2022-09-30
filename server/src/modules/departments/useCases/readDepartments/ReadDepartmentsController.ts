import { Request, Response } from "express";
import { ReadDepartmentsUseCase } from "./ReadDepartmentsUseCase";

export class ReadDepartmentsController {
  async handle(req: Request, res: Response) {
    const { university } = req.params

    const readDepartmentsUseCase = new ReadDepartmentsUseCase()

    try {
      const departments = await readDepartmentsUseCase.execute(university)

      return res.status(200).json(departments)
    } catch (error) {
      return res.status(400).json({ message: "Houve um erro ao listar os departamentos" })
    }
  }
}