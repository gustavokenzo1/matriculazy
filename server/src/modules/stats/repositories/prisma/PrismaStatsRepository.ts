import { Stats } from "@prisma/client";
import { prisma } from "../../../../prisma";
import { IStatsRepository } from "../IStatsRepository";

export class PrismaStatsRepository implements IStatsRepository {
  async create(): Promise<void> {
    await prisma.stats.create({
      data: {
        timetablesCreated: 0,
      }
    })

    return;
  }

  async alreadyExists(): Promise<boolean> {
    const stats = await prisma.stats.findFirst();

    return !!stats;
  }

  async read(): Promise<Stats> {
    const stats = await prisma.stats.findFirst();

    return stats!;
  }

  async update(): Promise<void> {
    const stats = await prisma.stats.findFirst();

    await prisma.stats.update({
      where: {
        id: stats!.id
      },
      data: {
        timetablesCreated: stats!.timetablesCreated + 1
      }
    })

    return;
  }
}