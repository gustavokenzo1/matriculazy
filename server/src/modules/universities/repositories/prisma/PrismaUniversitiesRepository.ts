import { University } from "@prisma/client";
import { prisma } from "../../../../prisma";
import { IUniversitiesRepository } from "../IUniversitiesRepository";

export class PrismaUniversitiesRepository implements IUniversitiesRepository {
  async create(university: string, url: string): Promise<University> {
    const createdUniversity = await prisma.university.create({
      data: {
        name: university,
        url,
      },
    });

    return createdUniversity;
  }
}