import { ICoursesRepository } from "../../repositories/ICoursesRepository";
import { PrismaCoursesRepository } from "../../repositories/prisma/PrismaCoursesRepository";

export class ListCoursesByUniversityUseCase {
  constructor(
    private coursesRepository: ICoursesRepository = new PrismaCoursesRepository()
  ) { }

  async execute(university: string) {
    const courses = await this.coursesRepository.findByUniversity(university);

    return courses;
  }
}