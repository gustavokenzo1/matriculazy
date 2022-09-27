import { IUniversitiesRepository } from "../../repositories/IUniversitiesRepository";
import { PrismaUniversitiesRepository } from "../../repositories/prisma/PrismaUniversitiesRepository";

export class ListUniversitiesUseCase {
  constructor(
    private universitiesRepository: IUniversitiesRepository = new PrismaUniversitiesRepository()
  ) { }

  async execute() {
    const universities = await this.universitiesRepository.list();

    return universities;
  }
}