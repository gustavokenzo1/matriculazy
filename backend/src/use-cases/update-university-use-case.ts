import { UniversitiesRepository } from "../repositories/universities-repository";

interface UpdateUniversityUseCaseRequest {
  university: string;
  initials: string;
  courses: object[][];
  url: string;
}

export class UpdateUniversityUseCase {
  constructor(private universitiesRepository: UniversitiesRepository) {}

  async execute(request: UpdateUniversityUseCaseRequest) {
    const { university, initials, courses, url } = request;

    await this.universitiesRepository.update({
      university,
      initials,
      courses,
      url,
    });
  }
}
