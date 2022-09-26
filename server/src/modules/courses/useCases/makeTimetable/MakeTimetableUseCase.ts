import { Course } from "@prisma/client";
import { ICoursesRepository } from "../../repositories/ICoursesRepository";
import { PrismaCoursesRepository } from "../../repositories/prisma/PrismaCoursesRepository";

export class MakeTimetableUseCase {
  constructor(
    private coursesRepository: ICoursesRepository = new PrismaCoursesRepository()
  ) {}

  async execute(courses: Course[]) {
    const timetable = await this.coursesRepository.makeTimetable(courses);

    return timetable;
  }
}