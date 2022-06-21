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

      for (const course of courses) {
        for (const classroom of course) {
          if (classroom) {
            if (isNaN((classroom as any).offers)) (classroom as any).offers = 0;
            if (isNaN((classroom as any).occupied))
              (classroom as any).occupied = 0;

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
          }
        }
      }
    }
  }

  async read(initials: string) {
    const universityExists = await prisma.university.findFirst({
      where: {
        initials: initials,
      },
    });

    if (!universityExists) {
      throw new Error(`University ${initials} does not exist`);
    }

    const courses = await prisma.course.findMany({
      where: {
        university: initials,
      },
    });

    return {
      university: universityExists.name,
      initials: universityExists.initials,
      url: universityExists.url,
      courses: courses,
    };
  }

  async readAll() {
    const universities = await prisma.university.findMany();

    return universities;
  }

  async update(data: IUniversity) {
    const { university, initials, courses, url } = data;

    const universityExists = await prisma.university.findFirst({
      where: {
        initials: initials,
      },
    });

    if (!universityExists) {
      throw new Error(`University ${initials} does not exist`);
    }

    await prisma.university.update({
      where: {
        id: universityExists.id,
      },
      data: {
        name: university,
        url,
      },
    });

    for (const course of courses) {
      for (const classroom of course) {
        if (classroom) {
          if (isNaN((classroom as any).offers)) (classroom as any).offers = 0;
          if (isNaN((classroom as any).occupied))
            (classroom as any).occupied = 0;

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

          if (courseExists) {
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
          } else {
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
          }
        }
      }
    }
  }

  async delete(initials: string) {
    const universityExists = await prisma.university.findFirst({
      where: {
        initials: initials,
      },
    });

    if (!universityExists) {
      throw new Error(`University ${initials} does not exist`);
    }

    await prisma.university.delete({
      where: {
        id: universityExists.id,
      },
    });

    await prisma.course.deleteMany({
      where: {
        university: initials,
      },
    });
  }
}
