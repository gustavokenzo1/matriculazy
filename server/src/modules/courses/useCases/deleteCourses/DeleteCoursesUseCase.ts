import { ICoursesRepository } from "../../repositories/ICoursesRepository";
import { PrismaCoursesRepository } from "../../repositories/prisma/PrismaCoursesRepository";

export class DeleteCoursesUseCase {
  constructor(
    private coursesRepository: ICoursesRepository = new PrismaCoursesRepository()
  ) { }

  async execute(university: string) {
    await this.coursesRepository.delete(university);
  }
}