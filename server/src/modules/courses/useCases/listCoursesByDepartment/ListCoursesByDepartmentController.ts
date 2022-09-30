import { Request, Response } from "express";
import { ListCoursesByDepartmentUseCase } from "./ListCoursesByDepartmentUseCase";

export class ListCoursesByDepartmentController {
  async handle(req: Request, res: Response) {
    const { department, university } = req.query;

    const listCoursesByDepartmentUseCase = new ListCoursesByDepartmentUseCase();

    try {
      const courses = await listCoursesByDepartmentUseCase.execute(department as string, university as string);

      return res.status(200).json(courses);
    } catch (error) {
      return res.status(400).json({ message: "Houve um erro ao listar os cursos" });
    }
  }
}