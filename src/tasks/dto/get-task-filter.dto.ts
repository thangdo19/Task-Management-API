import { IsIn, IsOptional, IsString, MaxLength } from "class-validator"
import { TaskStatus } from "../task-status.enum"

export class GetTaskFilterDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  search: string

  @IsOptional()
  @IsIn(Object.values(TaskStatus))
  status: TaskStatus
} 
