import { Request, Response } from "express";
import { ListCoursesByUniversityUseCase } from "./ListCoursesByUniversityUseCase";

export class ListCoursesByUniversityController {
  async handle(req: Request, res: Response) {
    const { university } = req.body;

    const listCoursesByUniversityUseCase = new ListCoursesByUniversityUseCase()
    const courses = await listCoursesByUniversityUseCase.execute(university);

    return res.status(200).json(courses);
  }
}