import { ICreateDepartmentsDTO } from "../dtos/ICreateDepartmentsDTO";

export interface IDepartmentsRepository {
  create(data: ICreateDepartmentsDTO): Promise<void>
}