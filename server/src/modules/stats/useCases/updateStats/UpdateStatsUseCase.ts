import { IStatsRepository } from "../../repositories/IStatsRepository";
import { PrismaStatsRepository } from "../../repositories/prisma/PrismaStatsRepository";

export class UpdateStatsUseCase {
  constructor(
    private statsRepository: IStatsRepository = new PrismaStatsRepository()
  ) { }

  async execute(): Promise<void> {
    await this.statsRepository.update();

    return;
  }
}