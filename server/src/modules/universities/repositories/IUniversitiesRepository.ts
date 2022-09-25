import { University } from "@prisma/client";

export interface IUniversitiesRepository {
  create(university: string, url: string): Promise<University>
}