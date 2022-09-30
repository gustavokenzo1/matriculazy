import { Request, Response } from "express";
import { DeleteCoursesUseCase } from "./DeleteCoursesUseCase";

export class DeleteCoursesController {
  async handle(req: Request, res: Response) {
    const { university } = req.body;

    const deleteCoursesUseCase = new DeleteCoursesUseCase();

    try {
      await deleteCoursesUseCase.execute(university);

      return res.status(200).json({ message: "Courses deleted" });
    } catch (error) {
      return res.status(400).json({ message: "Houve um erro ao deletar os cursos" });
    }
  }
}