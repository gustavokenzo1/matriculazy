import { Request, Response } from "express";
import { DeleteCoursesUseCase } from "./DeleteCoursesUseCase";

export class DeleteCoursesController {
  async handle(req: Request, res: Response) {
    const { university } = req.body;

    const deleteCoursesUseCase = new DeleteCoursesUseCase();

    await deleteCoursesUseCase.execute(university);

    return res.status(200).json({ message: "Courses deleted" });
  }
}