import express from "express";
import { PrismaUniversitiesRepository } from "./repositories/prisma/prisma-universities-repository";
import { CreateUniversityUseCase } from "./use-cases/create-university-use-case";
import { scrapeDepartments } from "./utils/sigaa-departments";

export const routes = express.Router();

/* routes.post("/university", async (req, res) => {
  const { name, initials } = req.body;

  const prismaUniversitiesRepository = new PrismaUniversitiesRepository();
  const createUniversityUseCase = new CreateUniversityUseCase(
    prismaUniversitiesRepository
  );

  try {
    await createUniversityUseCase.execute({ name, initials });

    return res.status(201).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
 */

routes.post("/university", async (req, res) => {
  const departments = await scrapeDepartments(
    "https://sig.unb.br/sigaa/public/turmas/listar.jsf"
  );
  for (const deparment of departments) {
    console.log(deparment);
  }

  return res.status(200).send();
});
