import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "../dto/create-task.dto";
import { GetTaskFilterDto } from "../dto/get-task-filter.dto";
import { Task } from "../task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const { search, status } = filterDto
    const query = this.createQueryBuilder('task')

    if (search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {
        search: `%${search}%`
      })
    }
    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    return await query.getMany()
  }

  async getTaskById(id: number): Promise<Task> {
    const task: Task = await this.findOne({ where: { id }})
    if (!task) throw new NotFoundException(`There is no task with "${id}"`)

    return task
  }

  async createTask(createDto: CreateTaskDto): Promise<Task> {
    const task: Task = this.create(createDto)
    await task.save()

    return task
  }
}
