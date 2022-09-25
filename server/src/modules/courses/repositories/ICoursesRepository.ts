import { ICreateCoursesDTO } from "../dtos/ICreateCoursesDTO";

export interface ICoursesRepository {
  create(data: ICreateCoursesDTO): Promise<void>;
}
