import { Request, Response } from "express";
import { ListUniversitiesUseCase } from "./ListUniversitiesUseCase";

export class ListUniversitiesController {
  async handle(req: Request, res: Response) {
    const listUniversitiesUseCase = new ListUniversitiesUseCase()

    try {
      const universities = await listUniversitiesUseCase.execute()
  
      return res.status(200).json(universities)
    } catch (error) {
      return res.status(400).json({ message: "Houve um erro ao listar as universidades" })      
    }
  }
}