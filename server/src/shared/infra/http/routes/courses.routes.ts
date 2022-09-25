import { Router, Request, Response } from "express";
import { CreateCoursesController } from "../../../../modules/courses/useCases/createCourses/CreateCoursesController";
import { DeleteCoursesController } from "../../../../modules/courses/useCases/deleteCourses/DeleteCoursesController";
import { ListCoursesByDepartmentController } from "../../../../modules/courses/useCases/listCoursesByDepartment/ListCoursesByDepartmentController";
import { ListCoursesByUniversityController } from "../../../../modules/courses/useCases/listCoursesByUniversity/ListCoursesByUniversityController";
import { CreateDepartmentsController } from "../../../../modules/departments/useCases/createDepartments/CreateDepartmentsController";
import { CreateUniversityController } from "../../../../modules/universities/useCases/createUniversity/CreateUniversityController";

const coursesRoutes = Router();

const createUniversityController = new CreateUniversityController()
const createDepartmentController = new CreateDepartmentsController()
const createCoursesController = new CreateCoursesController()

const listCoursesByUniversityController = new ListCoursesByUniversityController()
const listCoursesByDepartmentController = new ListCoursesByDepartmentController()
const deleteCoursesController = new DeleteCoursesController()

coursesRoutes.post("/", createUniversityController.handle, createDepartmentController.handle, createCoursesController.handle);
coursesRoutes.get("/university", listCoursesByUniversityController.handle)
coursesRoutes.get("/department", listCoursesByDepartmentController.handle)
coursesRoutes.delete("/", deleteCoursesController.handle)

export { coursesRoutes };