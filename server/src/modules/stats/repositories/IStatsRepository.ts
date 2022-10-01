import { Stats } from "@prisma/client"

export interface IStatsRepository {
  create(): Promise<void>
  alreadyExists(): Promise<boolean>
  read(): Promise<Stats>
  update(): Promise<void>
}