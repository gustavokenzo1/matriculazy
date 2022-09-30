import { NextFunction, Request, Response } from "express";
import { CreateDepartmentsUseCase } from "./CreateDepartmentsUseCase";

export class CreateDepartmentsController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { url, university } = req.body

    const createDepartmentsUseCase = new CreateDepartmentsUseCase()

    try {
      await createDepartmentsUseCase.execute({ url, university })
  
      return next()
    } catch (error) {
      return res.status(400).json({ message: "Houve um erro ao criar os departamentos" })      
    }
  }
}