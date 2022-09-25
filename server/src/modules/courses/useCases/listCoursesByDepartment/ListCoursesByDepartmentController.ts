import { Request, Response } from "express";
import { ListCoursesByDepartmentUseCase } from "./ListCoursesByDepartmentUseCase";

export class ListCoursesByDepartmentController {
  async handle(req: Request, res: Response) {
    const { department, university } = req.body;

    const listCoursesByDepartmentUseCase = new ListCoursesByDepartmentUseCase();

    const courses = await listCoursesByDepartmentUseCase.execute(department, university);

    return res.status(200).json(courses);
  }
}