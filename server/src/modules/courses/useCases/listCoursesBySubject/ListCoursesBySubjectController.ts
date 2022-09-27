import { Request, Response } from "express";
import { ListCoursesBySubjectUseCase } from "./ListCoursesBySubjectUseCase";

export class ListCoursesBySubjectController {
  async handle(req: Request, res: Response) {
    const { subject, university } = req.body;

    const listCoursesBySubjectUseCase = new ListCoursesBySubjectUseCase()
    const courses = await listCoursesBySubjectUseCase.execute(university, subject);

    return res.status(200).json({
      found: courses.length,
      courses
    });
  }
}