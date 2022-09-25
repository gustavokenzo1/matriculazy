import { ICoursesRepository } from "../../repositories/ICoursesRepository";
import { PrismaCoursesRepository } from "../../repositories/prisma/PrismaCoursesRepository";

export class ListCoursesByDepartmentUseCase {
  constructor(
    private coursesRepository: ICoursesRepository = new PrismaCoursesRepository()
  ) { }

  async execute(department: string, university: string) {
    const courses = await this.coursesRepository.findByDeparment(department, university);

    return courses;
  }
}