import { IStatsRepository } from "../../repositories/IStatsRepository";
import { PrismaStatsRepository } from "../../repositories/prisma/PrismaStatsRepository";

export class CreateStatsUseCase {
  constructor(
    private statsRepository: IStatsRepository = new PrismaStatsRepository()
  ) { }

  async execute(): Promise<void> {
    if (!await this.statsRepository.alreadyExists()) {
      await this.statsRepository.create();
    }
  }
}