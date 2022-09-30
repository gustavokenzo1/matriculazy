import { Request, Response } from "express";
import { CreateCoursesUseCase } from "./CreateCoursesUseCase";

export class CreateCoursesController {
  async handle(req: Request, res: Response) {
    const { url, university } = req.body;

    const createCoursesUseCase = new CreateCoursesUseCase();

    try {
      const courses = await createCoursesUseCase.execute({ url, university });

      return res.status(201).json(courses);
    } catch (error: any) {
      return res.status(400).json({ message: "Houve um erro ao criar os cursos" });
    }
  }
}