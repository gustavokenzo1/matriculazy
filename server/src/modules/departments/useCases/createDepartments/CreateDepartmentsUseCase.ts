import { IDepartmentsRepository } from "../../repositories/IDepartmentsRepository";
import { PrismaDepartmentsRepository } from "../../repositories/prisma/PrismaDepartmentsRepository";

interface IRequest {
  url: string,
  university: string,
}

export class CreateDepartmentsUseCase {
  constructor(
    private departmentsRepository: IDepartmentsRepository = new PrismaDepartmentsRepository()
  ) { }

  async execute(data: IRequest) {
    const { url, university } = data

    const createdDepartments = await this.departmentsRepository.create({ url, university })

    return createdDepartments
  }
}