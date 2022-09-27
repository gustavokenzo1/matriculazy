import { Course } from "@prisma/client";
import { ICoursesRepository } from "../../repositories/ICoursesRepository";
import { PrismaCoursesRepository } from "../../repositories/prisma/PrismaCoursesRepository";

export class ListCoursesBySubjectUseCase {
  constructor(
    private coursesRepository: ICoursesRepository = new PrismaCoursesRepository()
  ) { }

  async execute(university: string, subject: string): Promise<Course[]> {
    const courses = await this.coursesRepository.findBySubject(university, subject);

    return courses;
  }
}