import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTaskFilterDto } from '../dto/get-task-filter.dto';
import { TaskRepository } from '../repository/task.repository';
import { Task } from '../task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  getTasks(filterDto: GetTaskFilterDto, userId: number): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, userId)
  }

  getTaskById(id: number): Promise<Task> {
    return this.taskRepository.getTaskById(id)
  }

  createTask(createDto: CreateTaskDto, userId: number): Promise<Task> {
    return this.taskRepository.createTask(createDto, userId)
  }
}
