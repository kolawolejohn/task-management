import { Body, Controller, Delete, Get, Param, Post, Patch, Query, UseGuards, Logger} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
// import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TasksController')
    constructor(private  taskService: TasksService){}

    @Get()
    getTasks(
        @Query() filterDto: GetTaskFilterDto,
        @GetUser() user: User): Promise<Task[]>{
            this.logger.verbose(`User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`)
        return this.taskService.getTasks(filterDto,user)
    }

    @Get('/:id')
    getTaskById(
        @Param('id')  id: string,
        @GetUser() user: User) : Promise<Task>{
        return this.taskService.getTaskById(id,user)
    }
        

   @Post()
   createTask(
       @Body() creatTaskDto:  CreateTaskDto, 
       @GetUser() user: User) : Promise<Task>{
        this.logger.verbose(`User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(creatTaskDto)}`)
      return this.taskService.createTask(creatTaskDto, user)
   }

   @Delete('/:id')
   deleteTask(@Param('id')  id: string, @GetUser() user: User): Promise<void>{
        return this.taskService.deleteTask(id, user)
   }

   @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, 
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user:User ): Promise<Task>{
        const {status} = updateTaskStatusDto
        return this.taskService.updateTaskStatus(id, status, user)
   }
}
