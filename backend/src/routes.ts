import express from "express";
import puppeteer from "puppeteer";
import { PrismaUniversitiesRepository } from "./repositories/prisma/prisma-universities-repository";
import { CreateUniversityUseCase } from "./use-cases/create-university-use-case";
import { ReadAllUniversitiesUseCase } from "./use-cases/read-all-universities-use-case";
import { ReadUniversityUseCase } from "./use-cases/read-university-use-case";
import { UpdateUniversityUseCase } from "./use-cases/update-university-use-case";
import { scrapeCourses } from "./utils/sigaa-courses";
import { scrapeDepartments } from "./utils/sigaa-departments";

export const routes = express.Router();

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

  return res.status(201).send();
});

routes.get("/university/:initials", async (req, res) => {
  const { initials } = req.params;

  const prismaUniversitiesRepository = new PrismaUniversitiesRepository();
  const readUniversityUseCase = new ReadUniversityUseCase(
    prismaUniversitiesRepository
  );

  try {
    const university = await readUniversityUseCase.execute({ initials });
    return res.status(200).json({ university });
  } catch (error) {
    return res.status(500).send({ message: "Universidade não encontrada" });
  }
});

routes.get("/university", async (req, res) => {
  const prismaUniversitiesRepository = new PrismaUniversitiesRepository();
  const readAllUniversitiesUseCase = new ReadAllUniversitiesUseCase(
    prismaUniversitiesRepository
  );

  const universities = await readAllUniversitiesUseCase.execute();

  return res.status(200).json({ universities });
});

routes.patch("/university", async (req, res) => {
  const { university, initials, url } = req.body;

  const prismaUniversitiesRepository = new PrismaUniversitiesRepository();
  const updateUniversityUseCase = new UpdateUniversityUseCase(
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

  await updateUniversityUseCase.execute({ university, initials, courses, url });

  return res.status(200).send();
});
