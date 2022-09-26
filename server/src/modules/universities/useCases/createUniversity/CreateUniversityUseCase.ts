import { AppError } from "../../../../shared/errors/AppError";
import { IUniversitiesRepository } from "../../repositories/IUniversitiesRepository";
import { PrismaUniversitiesRepository } from "../../repositories/prisma/PrismaUniversitiesRepository";

interface IRequest {
  university: string,
  url: string
}

export class CreateUniversityUseCase {
  constructor(
    private universitiesRepository: IUniversitiesRepository = new PrismaUniversitiesRepository()
  ) { }

  async execute({ university, url }: IRequest) { 
    const universityExists = await this.universitiesRepository.find(university)

    if (universityExists) {
      throw new AppError("Universidade já existe")
    }

    const createdUniversity = await this.universitiesRepository.create(university, url)

    return createdUniversity
  }
}