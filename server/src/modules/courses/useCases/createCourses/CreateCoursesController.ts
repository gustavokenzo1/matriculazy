import { Request, Response } from "express";
import { CreateCoursesUseCase } from "./CreateCoursesUseCase";

export class CreateCoursesController {
  async handle(req: Request, res: Response) {
    const { url, name } = req.body;

    const createCoursesUseCase = new CreateCoursesUseCase();

    const courses = await createCoursesUseCase.execute({ url, name });

    return res.status(201).json(courses);
  }
}