import { Request, Response } from "express";
import { ListCoursesByUniversityUseCase } from "./ListCoursesByUniversityUseCase";

export class ListCoursesByUniversityController {
  async handle(req: Request, res: Response) {
    const { university } = req.body;

    const listCoursesByUniversityUseCase = new ListCoursesByUniversityUseCase()

    try {
      const courses = await listCoursesByUniversityUseCase.execute(university);

      return res.status(200).json(courses);
    } catch (error) {
      return res.status(400).json({ message: "Houve um erro ao listar os cursos" });
    }
  }
}