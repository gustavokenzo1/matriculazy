import { UniversitiesRepository } from "../repositories/universities-repository";

interface CreateUniversityUseCaseRequest {
  university: string;
  initials: string;
  courses: object[][];
  url: string;
}

export class CreateUniversityUseCase {
  constructor(private universitiesRepository: UniversitiesRepository) {}

  async execute(request: CreateUniversityUseCaseRequest) {
    const { university, initials, courses, url } = request;

    await this.universitiesRepository.create({ university, initials, courses, url });
  }
}
