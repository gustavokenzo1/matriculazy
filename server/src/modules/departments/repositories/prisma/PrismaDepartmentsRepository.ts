import { prisma } from "../../../../prisma";
import { getDepartments } from "../../../../utils/getDepartments";
import { ICreateDepartmentsDTO } from "../../dtos/ICreateDepartmentsDTO";
import { IDepartmentsRepository } from "../IDepartmentsRepository";

export class PrismaDepartmentsRepository implements IDepartmentsRepository {
  async create(data: ICreateDepartmentsDTO): Promise<void> {
    const { url, university } = data

    const createdUniversity = await prisma.university.findFirst({
      where: {
        name: university
      }
    })

    const departments = await getDepartments(url);

    await prisma.department.createMany({
      data: departments.map(department => ({
        name: department.name,
        universityId: createdUniversity?.id,
        value: department.value
      })),
    })
  }
}