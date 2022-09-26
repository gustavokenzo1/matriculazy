import { IDepartmentsRepository } from "../../repositories/IDepartmentsRepository";
import { PrismaDepartmentsRepository } from "../../repositories/prisma/PrismaDepartmentsRepository";

export class ReadDepartmentsUseCase {
  constructor(
    private departmentsRepository: IDepartmentsRepository = new PrismaDepartmentsRepository()
  ) { }

  async execute(university: string) {
    return await this.departmentsRepository.read(university);
  }
}