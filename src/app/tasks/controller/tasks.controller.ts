import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/app/users/user.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTaskFilterDto } from '../dto/get-task-filter.dto';
import { TasksService } from '../service/tasks.service';
import { Task } from '../task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getTasks(
    @Query() filterDto: GetTaskFilterDto, 
    @GetUser() user: User
  ): Promise<any> {
    const { id } = user
    return {
      statusCode: 200,
      data: {
        tasks: await this.tasksService.getTasks(filterDto, id)
      }
    }
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  async createTask(
    @Body() createDto: CreateTaskDto,
    @GetUser() user: User
  ): Promise<any> {
    const { id } = user
    return {
      statusCode: 201,
      data: { 
        task: await this.tasksService.createTask(createDto, id) 
      }
    }
  }
}
