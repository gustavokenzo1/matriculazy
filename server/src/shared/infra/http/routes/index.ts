import { Router } from "express";
import { coursesRoutes } from "./courses.routes";
import { departmentRoutes } from "./departments.routes";
import { universityRoutes } from "./universities.routes";

const routes = Router();

routes.use("/courses", coursesRoutes)
routes.use("/departments", departmentRoutes)
routes.use("/universities", universityRoutes)

export { routes };