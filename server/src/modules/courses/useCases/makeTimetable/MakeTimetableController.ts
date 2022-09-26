import { Request, Response } from "express";
import { MakeTimetableUseCase } from "./MakeTimetableUseCase";

export class MakeTimetableController {
  async handle(req: Request, res: Response) {
    const { courses } = req.body;

    const makeTimetableUseCase = new MakeTimetableUseCase();

    const timetable = await makeTimetableUseCase.execute(courses);

    return res.json(timetable);
  }
}