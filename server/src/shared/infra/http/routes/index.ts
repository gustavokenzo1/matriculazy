import { Router } from "express";
import { coursesRoutes } from "./courses.routes";
import { departmentRoutes } from "./departments.routes";

const routes = Router();

routes.use("/courses", coursesRoutes)
routes.use("/departments", departmentRoutes)

export { routes };