import { UniversitiesRepository } from "../repositories/universities-repository";

export class ReadAllUniversitiesUseCase {
  constructor(private universitiesRepository: UniversitiesRepository) {}

  async execute() {
    const university = await this.universitiesRepository.readAll();

    return university;
  }
}
