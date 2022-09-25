import express, { Request, Response } from "express";
import cors from "cors";
import "reflect-metadata"
import { CreateCoursesController } from "./modules/courses/useCases/createCourses/CreateCoursesController";

const app = express();

app.use(cors());
app.use(express.json());

const createCoursesController = new CreateCoursesController()

app.post("/courses", async (req: Request, res: Response) => {
  return createCoursesController.handle(req, res);
});

app.listen(3333, () => {
  console.log("Server started on port 3333!");
});
