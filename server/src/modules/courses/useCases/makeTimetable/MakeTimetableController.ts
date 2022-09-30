import { Request, Response } from "express";
import { MakeTimetableUseCase } from "./MakeTimetableUseCase";

export class MakeTimetableController {
  async handle(req: Request, res: Response) {
    const { courses } = req.body;

    const makeTimetableUseCase = new MakeTimetableUseCase();

    try {
      const timetable = await makeTimetableUseCase.execute(courses);

      return res.status(200).json(timetable);
    } catch (error) {
      return res.status(400).json({ message: "Houve um erro ao criar a grade horária" });
    }
  }
}