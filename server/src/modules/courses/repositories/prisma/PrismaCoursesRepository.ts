import { Course } from '@prisma/client';
import { prisma } from '../../../../prisma';
import { getCourses } from '../../../../utils/getCourses';
import { ICreateCoursesDTO } from '../../dtos/ICreateCoursesDTO';
import { ICoursesRepository } from '../ICoursesRepository'

export class PrismaCoursesRepository implements ICoursesRepository {
  async create(data: ICreateCoursesDTO) {
    const { url, university } = data;

    const createdUniversity = await prisma.university.findFirst({
      where: {
        name: university
      }
    })

    const departments = await prisma.department.findMany({
      where: {
        universityId: createdUniversity!.id
      }
    })

    const courses = await getCourses(departments, url);

    for (const course of courses) {
      if (course) {
        const createdDepartment = await prisma.department.findFirst({
          where: {
            name: course.department,
            universityId: createdUniversity!.id,
          },
        });

        await prisma.course.create({
          data: {
            name: course.name,
            schedule: course.schedule,
            teacher: course.teacher,
            classroom: course.classroom,
            code: course.code,
            location: course.location,
            semester: course.semester,
            departmentId: createdDepartment!.id,
            universityId: createdUniversity!.id,
          },
        });
      }
    }
  }

  async findByUniversity(university: string): Promise<Course[]> {
    const courses = await prisma.course.findMany({
      where: {
        University: {
          name: university
        }
      }
    })

    return courses;
  }

  async findByDeparment(department: string, university: string): Promise<Course[]> {
    const courses = await prisma.course.findMany({
      where: {
        Department: {
          name: department,
          University: {
            name: university
          }
        }
      }
    })

    return courses;
  }

  async delete(university: string): Promise<void> {
    const universityToDelete = await prisma.university.findFirst({
      where: {
        name: university
      }
    })

    await prisma.course.deleteMany({
      where: {
        universityId: universityToDelete?.id
      }
    });

    await prisma.department.deleteMany({
      where: {
        universityId: universityToDelete?.id
      }
    });

    await prisma.university.deleteMany({
      where: {
        name: university
      }
    });
  }
}