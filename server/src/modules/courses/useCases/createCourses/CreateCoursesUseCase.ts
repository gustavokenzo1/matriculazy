import { ICoursesRepository } from "../../repositories/ICoursesRepository";
import { PrismaCoursesRepository } from "../../repositories/prisma/PrismaCoursesRepository";

interface IRequest {
  url: string;
  name: string;
}

export class CreateCoursesUseCase {
  constructor(
    private coursesRepository: ICoursesRepository = new PrismaCoursesRepository()
  ) { }

  async execute({ url, name }: IRequest) {
    const courses = await this.coursesRepository.create({ url, name });

    return courses;
  }
}
