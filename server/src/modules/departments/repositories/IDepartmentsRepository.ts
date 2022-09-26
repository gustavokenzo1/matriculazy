import { Department } from "@prisma/client";
import { ICreateDepartmentsDTO } from "../dtos/ICreateDepartmentsDTO";

export interface IDepartmentsRepository {
  create(data: ICreateDepartmentsDTO): Promise<void>
  read(university: string): Promise<Department[]>
}