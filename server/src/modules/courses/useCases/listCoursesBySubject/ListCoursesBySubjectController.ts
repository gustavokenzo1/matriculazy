import { Request, Response } from "express";
import { ListCoursesBySubjectUseCase } from "./ListCoursesBySubjectUseCase";

export class ListCoursesBySubjectController {
  async handle(req: Request, res: Response) {
    const { subject, university } = req.query;

    const listCoursesBySubjectUseCase = new ListCoursesBySubjectUseCase()
    const courses = await listCoursesBySubjectUseCase.execute(university as string, subject as string);

    return res.status(200).json({
      found: courses.length,
      courses
    });
  }
}