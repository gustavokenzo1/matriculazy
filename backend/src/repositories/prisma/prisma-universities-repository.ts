import { prisma } from "../../prisma";
import { IUniversity, UniversitiesRepository } from "../universities-repository";

export class PrismaUniversitiesRepository implements UniversitiesRepository {
  async create(data: IUniversity) {
    const { name, initials } = data;

    await prisma.university.create({
      data: {
        name,
        initials,
      },
    });
  }
}
