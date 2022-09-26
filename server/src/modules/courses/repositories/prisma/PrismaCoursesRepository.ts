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
    // courses.forEach(course => {
    //   const simplifiedSchedule: string[] = [];

    //   course.schedule.forEach(schedule => {
    //     const day = schedule.split(' ')[0];
    //     let start = schedule.split(' ')[1];
    //     let end = schedule.split(' ')[3];

    //     start = `${start.split(':')[0]}:00`;
    //     end = `${end.split(':')[0]}:00`;

    //     simplifiedSchedule.push(`${day} ${start}`);
    //     simplifiedSchedule.push(`${day} ${end}`);
    //   })

    //   course.schedule = simplifiedSchedule;
    // })

    const coursesBySubject = courses.reduce((acc, course) => {
      if (acc[course.name]) {
        acc[course.name].push(course);
      } else {
        acc[course.name] = [course];
      }

      return acc;
    }, {} as Record<string, Course[]>);

    const days = [
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ]

    const hours = [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ]
    console.log(coursesBySubject);

    return Promise.resolve(Object.values(coursesBySubject));
  }
}