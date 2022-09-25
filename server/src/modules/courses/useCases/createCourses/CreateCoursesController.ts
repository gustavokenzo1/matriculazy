import { Request, Response } from "express";
import { CreateCoursesUseCase } from "./CreateCoursesUseCase";

export class CreateCoursesController {
  async handle(req: Request, res: Response) {
    const { url, university } = req.body;

    const createCoursesUseCase = new CreateCoursesUseCase();

    const courses = await createCoursesUseCase.execute({ url, university });

    return res.status(201).json(courses);
  }
}