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
            simplifiedSchedule: course.simplifiedSchedule,
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

  makeTimetable(courses: Course[]): Promise<Course[][]> {
    const coursesBySubject = Object.values(courses.reduce((acc, course) => {
      if (acc[course.name]) {
        acc[course.name].push(course);
      } else {
        acc[course.name] = [course];
      }

      return acc;
    }, {} as Record<string, Course[]>))

    function recursion(args: Array<Array<object>>) {
      let onePossibleSchedule: any[] = [];
      let max = args.length - 1;

      function helper(arr: Array<object>, i: number) {
        if (args[i]) {
          for (let j = 0; j < args[i].length; j++) {
            let array_copy = arr.slice(0);
            array_copy.push(args[i][j]);
            if (i == max) onePossibleSchedule.push(array_copy);
            else helper(array_copy, i + 1);
          }
        }
      }
      helper([], 0);
      return onePossibleSchedule;
    }

    const allPossibleSchedules = recursion(coursesBySubject);

    const uniqueSchedules = allPossibleSchedules.filter((courses) => {
      const allSchedules: string[] = []

      courses.forEach((course: Course) => allSchedules.push(...course.simplifiedSchedule));

      const uniqueSchedules = [...new Set(allSchedules)];

      return uniqueSchedules.length === allSchedules.length;
    })

    return Promise.resolve(uniqueSchedules);
  }

  async findBySubject(university: string, subject: string): Promise<Course[]> {
    const universityId = await prisma.university.findFirst({
      where: {
        name: university
      }
    })

    const formattedSubject = subject.toUpperCase().trim();

    const courses = await prisma.course.findMany({
      where: {
        name: {
          contains: formattedSubject
        },
        universityId: universityId?.id
      }
    })

    return courses;
  }
}