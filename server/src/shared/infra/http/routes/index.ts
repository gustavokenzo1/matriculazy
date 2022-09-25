import { Router } from "express";
import { coursesRoutes } from "./courses.routes";

const routes = Router();

routes.use("/courses", coursesRoutes)

export { routes };