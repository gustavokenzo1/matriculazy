import { prisma } from '../../../../prisma';
import { getCourses } from '../../../../utils/getCourses';
import { getDepartments } from '../../../../utils/getDepartments';
import { ICreateCoursesDTO } from '../../dtos/ICreateCoursesDTO';
import { ICoursesRepository } from '../ICoursesRepository'

export class PrismaCoursesRepository implements ICoursesRepository {
  async create(data: ICreateCoursesDTO) {
    const { url, name } = data;

    const departments = await getDepartments(url);
    const courses = await getCourses(departments, url);

    for (const course of courses) {
      if (course) {
        await prisma.course.create({
          data: {
            name: course.name,
            code: course.code,
            classroom: course.classroom,
            schedule: course.schedule,
            location: course.location,
            semester: course.semester,
            teacher: course.teacher,
            department: course.department,
            university: name,
          },
        });
      }
    }
  }
}