import { University } from "@prisma/client";

export interface IUniversitiesRepository {
  create(university: string, url: string): Promise<University>
  find(university: string): Promise<University | null>
  list(): Promise<University[]>
}