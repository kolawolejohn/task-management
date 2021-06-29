import { Body, Controller, Delete, Get, Param, Post, Patch, Query} from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private  taskService: TasksService){}

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]>{
        return this.taskService.getTasks(filterDto)
    }

    @Get('/:id')
    getTaskById(@Param('id')  id: string) : Promise<Task>{
        return this.taskService.getTaskById(id)
    }
        

   @Post()
   createTask(@Body() creatTaskDto:  CreateTaskDto ) : Promise<Task>{
      return this.taskService.createTask(creatTaskDto)
   }

   @Delete('/:id')
   deleteTask(@Param('id')  id: string): Promise<void>{
        return this.taskService.deleteTask(id)
   }

   @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto ): Promise<Task>{
        const {status} = updateTaskStatusDto
        return this.taskService.updateTaskStatus(id, status)
   }
}
