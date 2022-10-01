import { Stats } from "@prisma/client";
import { IStatsRepository } from "../../repositories/IStatsRepository";
import { PrismaStatsRepository } from "../../repositories/prisma/PrismaStatsRepository";

export class ReadStatsUseCase {
  constructor(
    private statsRepository: IStatsRepository = new PrismaStatsRepository()
  ) {}

  async execute(): Promise<Stats> {
    const stats = await this.statsRepository.read();

    return stats;
  }
}