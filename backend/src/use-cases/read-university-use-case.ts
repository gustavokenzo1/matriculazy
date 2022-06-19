import { UniversitiesRepository } from "../repositories/universities-repository";

interface ReadUniversityUseCaseRequest {
  initials: string;
}

export class ReadUniversityUseCase {
  constructor (private universitiesRepository: UniversitiesRepository) {}

  async execute(request: ReadUniversityUseCaseRequest) {
    const { initials } = request;

    const university = await this.universitiesRepository.read(initials);

    return university;
  }
}
