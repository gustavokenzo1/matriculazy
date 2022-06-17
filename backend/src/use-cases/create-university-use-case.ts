import { UniversitiesRepository } from "../repositories/universities-repository";

interface CreateUniversityUseCaseRequest {
  name: string;
  initials: string;
}

export class CreateUniversityUseCase {
  constructor(private universitiesRepository: UniversitiesRepository) {}

  async execute(request: CreateUniversityUseCaseRequest) {
    const { name, initials } = request;

    await this.universitiesRepository.create({ name, initials });
  }
}
