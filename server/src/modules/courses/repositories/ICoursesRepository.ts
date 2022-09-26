import { Course } from "@prisma/client";
import { ICreateCoursesDTO } from "../dtos/ICreateCoursesDTO";

export interface ICoursesRepository {
  create(data: ICreateCoursesDTO): Promise<void>
  findByUniversity(university: string): Promise<Course[]>
  findByDeparment(department: string, university: string): Promise<Course[]>
  delete(university: string): Promise<void>
  makeTimetable(courses: Course[]): Promise<Course[][]>
}
