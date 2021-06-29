import { Module } from '@nestjs/common';
import { TasksController } from './task.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
