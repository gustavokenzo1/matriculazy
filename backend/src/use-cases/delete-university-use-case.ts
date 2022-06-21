import { UniversitiesRepository } from "../repositories/universities-repository";

interface DeleteUniversityUseCaseRequest {
  initials: string;
}

export class DeleteUniversityUseCase {
  constructor(private universitiesRepository: UniversitiesRepository) {}

  async execute(request: DeleteUniversityUseCaseRequest) {
    const { initials } = request;

    await this.universitiesRepository.delete(initials);
  }
}
