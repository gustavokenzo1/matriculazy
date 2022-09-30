import { Request, Response } from "express";
import { ListCoursesBySubjectUseCase } from "./ListCoursesBySubjectUseCase";

export class ListCoursesBySubjectController {
  async handle(req: Request, res: Response) {
    const { subject, university } = req.query;

    const listCoursesBySubjectUseCase = new ListCoursesBySubjectUseCase()

    try {
      const courses = await listCoursesBySubjectUseCase.execute(university as string, subject as string);

      return res.status(200).json({
        found: courses.length,
        courses
      });
    } catch (error) {
      return res.status(400).json({ message: "Houve um erro ao listar os cursos" });
    }
  }
}