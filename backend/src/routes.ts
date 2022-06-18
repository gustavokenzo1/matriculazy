import express from "express";
import puppeteer from "puppeteer";
import { PrismaUniversitiesRepository } from "./repositories/prisma/prisma-universities-repository";
import { CreateUniversityUseCase } from "./use-cases/create-university-use-case";
import { scrapeCourses } from "./utils/sigaa-courses";
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
  const { university, initials, url } = req.body;

  const prismaUniversitiesRepository = new PrismaUniversitiesRepository();
  const createUniversityUseCase = new CreateUniversityUseCase(
    prismaUniversitiesRepository
  );

  const departments = await scrapeDepartments(url);

  const browser = await puppeteer.launch({
    headless: false,
  });
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();

  const courses = [];
  for (const department of departments) {
    const course = await scrapeCourses(department, page, url, initials);
    if (course.length > 0) {
      courses.push(course);
    }
    // For testing purposes
    if (courses.length === 5) {
      break;
    }
  }
  await browser.close();

  await createUniversityUseCase.execute({ university, initials, courses, url });

  return res.status(200).send();
});
