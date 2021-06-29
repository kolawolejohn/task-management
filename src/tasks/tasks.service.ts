import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus} from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository
    ){}
    
    getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>{
        return this.tasksRepository.getTasks(filterDto);
    }

    async getTaskById(id: string): Promise<Task>{
        const found = await this.tasksRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`Task with ID : ${id} not found`);
        }
        return found
    }

    createTask(creatTaskDto:  CreateTaskDto): Promise<Task>{
           return this.tasksRepository.createTask(creatTaskDto)
    }


    async deleteTask(id: string): Promise<void>{
        const result = await this.tasksRepository.delete(id);
        if(result.affected === 0){
            throw new NotFoundException(`Task with ID : ${id} not found`);
        }
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task>{
        const task = await this.getTaskById(id)
        task.status =  status
        await this.tasksRepository.save(task)
        return task;
    }
}
