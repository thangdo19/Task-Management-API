import { IsIn, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator"
import { TaskStatus } from "../task-status.enum"

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description: string

  @IsIn(Object.values(TaskStatus))
  status: TaskStatus
}
