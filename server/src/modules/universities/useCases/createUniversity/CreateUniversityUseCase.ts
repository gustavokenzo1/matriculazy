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
    const createdUniversity = this.universitiesRepository.create(university, url)

    return createdUniversity
  }
}