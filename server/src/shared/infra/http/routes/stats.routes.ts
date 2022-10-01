import { Router } from "express";
import { ReadStatsController } from "../../../../modules/stats/useCases/readStats/ReadStatsController";

const statsRoutes = Router();

const readStatsController = new ReadStatsController()

statsRoutes.get("/", readStatsController.handle)

export { statsRoutes };