import { ICoursesRepository } from "../../repositories/ICoursesRepository";
import { PrismaCoursesRepository } from "../../repositories/prisma/PrismaCoursesRepository";

interface IRequest {
  url: string;
  university: string;
}

export class CreateCoursesUseCase {
  constructor(
    private coursesRepository: ICoursesRepository = new PrismaCoursesRepository()
  ) { }

  async execute({ url, university }: IRequest) {
    const courses = await this.coursesRepository.create({ url, university });

    return courses;
  }
}
