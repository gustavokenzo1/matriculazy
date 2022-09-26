import { Router } from 'express'
import { ReadDepartmentsController } from '../../../../modules/departments/useCases/readDepartments/ReadDepartmentsController'

const readDepartmentsController = new ReadDepartmentsController()

const departmentRoutes = Router()

departmentRoutes.get("/", readDepartmentsController.handle)

export { departmentRoutes }