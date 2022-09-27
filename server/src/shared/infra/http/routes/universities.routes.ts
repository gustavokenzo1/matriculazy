import Router from 'express'
import { ListUniversitiesController } from '../../../../modules/universities/useCases/listUniversities/ListUniversitiesController'

const universityRoutes = Router()

const listUniversitiesController = new ListUniversitiesController()

universityRoutes.get("/", listUniversitiesController.handle)

export { universityRoutes }