import { Request, Response } from "express";
import { ListUniversitiesUseCase } from "./ListUniversitiesUseCase";

export class ListUniversitiesController {
  async handle(req: Request, res: Response) {
    const listUniversitiesUseCase = new ListUniversitiesUseCase()
    const universities = await listUniversitiesUseCase.execute()

    return res.status(200).json(universities)
  }
}