import { prisma } from "../../prisma";
import {
  IUniversity,
  UniversitiesRepository,
} from "../universities-repository";

export class PrismaUniversitiesRepository implements UniversitiesRepository {
  async create(data: IUniversity) {
    const { university, initials, courses, url } = data;

    const universityExists = await prisma.university.findFirst({
      where: {
        initials: initials,
      },
    });

    if (!universityExists) {
      await prisma.university.create({
        data: {
          name: university,
          initials,
          url,
        },
      });
    }

    for (const course of courses) {
      for (const classroom of course) {
        if (classroom) {
          const courseExists = await prisma.course.findFirst({
            where: {
              university: initials,
              department: (classroom as any).department,
              code: (classroom as any).code,
              name: (classroom as any).name,
              classroom: (classroom as any).classroom,
              teacher: (classroom as any).teacher,
              offers: parseInt((classroom as any).offers),
              occupied: parseInt((classroom as any).occupied),
            },
          });

          if (!courseExists) {
            await prisma.course.create({
              data: {
                university: initials,
                department: (classroom as any).department,
                code: (classroom as any).code,
                name: (classroom as any).name,
                classroom: (classroom as any).classroom,
                period: (classroom as any).period,
                teacher: (classroom as any).teacher,
                schedule: (classroom as any).schedule,
                offers: parseInt((classroom as any).offers),
                occupied: parseInt((classroom as any).occupied),
                location: (classroom as any).location,
              },
            });
          } else {
            await prisma.course.update({
              where: {
                id: courseExists.id,
              },
              data: {
                department: (classroom as any).department,
                code: (classroom as any).code,
                name: (classroom as any).name,
                classroom: (classroom as any).classroom,
                period: (classroom as any).period,
                teacher: (classroom as any).teacher,
                schedule: (classroom as any).schedule,
                offers: parseInt((classroom as any).offers),
                occupied: parseInt((classroom as any).occupied),
                location: (classroom as any).location,
              },
            });
          }
          console.log(`${(classroom as any).name} was created`);
        }
      }
    }
  }
}
